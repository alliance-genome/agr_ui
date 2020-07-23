import { useQuery } from 'react-query';
import fetchData from '../lib/fetchData';

export default function useGeneOrthology(geneId) {
  return useQuery(['gene-orthology', geneId], () => {
    return fetchData(`/api/gene/${geneId}/homologs?filter.stringency=all&limit=10000`);
  }, {
    staleTime: Infinity,
  });
}
