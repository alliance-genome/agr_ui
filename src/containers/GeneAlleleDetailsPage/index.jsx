import React from 'react';
import {Link, useParams} from 'react-router-dom';
import { PageHeader } from '../../components/dataPage';
import NotFound from '../../components/notFound.jsx';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import ErrorBoundary from '../../components/errorBoundary.jsx';
import { GeneAlleleDetailsTableWrapper } from './GeneAlleleDetailsTableWrapper.jsx';

const GeneAlleleDetailsPage = () => {
  const { id: geneId } = useParams();
  const { isLoading: isLoadingGene, isError: isErrorGene, data: gene } = usePageLoadingQuery(`/api/gene/${geneId}`);
  if (isLoadingGene) {
    return null;
  } else if (isErrorGene) {
    return <NotFound />;
  }

  const pageTitle = 'Alleles and Variants Details';

  return (
    <div>
      <div className="w-100 pl-3 py-4">
        <nav aria-label="breadcrumb" className="d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Gene</li>
            <li className="breadcrumb-item">
              <Link to={`/gene/${geneId}`}>{gene.symbol}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">{pageTitle}</li>
          </ol>
        </nav>
        <PageHeader>{pageTitle} for <Link to={`/gene/${geneId}`}>{gene.symbol}</Link></PageHeader>
        <ErrorBoundary>
          <div style={{width: '100%', overflowX: 'scroll'}}>
            <GeneAlleleDetailsTableWrapper geneId={geneId} />
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};

GeneAlleleDetailsPage.propTypes = {};

export default GeneAlleleDetailsPage;
