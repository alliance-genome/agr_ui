import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import style from './style.scss';

const GeneCellCuration = ({curie, symbol} = {}) => {
  return (
    <Link className={style.breakWords} to={'/gene/' + curie}>{symbol}</Link>
  );
};

GeneCellCuration.propTypes = {
  id: PropTypes.string,
  symbol: PropTypes.string,
};
export default GeneCellCuration;
