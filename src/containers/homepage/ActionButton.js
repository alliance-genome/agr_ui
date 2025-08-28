import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCode, faBookOpen, faDownload, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './style.module.scss';

library.add(faCode, faBookOpen, faDownload, faLightbulb);

const ActionButton = ({ children, icon, size, id, to, tooltip, external = false }) => {
  const Contents = () => (
    <>
      <FontAwesomeIcon icon={icon} size={size} className={`${style.icon}`} />
      {children}
      {tooltip && (
        <UncontrolledTooltip placement="bottom" target={id}>
          {tooltip}
        </UncontrolledTooltip>
      )}
    </>
  );

  if (external) {
    return (
      <a className={style.actionButton} id={id} href={to}>
        <Contents />
      </a>
    );
  }

  return (
    <Link className={style.actionButton} id={id} to={to}>
      <Contents />
    </Link>
  );
};

ActionButton.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  size: PropTypes.string,
  id: PropTypes.string.isRequired,
  to: PropTypes.string,
  tooltip: PropTypes.string,
  external: PropTypes.bool,
};

export default ActionButton;
