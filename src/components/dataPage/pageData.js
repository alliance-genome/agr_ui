import React from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

const PageData = ({children}) => {
  return (
    <div className={`col-md col-12 ${style.dataContainer}`}>
      <div className={style.dataContent}>
        {children}
      </div>
    </div>
  );
};

PageData.propTypes = {
  children: PropTypes.node,
};

export default PageData;
