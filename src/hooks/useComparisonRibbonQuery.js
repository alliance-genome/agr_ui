import { stringify } from 'qs';
import { useQuery } from '@tanstack/react-query';
import fetchData from '../lib/fetchData';
import { getOrthologId } from '../components/orthology';
import { htmlToPlainText } from '../lib/utils';

export default function useComparisonRibbonQuery(
  baseUrl,
  focusGeneId,
  comparisonGenes,
  additionalParams
) {
  return useQuery({
    queryKey: [baseUrl, focusGeneId, comparisonGenes, additionalParams], 
    queryFn: async () => {
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
    }, 
    // this prevents a request from being fired before orthology data is loaded
    enabled: !!comparisonGenes,
    placeholderData: {
      categories: [],
      subjects: [],
    },
    keepPreviousData: true,
});
}
