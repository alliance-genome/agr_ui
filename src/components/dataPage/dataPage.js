import React from 'react';
import PropTypes from 'prop-types';
import HeadMetaTags from '../headMetaTags';

const DataPage = ({children, title}) => {
  return (
    <div className='container-fluid'>
      <HeadMetaTags title={title} />
      <div className='row'>
        {children}
      </div>
    </div>
  );
};

DataPage.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default DataPage;
