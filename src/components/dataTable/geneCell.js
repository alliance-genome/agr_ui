import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import style from './style.scss';

const GeneCell = ({id, symbol} = {}) => {
  return (
    <Link className={style.breakWords} to={'/gene/' + id}>{symbol}</Link>
  );
};

GeneCell.propTypes = {
  id: PropTypes.string,
  symbol: PropTypes.string,
};
export default GeneCell;
