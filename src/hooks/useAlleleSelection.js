import { useState, useCallback, useRef } from 'react';
import fetchData from '../lib/fetchData';
import { ALLELE_WITH_MULTIPLE_VARIANTS, ALLELE_WITH_ONE_VARIANT } from '../constants';

/**
 * Custom hook for managing allele selection state and fetching selected allele data
 * @param {Object} tableProps - The table properties from useDataTableQuery
 * @returns {Object} Selection state and handlers
 */
export function getSelectedAlleleCategory(response) {
  const variantCount = response.variantList?.length || 0;
  if (variantCount === 1) return ALLELE_WITH_ONE_VARIANT;
  if (variantCount > 1) return ALLELE_WITH_MULTIPLE_VARIANTS;
  return response.alterationType || response.category || 'allele';
}

export function buildSelectedAlleleRow(response) {
  if (!response?.allele) return null;

  return {
    ...response,
    alterationType: getSelectedAlleleCategory(response),
  };
}

export function getSelectedVariantList(response) {
  return response?.results?.flatMap((row) => row.variantList || []) || [];
}

export default function useAlleleSelection(tableProps) {
  const [alleleIdsSelected, setAlleleIdsSelected] = useState([]);
  const [selectionOverride, setSelectionOverride] = useState({
    active: false,
    alleleIds: [],
    originalTableState: null,
  });
  const [isLoadingSelectedAlleles, setIsLoadingSelectedAlleles] = useState(false);
  const [selectedAllelesData, setSelectedAllelesData] = useState(null);
  const [selectedAllelesError, setSelectedAllelesError] = useState(null);

  // Use a request counter to ignore stale responses
  const requestCounter = useRef(0);

  const handleAllelesSelect = useCallback(
    async (alleleIds, fromViewer = false) => {
      setAlleleIdsSelected(alleleIds);

      if (fromViewer && alleleIds.length > 0) {
        // Increment request counter to track this request
        const currentRequest = ++requestCounter.current;

        // Activate override mode and fetch selected alleles
        setSelectionOverride({
          active: true,
          alleleIds: alleleIds,
          originalTableState: tableProps.tableState,
        });

        // Show loading state
        setIsLoadingSelectedAlleles(true);
        setSelectedAllelesData(null);
        setSelectedAllelesError(null);

        try {
          // Fetch each allele individually since the gene alleles endpoint doesn't support ID filtering
          // URL-encode the allele IDs to handle special characters like colons in CURIEs (e.g., MGI:7525371)
          // Also fetch variants for each allele to populate the Variant and Variant Type columns
          const allelePromises = alleleIds.map(async (id) => {
            const encodedId = encodeURIComponent(id);

            // Fetch both allele data and its variants in parallel
            const [alleleData, variantsData] = await Promise.all([
              fetchData(`/api/allele/${encodedId}`).catch((err) => {
                console.error(`Failed to fetch allele ${id}:`, err);
                return null;
              }),
              fetchData(`/api/allele/${encodedId}/variants`).catch((err) => {
                console.error(`Failed to fetch variants for allele ${id}:`, err);
                return null;
              }),
            ]);

            // Combine allele data with variants
            if (alleleData && variantsData) {
              return {
                ...alleleData,
                variantList: getSelectedVariantList(variantsData),
              };
            }
            return alleleData;
          });

          const alleles = await Promise.all(allelePromises);

          // Check if this request is still current
          if (currentRequest !== requestCounter.current) {
            // This is a stale request, ignore the results
            return;
          }

          const validAlleles = alleles.map(buildSelectedAlleleRow).filter(Boolean);

          // Deduplicate alleles based on ID to prevent duplicates
          const uniqueAlleles = [];
          const seenIds = new Set();

          for (const allele of validAlleles) {
            const alleleId = allele.allele.primaryExternalId;

            if (alleleId && !seenIds.has(alleleId)) {
              seenIds.add(alleleId);

              uniqueAlleles.push(allele);
            }
          }

          if (uniqueAlleles.length > 0) {
            setSelectedAllelesData(uniqueAlleles);
            setSelectedAllelesError(null);
          } else {
            throw new Error('No alleles could be fetched');
          }
        } catch (error) {
          // Only update error state if this is still the current request
          if (currentRequest === requestCounter.current) {
            console.error('Error fetching selected alleles:', error);
            setSelectedAllelesError(error);
            setSelectedAllelesData(null);
          }
        } finally {
          // Only update loading state if this is still the current request
          if (currentRequest === requestCounter.current) {
            setIsLoadingSelectedAlleles(false);
          }
        }

        // Scroll to first selected row after data loads
        // Skip scrolling if this is a back/forward navigation to prevent conflicts
        // with the Layout component's hash-based scroll restoration (KANBAN-632)
        const isHistoryNavigation =
          window.performance &&
          window.performance.getEntriesByType &&
          window.performance.getEntriesByType('navigation').length > 0 &&
          window.performance.getEntriesByType('navigation')[0].type === 'back_forward';

        if (!isHistoryNavigation) {
          setTimeout(() => {
            const firstRow = document.querySelector(`tr[data-row-key="${alleleIds[0]}"]`);
            if (firstRow) {
              firstRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 800);
        }
      } else if (fromViewer && alleleIds.length === 0) {
        // Clear override when all selections removed from viewer
        setSelectionOverride({
          active: false,
          alleleIds: [],
          originalTableState: null,
        });
        setSelectedAllelesData(null);
        setIsLoadingSelectedAlleles(false);
      }
    },
    [tableProps.tableState]
  );

  const clearAlleleSelection = useCallback(() => {
    // Increment counter to invalidate any in-flight requests
    requestCounter.current++;

    setAlleleIdsSelected([]);
    setSelectionOverride({
      active: false,
      alleleIds: [],
      originalTableState: null,
    });
    setSelectedAllelesData(null);
    setSelectedAllelesError(null);
    setIsLoadingSelectedAlleles(false);
  }, []);

  return {
    alleleIdsSelected,
    setAlleleIdsSelected, // Exposed for selectRow functionality
    selectionOverride,
    isLoadingSelectedAlleles,
    selectedAllelesData,
    selectedAllelesError,
    handleAllelesSelect,
    clearAlleleSelection,
  };
}
