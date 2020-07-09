import useFetchData from './useFetchData';

export default function useVariantTranscripts(variantId) {
  return useFetchData(`/api/variant/${variantId}/transcripts`);
}
