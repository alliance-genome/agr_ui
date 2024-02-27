import React from 'react';

import style from './SpeciesName.module.scss';

const SpeciesName = (props) => {
  return <span {...props} className={style.speciesName} />;
};

SpeciesName.propTypes = {
};

export default SpeciesName;
