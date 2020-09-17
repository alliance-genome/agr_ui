import { stringify } from 'qs';
import { useQuery } from 'react-query';
import fetchData from '../lib/fetchData';
import { getOrthologId } from '../components/orthology';
import { htmlToPlainText } from '../lib/utils';

export default function useComparisonRibbonQuery(
  baseUrl,
  focusGeneId,
  comparisonGenes,
  additionalParams
) {
  return useQuery([baseUrl, focusGeneId, comparisonGenes, additionalParams], async () => {
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
    // ribbon does not support HTML-encoded labels, so for now translate to plain text
    // see: https://github.com/geneontology/wc-ribbon/issues/27
    const response = await fetchData(url);
    return {
      ...response,
      subjects: response.subjects.map(subject => ({
        ...subject,
        label: htmlToPlainText(subject.label),
      }))
    };
  });
}
