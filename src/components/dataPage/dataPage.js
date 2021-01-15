import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../errorBoundary';
import NotFound from '../../components/notFound';

import style from './style.scss';

const DataPage = ({children, isLoading, isError }) => {
  return (
    <div className={style.dataPage}>
      {
        isLoading ? null : isError ? <NotFound /> :
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      }
    </div>
  );
};

DataPage.propTypes = {
  children: PropTypes.node,
  data:PropTypes.any,
  title: PropTypes.string,
};

export default DataPage;
