import React from 'react';
import PropTypes from 'prop-types';
import HeadMetaTags from '../headMetaTags';

const DataPage = ({children, data, title}) => {
  return (
    <div className='container-fluid'>
      <HeadMetaTags data={data} title={title}  />
      <div className='row'>
        {children}
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
