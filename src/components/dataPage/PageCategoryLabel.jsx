import React from 'react';
import PropTypes from 'prop-types';
import CategoryLabel from '../../containers/search/categoryLabel.jsx';

import style from './style.module.scss';

const PageCategoryLabel = ({ category, displayName }) => (
  <div className={style.pageCategory}>
    <CategoryLabel category={category} displayName={displayName} />
  </div>
);

PageCategoryLabel.propTypes = {
  category: PropTypes.string,
  displayName: PropTypes.string,
};

export default PageCategoryLabel;
