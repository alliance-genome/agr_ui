import React from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

const PageData = ({children}) => {
  return (
    <div className={`col-md col-12 ${style.dataContainer}`}>
      {children}
    </div>
  );
};

PageData.propTypes = {
  children: PropTypes.node,
};

export default PageData;
