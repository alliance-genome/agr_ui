import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/dataPage';
import NotFound from '../../components/notFound.jsx';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import ErrorBoundary from '../../components/errorBoundary.jsx';
import { GeneAlleleDetailsTableWrapper } from './GeneAlleleDetailsTableWrapper.jsx';
import { extractGeneFields } from '../../lib/utils';

const GeneAlleleDetailsPage = () => {
  const { id: geneId } = useParams();
  const { isLoading: isLoadingGene, isError: isErrorGene, data } = usePageLoadingQuery(`/api/gene/${geneId}`);
  if (isLoadingGene) {
    return null;
  } else if (isErrorGene) {
    return <NotFound />;
  }

  const gene = data.gene;
  const { geneSymbolText } = extractGeneFields(gene);
  const pageTitle = 'Alleles and Variants Details';

  return (
    <div>
      <div className="w-100 pl-3 py-4">
        <nav aria-label="breadcrumb" className="d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Gene</li>
            <li className="breadcrumb-item">
              <Link to={`/gene/${geneId}`} dangerouslySetInnerHTML={{ __html: geneSymbolText }} />
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {pageTitle}
            </li>
          </ol>
        </nav>
        <PageHeader>
          {pageTitle} for <Link to={`/gene/${geneId}`} dangerouslySetInnerHTML={{ __html: geneSymbolText }} />
        </PageHeader>
        <ErrorBoundary>
          <div style={{ width: '100%', overflowX: 'scroll' }}>
            <GeneAlleleDetailsTableWrapper geneId={geneId} />
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};

GeneAlleleDetailsPage.propTypes = {};

export default GeneAlleleDetailsPage;
