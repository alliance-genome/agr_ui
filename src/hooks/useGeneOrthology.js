import { useQuery } from '@tanstack/react-query';


const fetchGeneOrthology = async (geneId) => {
  const response = await fetch(`/api/gene/${geneId}/orthologs?filter.stringency=all&limit=10000`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  return response.json();
};

const fetchAndMapGeneOrthology = async (geneId) => {
  const response = await fetchGeneOrthology(geneId);
  return {
    ...response,
    results: response.results?.map(result => {
      return {
        ...result,
        ...(result.geneToGeneOrthologyGenerated || {})
      };
    }) || []
  };
};

const useGeneOrthology = (geneId) => {
  return useQuery({
    queryKey: ['geneOrthology', geneId],
    queryFn: () => fetchAndMapGeneOrthology(geneId),
    enabled: !!geneId
  });
};

export default useGeneOrthology;
