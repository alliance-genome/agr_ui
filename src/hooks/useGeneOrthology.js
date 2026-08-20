import { useQuery } from '@tanstack/react-query';
import fetchAllPages from '../lib/fetchAllPages';

const fetchGeneOrthology = async (geneId) => {
  return fetchAllPages(`/api/gene/${geneId}/orthologs?filter.stringency=all`);
};

const fetchAndMapGeneOrthology = async (geneId) => {
  const response = await fetchGeneOrthology(geneId);
  return {
    ...response,
    results:
      response.results?.map((result) => {
        return {
          ...result,
          ...(result.geneToGeneOrthologyGenerated || {}),
        };
      }) || [],
  };
};

const useGeneOrthology = (geneId) => {
  return useQuery({
    queryKey: ['geneOrthology', geneId],
    queryFn: () => fetchAndMapGeneOrthology(geneId),
    enabled: !!geneId,
  });
};

export default useGeneOrthology;
