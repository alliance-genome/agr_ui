import React, { useState } from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

const CollapsibleList = ({ children, collapsedSize, showBullets }) => {
  const [ collapsed, setCollapsed ] = useState(true);

  if (!children) {
    return null;
  }

  const toggle = () => setCollapsed(prev => !prev);
  const childCount = React.Children.count(children);
  const label = ' ' + (collapsed ? ('Show All ' + childCount) : ('Show First ' + collapsedSize));
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
            <i className={`${style.toggleIcon} fa fa-caret-up ${collapsed ? 'fa-rotate-180' : ''}`} />
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
