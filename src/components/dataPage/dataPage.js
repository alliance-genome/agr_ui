import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../errorBoundary';

import style from './style.scss';

const DataPage = ({children}) => {
  return (
    <div className='container-fluid'>
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
