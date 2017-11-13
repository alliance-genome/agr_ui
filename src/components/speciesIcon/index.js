import React from 'react';
import PropTypes from 'prop-types';

import style from './style.css';

const SpeciesIcon = ({species, small, iconClass}) => {
  if (!species) {
    return null;
  }
  const speciesClass = style[species.replace(/<\/?[^>]+(>|$)/g, '').replace(' ', '-')];
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

SpeciesIcon.propTypes = {
  iconClass: PropTypes.string.isRequired,
  small: PropTypes.bool,
  species: PropTypes.bool,
};

export default SpeciesIcon;
