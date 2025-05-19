import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import AlleleTable from './alleleTable.jsx';

export const AlleleTableWrapper = ({ geneId }) => {
  const { isLoading, isError, data } = usePageLoadingQuery(`/api/gene/${geneId}`);
  if (isLoading || isError) {
    return null;
  }
  return <AlleleTable isLoadingGene={isLoading} gene={data} geneId={geneId}/>
}
