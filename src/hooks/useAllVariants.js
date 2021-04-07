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

export default function useAllVariants(geneId, tableState) {
  const url = `/api/gene/${geneId}/alleles?`;
  return useQuery ([url, tableState], () => {
    return fetchData(getFullUrl(url, {
      ...tableState,
      page: 1,
      sizePerPage:1000,
    }));
  });
}
