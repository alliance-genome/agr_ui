import React from 'react';
import PropTypes from 'prop-types';
import HeadMetaTags from '../headMetaTags';
import ErrorBoundary from '../errorBoundary';

import style from './style.scss';

const DataPage = ({children, data, title}) => {
  return (
    <div className='container-fluid'>
      <HeadMetaTags data={data} title={title} />
      <div className={`row ${style.dataPage}`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
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
