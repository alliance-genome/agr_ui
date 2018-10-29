import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const GeneCell = (props) => {
  const {geneID, primaryKey, symbol} = props;
  return (
    <Link to={'/gene/' + geneID || primaryKey}>{symbol || geneID || primaryKey}</Link>
  );
};

GeneCell.propTypes = {
  geneID: PropTypes.string,
  primaryKey: PropTypes.string,
  symbol: PropTypes.string,
};
export default GeneCell;
