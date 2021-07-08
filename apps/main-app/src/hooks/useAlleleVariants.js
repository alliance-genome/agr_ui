import useDataTableQuery from './useDataTableQuery';
import { DEFAULT_TABLE_STATE } from '../constants';

export default function useAllAlleleVariants(alleleId) {
  return useDataTableQuery(
    `/api/allele/${alleleId}/variants`,
    null,
    {
      ...DEFAULT_TABLE_STATE,
      sizePerPage: 1000,
    });
}
