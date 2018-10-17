import React from 'react';
import PropTypes from 'prop-types';
import HeadMetaTags from '../headMetaTags';
import ErrorBoundary from '../errorBoundary';

const DataPage = ({children, data, title}) => {
  return (
    <div className='container-fluid'>
      <HeadMetaTags data={data} title={title}  />
      <div className='row'>
        <ErrorBoundary>{children}</ErrorBoundary>
      </div>
    </div>
  );
};

DataPage.propTypes = {
  children: PropTypes.node,
  data:PropTypes.any,
  title: PropTypes.string,
};

export default DataPage;
