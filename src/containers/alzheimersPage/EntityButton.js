import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {UncontrolledTooltip} from 'reactstrap';
import style from './style.module.scss';


const EntityButton = ({children, id, to, tooltip,}) => {
  return (
    <>
      <Link className={style.actionButton} id={id} to={to}>
        {children}
        {tooltip && (
          <UncontrolledTooltip placement='bottom' target={id}>{tooltip}</UncontrolledTooltip>
        )}
      </Link>
    </>
  );
};

EntityButton.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  to: PropTypes.string,
  tooltip: PropTypes.string,
};

export default EntityButton;
