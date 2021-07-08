import { useQuery } from 'react-query';
import fetchData from '../lib/fetchData';
import {buildTableQueryString} from '../lib/utils';

function getFullUrl(baseUrl, tableState) {
  if (!baseUrl) {
    return null;
  }
  const separator = baseUrl.indexOf('?') < 0 ? '?' : '&';
  return baseUrl + separator + buildTableQueryString(tableState);
}

export default function useAllVariants(geneId, tableState, includeHTP = false) {
  const nonHTPCategories = ['allele', 'allele with multiple associated variants', 'allele with one associated variant'];
  const url = includeHTP ?
    `/api/gene/${geneId}/alleles?` :
    `/api/gene/${geneId}/alleles?filter.alleleCategory=${encodeURIComponent(nonHTPCategories.join('|'))}`;
  return useQuery ([url, tableState], () => {
    return fetchData(getFullUrl(url, {
      ...tableState,
      page: 1,
      sizePerPage:1000,
    }));
  });
}
