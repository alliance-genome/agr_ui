import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import style from './style.module.scss';

const CollapsibleList = ({ children, collapsedSize, showBullets }) => {
  const [ collapsed, setCollapsed ] = useState(true);

  if (!children) {
    return null;
  }

  const toggle = () => setCollapsed(prev => !prev);
  const childCount = React.Children.count(children);
  const label = ' ' + (collapsed ? ('Show All ' + childCount) : ('Show First ' + collapsedSize));
  const caretIcon = (collapsed ? faCaretDown : faCaretUp);
  return (
    <div>
      <ul className={`${style.collapsibleList} ${showBullets ? style.bulleted : ''}`}>
        {React.Children.map(children, (child, idx) => {
          if (collapsed && idx >= collapsedSize) {
            return;
          }
          return <li>{child}</li>;
        })}
      </ul>
      {childCount > collapsedSize && (
        <span>
          <button className={`btn btn-link btn-sm ${style.toggleLink}`} onClick={toggle}>
            <FontAwesomeIcon icon={caretIcon} className={`${style.toggleIcon}`} />
            {label}
          </button>
        </span>
      )}
    </div>
  );
};

CollapsibleList.propTypes = {
  children: PropTypes.node,
  collapsedSize: PropTypes.number,
  showBullets: PropTypes.bool,
};

CollapsibleList.defaultProps = {
  collapsedSize: 2,
  showBullets: false,
};

export default CollapsibleList;
