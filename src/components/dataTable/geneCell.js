import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const GeneCell = (props) => {
  const {id, symbol} = props;
  return (
    <Link to={'/gene/' + id}>{symbol}</Link>
  );
};

GeneCell.propTypes = {
  id: PropTypes.string,
  symbol: PropTypes.string,
};
export default GeneCell;
