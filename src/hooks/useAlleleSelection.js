import { useState, useCallback, useRef } from 'react';
import fetchData from '../lib/fetchData';

/**
 * Custom hook for managing allele selection state and fetching selected allele data
 * @param {Object} tableProps - The table properties from useDataTableQuery
 * @param {Array} cachedAlleles - Optional cached allele data with correct categories from useAllVariants
 * @returns {Object} Selection state and handlers
 */
export default function useAlleleSelection(tableProps, cachedAlleles = []) {
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
                variants: variantsData.results || [],
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

          // Extract the nested allele object from the API response
          // API returns: { category: "allele_summary", allele: {...}, alterationType: "...", variants: [...] }
          // We need to map the individual allele API response to match the gene alleles list format
          const validAlleles = alleles
            .filter((a) => a !== null && a.allele)
            .map((response) => {
              const allele = response.allele;
              // TEMPORARY FIX (SCRUM-5638): Look up the correct category from cached allele data first.
              // The individual allele API returns incorrect alterationType (e.g., "allele with one variant"
              // for alleles that actually have multiple variants), so we prefer the cached category
              // from the gene alleles endpoint which has the correct value.
              // TODO: Remove this workaround and the cachedAlleles parameter when SCRUM-5638 backend fix
              // is implemented to return correct alterationType from /api/allele/{id} endpoint.
              const cachedAllele = cachedAlleles?.find((a) => a.id === allele.primaryExternalId);
              return {
                ...allele,
                id: allele.primaryExternalId, // Map primaryExternalId to id
                symbol: allele.alleleSymbol?.displayText || allele.alleleSymbol?.formatText,
                synonyms: allele.alleleSynonyms?.map((s) => s.displayText || s.formatText) || [],
                category: cachedAllele?.category || response.alterationType || response.category || 'allele',
                // Map crossReference structure to crossReferenceMap for table compatibility
                crossReferenceMap: {
                  primary: {
                    url:
                      response.crossReference?.resourceDescriptorPage?.urlTemplate?.replace(
                        '[%s]',
                        allele.primaryExternalId?.split(':')[1] || ''
                      ) ||
                      allele.dataProviderCrossReference?.resourceDescriptorPage?.urlTemplate?.replace(
                        '[%s]',
                        allele.primaryExternalId?.split(':')[1] || ''
                      ),
                  },
                },
                // Include variants fetched from /api/allele/{id}/variants endpoint
                variants: response.variants || [],
                diseases: [],
              };
            });

          // Deduplicate alleles based on ID to prevent duplicates
          const uniqueAlleles = [];
          const seenIds = new Set();

          for (const allele of validAlleles) {
            if (allele && allele.id && !seenIds.has(allele.id)) {
              seenIds.add(allele.id);

              // Category is already set correctly from cachedAllele lookup (line 81)
              // This fallback computation based on variants.length is kept for safety,
              // but won't trigger since variants array is always empty from individual allele API
              let computedCategory = allele.category || 'allele';
              if (allele.variants && Array.isArray(allele.variants) && allele.variants.length > 0) {
                if (allele.variants.length === 1) {
                  computedCategory = 'allele with one associated variant';
                } else {
                  computedCategory = 'allele with multiple associated variants';
                }
              }

              uniqueAlleles.push({
                ...allele,
                category: computedCategory,
              });
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
    [tableProps.tableState, cachedAlleles]
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
