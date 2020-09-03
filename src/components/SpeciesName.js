import React from 'react';
import PropTypes from 'prop-types';

import style from './SpeciesName.scss';

const SpeciesName = ({children}) => {
  return <span className={style.speciesName}>{children}</span>;
};

SpeciesName.propTypes = {
  children: PropTypes.node,
};

export default SpeciesName;
