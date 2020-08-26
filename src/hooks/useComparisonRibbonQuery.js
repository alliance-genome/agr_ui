import { stringify } from 'qs';
import { useQuery } from 'react-query';
import fetchData from '../lib/fetchData';
import { getOrthologId } from '../components/orthology';

export default function useComparisonRibbonQuery(
  baseUrl,
  focusGeneId,
  comparisonGenes,
  additionalParams
) {
  return useQuery([baseUrl, focusGeneId, comparisonGenes, additionalParams], () => {
    // this prevents a request from being fired before orthology data is loaded
    if (!comparisonGenes) {
      return Promise.resolve();
    }
    const comparisonGeneIds = comparisonGenes.map(getOrthologId);
    const queryString = stringify({
      ...additionalParams,
      geneID: [focusGeneId].concat(comparisonGeneIds)
    }, {
      addQueryPrefix: true,
      arrayFormat: 'repeat'
    });
    const url = baseUrl + queryString;
    return fetchData(url);
  });
}
