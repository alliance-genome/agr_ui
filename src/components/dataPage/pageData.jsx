import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';

const PageData = ({ children }) => {
  return <div className={style.dataContainer}>{children}</div>;
};

PageData.propTypes = {
  children: PropTypes.node,
};

export default PageData;
