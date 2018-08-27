import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const GeneCell = (props) => {
  const {geneID, symbol} = props;
  return (
    <Link to={'/gene/' + geneID}>{symbol || geneID}</Link>
  );
};

GeneCell.propTypes = {
  geneID: PropTypes.string.isRequired,
  symbol: PropTypes.string,
};
export default GeneCell;
