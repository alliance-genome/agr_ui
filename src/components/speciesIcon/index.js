import React from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

const SpeciesIcon = ({species, scale, iconClass}) => {
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
  const size = {
    'min-width': 78 * scale,
    'min-height': 90 * scale,
  };
  return <span className={classes.join(' ')} style={size} />;
};

SpeciesIcon.propTypes = {
  iconClass: PropTypes.string,
  scale: PropTypes.number,
  species: PropTypes.string,
};

SpeciesIcon.defaultProps = {
  scale: 1,
};

export default SpeciesIcon;
