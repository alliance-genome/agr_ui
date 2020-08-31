import React from 'react';
import PropTypes from 'prop-types';
import { HashLink as Link } from 'react-router-hash-link';

const BooleanLinkCell = ({
  to,
  value,
}) => {
  if (!value) {
    return null;
  }
  return (
    <Link to={to}>Yes</Link>
  );
};

BooleanLinkCell.propTypes = {
  to: PropTypes.string,
  value: PropTypes.any,
};

export default BooleanLinkCell;
