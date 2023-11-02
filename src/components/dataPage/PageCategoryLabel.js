import React from 'react';
import PropTypes from 'prop-types';
import CategoryLabel from '../../containers/search/categoryLabel';

import style from './style.module.scss';

const PageCategoryLabel = ({category}) => (
  <div className={style.pageCategory}>
    <CategoryLabel category={category} />
  </div>
);

PageCategoryLabel.propTypes = {
  category: PropTypes.string,
};

export default PageCategoryLabel;
