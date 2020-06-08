import useFetchData from './useFetchData';

export default function useAlleleVariant(alleleId) {
  return useFetchData(`/api/allele/${alleleId}/variants`);
}
