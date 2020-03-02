import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import style from './style.scss';

const ActionButton = ({children, icon, to}) => {
  return (
    <Link className={style.actionButton} to={to}>
      <i className={`fa ${icon} ${style.icon}`} />
      {children}
    </Link>
  );
};

ActionButton.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  to: PropTypes.string,
};

export default ActionButton;
