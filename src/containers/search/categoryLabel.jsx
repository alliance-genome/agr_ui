import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';
import { CATEGORIES } from '../../constants';

const CategoryLabel = ({ category, hideImage, hideLabel }) => {
  let current = CATEGORIES.find((cat) => cat.name === category);
  return (
    <span className={`${style.categoryLabel} ${style[category]} ${hideImage ? style.noIcon : ''}`}>
      {!hideLabel && current && current.displayName}
    </span>
  );
};

CategoryLabel.propTypes = {
  category: PropTypes.string,
  hideImage: PropTypes.bool,
  hideLabel: PropTypes.bool,
};

export default CategoryLabel;
