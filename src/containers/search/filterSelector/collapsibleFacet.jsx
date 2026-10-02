/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const CollapsibleFacet = ({ children, label = 'Expand' }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = (e) => {
    if (e) e.preventDefault();
    setIsCollapsed((prev) => !prev);
  };

  const actionText = !isCollapsed ? label : 'Hide';

  return (
    <div className="row">
      <div className={`col-md-12 ${style.mobileToolbar}`}>
        <a className={`${style.textAction} font-weight-bold`} onClick={handleToggle}>
          {actionText}
          {actionText === 'Hide' ? '' : <FontAwesomeIcon icon={faAngleDown} className={`${style.filterCaret}`} />}
        </a>
        {isCollapsed ? children : null}
      </div>
    </div>
  );
};

CollapsibleFacet.propTypes = {
  children: PropTypes.element.isRequired,
  label: PropTypes.string,
};

export default CollapsibleFacet;
