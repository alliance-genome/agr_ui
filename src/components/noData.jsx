import React from 'react';
import PropTypes from 'prop-types';

const NoData = ({children}) => (
  <i className='text-muted'>{children || 'No data available'}</i>
);

NoData.propTypes = {
  children: PropTypes.node
};

export default NoData;
