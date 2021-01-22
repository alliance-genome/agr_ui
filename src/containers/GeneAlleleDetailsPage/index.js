import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DataPage, PageHeader } from '../../components/dataPage';
import NotFound from '../../components/notFound';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import ErrorBoundary from '../../components/errorBoundary';
import GeneAlleleDetailsTable from './GeneAlleleDetailsTable';

const GeneAlleleDetailsPage = ({geneId}) => {
  const { isLoading: isLoadingGene, isError: isErrorGene, data: gene } = usePageLoadingQuery(`/api/gene/${geneId}`);
  if (isLoadingGene) {
    return null;
  } else if (isErrorGene) {
    return <NotFound />;
  }

  const pageTitle = 'Alleles or Variants Details';

  return (
    <DataPage>
      <div className="w-100 pl-3">
        <nav aria-label="breadcrumb" className="d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Gene</li>
            <li className="breadcrumb-item">
              <Link to={`/gene/${geneId}`}>{gene.symbol}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">{pageTitle}</li>
          </ol>
        </nav>
        <PageHeader>{pageTitle} ({gene.symbol})</PageHeader>
        <ErrorBoundary>
          <div style={{width: '100%', overflowX: 'scroll'}}>
            <GeneAlleleDetailsTable geneId={geneId} />
          </div>
        </ErrorBoundary>
      </div>
    </DataPage>
  );
};

GeneAlleleDetailsPage.propTypes = {
  geneId: PropTypes.string.isRequired,
};

export default GeneAlleleDetailsPage;
