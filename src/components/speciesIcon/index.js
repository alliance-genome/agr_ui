import React from 'react';

import style from './style.css';

const SpeciesIcon = ({species, small, iconClass}) => {
  if (!species) {
    return null;
  }
  const speciesClass = style[species.replace(' ', '-')];
  if (!speciesClass) {
    return null;
  }
  let classes = [style.speciesIcon, speciesClass];
  if (small) {
    classes.push(style.small);
  }
  if (iconClass) {
    classes.push(iconClass);
  }
  return speciesClass && (
    <div className={classes.join(' ')} />
  );
};

export default SpeciesIcon;
