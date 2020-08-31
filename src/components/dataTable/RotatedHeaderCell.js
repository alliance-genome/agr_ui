import React from 'react';
import PropTypes from 'prop-types';

import style from './RotatedHeaderCell.scss';

const RotatedHeaderCell = ({children}) => {
  return (
    <div className={style.label}>
      {children}
    </div>
  );
};

RotatedHeaderCell.propTypes = {
  children: PropTypes.node,
};

export default RotatedHeaderCell;
