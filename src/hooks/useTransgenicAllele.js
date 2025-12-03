import { useQuery } from '@tanstack/react-query';
import fetchData from '../lib/fetchData';

export default function useTransgenicAllele(alleleId) {
  return useQuery({
    queryKey: ['transgenic-allele', alleleId],
    queryFn: () => {
      return fetchData(`/api/allele/${alleleId}/constructs`);
    },
  });
}
