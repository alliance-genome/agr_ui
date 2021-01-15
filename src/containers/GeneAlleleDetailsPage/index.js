import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DataPage, PageHeader } from '../../components/dataPage';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import ErrorBoundary from '../../components/errorBoundary';
import GeneAlleleDetailsTable from './GeneAlleleDetailsTable';

const GeneAlleleDetailsPage = ({geneId}) => {
  const pageProps = usePageLoadingQuery(`/api/gene/${geneId}`);
  const { data } = pageProps;
  const { symbol, id } = data || {};

  const pageTitle = `Alleles/Variants Details`

  return (
    <DataPage {...pageProps}>
      <div className="w-100 pl-3">
        <nav aria-label="breadcrumb" className="d-flex">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">Gene</li>
            <li class="breadcrumb-item">
              <Link to={`/gene/${id}`}>{symbol}</Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{pageTitle}</li>
          </ol>
        </nav>
        <PageHeader>{pageTitle} ({symbol})</PageHeader>
        <ErrorBoundary>
          <div style={{width: '100%', overflowX: 'scroll'}}>
            <GeneAlleleDetailsTable geneId={geneId} />
          </div>
        </ErrorBoundary>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </DataPage>
  );
};

GeneAlleleDetailsPage.propTypes = {
  geneId: PropTypes.string.isRequired,
};

export default GeneAlleleDetailsPage;
