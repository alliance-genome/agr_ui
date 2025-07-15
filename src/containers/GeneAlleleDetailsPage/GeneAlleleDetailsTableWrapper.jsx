import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import GeneAlleleDetailsTable from './GeneAlleleDetailsTable.jsx';

export const GeneAlleleDetailsTableWrapper = ({ geneId }) => {
  const { isLoading, isError, data } = usePageLoadingQuery(`/api/gene/${geneId}`);
  if (isLoading || isError) {
    return null;
  }
  return <GeneAlleleDetailsTable isLoadingGene={isLoading} gene={data} geneId={geneId} />;
};
