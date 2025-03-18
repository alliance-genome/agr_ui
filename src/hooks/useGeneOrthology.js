import { useQuery } from '@tanstack/react-query';

const fetchGeneOrthology = async (geneId) => {
  const response = await fetch(`/api/gene/${geneId}/orthologs?filter.stringency=all&limit=10000`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const useGeneOrthology = (geneId) => {
  return useQuery(['geneOrthology', geneId], () => fetchGeneOrthology(geneId), { enabled: !!geneId });
};

export default useGeneOrthology;
