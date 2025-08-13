import { useState, useCallback } from 'react';
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

  const handleAllelesSelect = useCallback(
    async (alleleIds, fromViewer = false) => {
      setAlleleIdsSelected(alleleIds);

      if (fromViewer && alleleIds.length > 0) {
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
          const allelePromises = alleleIds.map((id) =>
            fetchData(`/api/allele/${id}`).catch((err) => {
              console.error(`Failed to fetch allele ${id}:`, err);
              return null;
            })
          );

          const alleles = await Promise.all(allelePromises);
          const validAlleles = alleles.filter((a) => a !== null);

          if (validAlleles.length > 0) {
            setSelectedAllelesData(validAlleles);
            setSelectedAllelesError(null);
          } else {
            throw new Error('No alleles could be fetched');
          }
        } catch (error) {
          console.error('Error fetching selected alleles:', error);
          setSelectedAllelesError(error);
          setSelectedAllelesData(null);
        } finally {
          setIsLoadingSelectedAlleles(false);
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
