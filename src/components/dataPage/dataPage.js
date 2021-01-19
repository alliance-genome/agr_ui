import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../errorBoundary';

import style from './style.scss';

const DataPage = ({children}) => {
  return (
    <div className={style.dataPage}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </div>
  );
};

DataPage.propTypes = {
  children: PropTypes.node,
  data:PropTypes.any,
  title: PropTypes.string,
};

export default DataPage;
