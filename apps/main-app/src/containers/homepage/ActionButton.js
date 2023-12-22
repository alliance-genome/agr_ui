import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCode, faBookOpen, faDownload, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './style.scss';

library.add(faCode, faBookOpen, faDownload, faLightbulb);

const ActionButton = ({children, icon, size, id, to, tooltip,}) => {
  return (
    <>
      <Link className={style.actionButton} id={id} to={to}>
        <FontAwesomeIcon icon={icon} size={size} className={`${style.icon}`} />
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
  size: PropTypes.string,
  id: PropTypes.string.isRequired,
  to: PropTypes.string,
  tooltip: PropTypes.string,
};

export default ActionButton;
