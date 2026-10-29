import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';
import { CATEGORIES } from '../../constants';

const CategoryLabel = ({ category, displayName, hideImage, hideLabel }) => {
  const current = CATEGORIES.find((cat) => cat.name === category);
  const label = displayName || current?.displayName || category;
  return (
    <span className={`${style.categoryLabel} ${style[category]} ${hideImage ? style.noIcon : ''}`}>
      {!hideLabel && label}
    </span>
  );
};

CategoryLabel.propTypes = {
  category: PropTypes.string,
  // Overrides the name from CATEGORIES. Needed for categories that are not in
  // that list, which exists to drive the search UI.
  displayName: PropTypes.string,
  hideImage: PropTypes.bool,
  hideLabel: PropTypes.bool,
};

export default CategoryLabel;
