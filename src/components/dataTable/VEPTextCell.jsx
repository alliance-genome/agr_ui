import React from 'react';
import PropTypes from 'prop-types';

const VEPTextCell = (children) => (children ? <span>{children.replace(/_/g, ' ').split(',').join(', ')}</span> : null);

VEPTextCell.propTypes = {
  children: PropTypes.string,
};

export default VEPTextCell;
