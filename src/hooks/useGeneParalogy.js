import { useQuery } from '@tanstack/react-query';
import fetchData from '../lib/fetchData';

export default function useGeneParalogy(geneId) {
  return useQuery({
    queryKey: ['gene-paralogy', geneId],
    queryFn: () => {
      return fetchData(`/api/gene/${geneId}/paralogs?filter.stringency=all&limit=10000`);
    },
  });
}
