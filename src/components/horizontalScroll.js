import React from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

const HorizontalScroll = ({children, width}) => {
  return (
    <div className={style.hScrollOuter}>
      <div className={style.hScrollInner} style={{minWidth: width}}>
        {children}
      </div>
    </div>
  );
};

HorizontalScroll.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number,
};

export default HorizontalScroll;
