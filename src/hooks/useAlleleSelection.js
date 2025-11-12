import { useState, useCallback, useRef } from 'react';
import fetchData from '../lib/fetchData';

/**
 * Custom hook for managing allele selection state and fetching selected allele data
 * @param {Object} tableProps - The table properties from useDataTableQuery
 * @returns {Object} Selection state and handlers
 */
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
          const allelePromises = alleleIds.map((id) => {
            const encodedId = encodeURIComponent(id);
            const url = `/api/allele/${encodedId}`;
            return fetchData(url).catch((err) => {
              console.error(`Failed to fetch allele ${id}:`, err);
              return null;
            });
          });

          const alleles = await Promise.all(allelePromises);

          // Check if this request is still current
          if (currentRequest !== requestCounter.current) {
            // This is a stale request, ignore the results
            return;
          }

          // Extract the nested allele object from the API response
          // API returns: { category: "allele_summary", allele: {...}, alterationType: "...", ... }
          // We need to map the individual allele API response to match the gene alleles list format
          const validAlleles = alleles
            .filter((a) => a !== null && a.allele)
            .map((response) => {
              const allele = response.allele;
              return {
                ...allele,
                id: allele.primaryExternalId, // Map primaryExternalId to id
                symbol: allele.alleleSymbol?.displayText || allele.alleleSymbol?.formatText,
                synonyms: allele.alleleSynonyms?.map(s => s.displayText || s.formatText) || [],
                category: response.alterationType || response.category || 'allele',
                // Map crossReference structure to crossReferenceMap for table compatibility
                crossReferenceMap: {
                  primary: {
                    url: response.crossReference?.resourceDescriptorPage?.urlTemplate?.replace('[%s]', allele.primaryExternalId?.split(':')[1] || '')
                      || allele.dataProviderCrossReference?.resourceDescriptorPage?.urlTemplate?.replace('[%s]', allele.primaryExternalId?.split(':')[1] || '')
                  }
                },
                // Note: variants and diseases are not returned by individual allele endpoint
                // They would need separate API calls if needed
                variants: [],
                diseases: []
              };
            });

          // Deduplicate alleles based on ID to prevent duplicates
          const uniqueAlleles = [];
          const seenIds = new Set();

          for (const allele of validAlleles) {
            if (allele && allele.id && !seenIds.has(allele.id)) {
              seenIds.add(allele.id);

              // Compute correct category based on variant count
              // The individual allele API doesn't return the computed category
              // so we need to calculate it based on the variants array
              let computedCategory = allele.category || 'allele';
              if (allele.variants && Array.isArray(allele.variants)) {
                if (allele.variants.length === 1) {
                  computedCategory = 'allele with one associated variant';
                } else if (allele.variants.length > 1) {
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
        setTimeout(() => {
          const firstRow = document.querySelector(`tr[data-row-key="${alleleIds[0]}"]`);
          if (firstRow) {
            firstRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 800);
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
