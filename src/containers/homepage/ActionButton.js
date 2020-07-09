import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {UncontrolledTooltip} from 'reactstrap';

import style from './style.scss';

const ActionButton = ({children, icon, id, to, tooltip}) => {
  return (
    <>
      <Link className={style.actionButton} id={id} to={to}>
        <i className={`fa ${icon} ${style.icon}`} />
        {children}
        {tooltip && (
          <UncontrolledTooltip placement='bottom' target={id}>{tooltip}</UncontrolledTooltip>
        )}
      </Link>
    </>
  );
};

ActionButton.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  id: PropTypes.string.isRequired,
  to: PropTypes.string,
  tooltip: PropTypes.string,
};

export default ActionButton;
