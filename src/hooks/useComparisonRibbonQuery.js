import { stringify } from 'query-string';
import { useQuery } from 'react-query';
import fetchData from '../lib/fetchData';
import { getOrthologId } from '../components/orthology';

export default function useComparisonRibbonQuery(baseUrl, focusGeneId, comparisonGenes) {
  return useQuery([baseUrl, focusGeneId, comparisonGenes], () => {
    // this prevents a request from being fired before orthology data is loaded
    if (!comparisonGenes) {
      return Promise.resolve();
    }
    const comparisonGeneIds = comparisonGenes.map(getOrthologId);
    const queryString = stringify({ geneID: [focusGeneId].concat(comparisonGeneIds)});
    const separator = baseUrl.indexOf('?') < 0 ? '?' : ':';
    const url = baseUrl + separator + queryString;
    return fetchData(url);
  });
}
