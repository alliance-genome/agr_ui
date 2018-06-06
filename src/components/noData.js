import React from 'react';
import PropTypes from 'prop-types';

const NoData = ({children}) => (
  <i className='text-muted'>{children || 'No Data Available'}</i>
);

NoData.propTypes = {
  children: PropTypes.node
};

export default NoData;
