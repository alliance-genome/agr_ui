/* eslint-disable react/no-set-state */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

class CollapsibleList extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.toggleCollapsed.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapsed() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { children, collapsedSize } = this.props;
    const { collapsed } = this.state;
    if (!children) {
      return null;
    }
    const childCount = React.Children.count(children);
    return (
      <div>
        <ul className={style.collapsibleList}>
          {React.Children.map(children, (child, idx) => {
            if (collapsed && idx >= collapsedSize) return;
            return <li>{child}</li>;
          })}
        </ul>
        {childCount > collapsedSize && (
          <span>
            <button className={`btn btn-link ${style.toggleLink}`} onClick={this.handleToggle}>
              <i className={`${style.toggleIcon} fa fa-caret-up ${collapsed ? 'fa-rotate-180' : ''}`} />
              {' ' + (collapsed ? 'More' : 'Less')}
            </button>
          </span>
        )}
      </div>
    );
  }
}

CollapsibleList.propTypes = {
  children: PropTypes.node,
  collapsedSize: PropTypes.number,
};

CollapsibleList.defaultProps = {
  collapsedSize: 2,
};

export default CollapsibleList;
