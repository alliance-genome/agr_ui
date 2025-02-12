import { useQuery } from '@tanstack/react-query';
import fetchData from '../lib/fetchData';

export default function useGeneOrthology(geneId) {
  return useQuery(['gene-orthology', geneId], async () => {
    const data = await fetchData(`/api/gene/${geneId}/orthologs?filter.stringency=all&limit=10000`);
    return data || { results: [], total: 0 }; 
  }, {
    placeholderData: { results: [], total: 0 },
    keepPreviousData: true,
  });
}
