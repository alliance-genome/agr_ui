import React from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

const SpeciesIcon = ({inNav = false, species, scale = 1, iconClass}) => {
  if (!species) {
    return null;
  }
  const speciesClass = style[species.replace(' ', '-')];
  if (!speciesClass) {
    return null;
  }
  let classes = [style.speciesIcon, speciesClass];
  if (iconClass) {
    classes.push(iconClass);
  }
  if (inNav) {
    classes.push(style.inNav);
  }
  const size = {
    minWidth: 78 * scale,
    minHeight: 90 * scale,
  };
  return <span className={classes.join(' ')} style={size} />;
};

SpeciesIcon.propTypes = {
  iconClass: PropTypes.string,
  inNav: PropTypes.bool,
  scale: PropTypes.number,
  species: PropTypes.string,
};

export default SpeciesIcon;
