import { useQuery } from '@tanstack/react-query';
import fetchAllPages from '../lib/fetchAllPages';

export default function useGeneParalogy(geneId) {
  return useQuery({
    queryKey: ['gene-paralogy', geneId],
    queryFn: () => {
      return fetchAllPages(`/api/gene/${geneId}/paralogs?filter.stringency=all`);
    },
  });
}
