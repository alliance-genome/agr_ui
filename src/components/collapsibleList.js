/* eslint-disable react/no-set-state */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import style from './style.css';

const renderList = (items) => {
  return items.reduce((a, b) => [a, ', ', b]);
};

class CollapsibleList extends Component {
  constructor(props) {
    super(props);
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
    const { collapsedSize, items } = this.props;
    const { collapsed } = this.state;
    if (!items) {
      return null;
    }
    const itemView = collapsed ? items.slice(0, collapsedSize) : items;
    const moreLink = <span>... More <i className='fa fa-caret-right' /></span>;
    const lessLink = <span>Less <i className='fa fa-caret-left' /></span>;
    return (
      <div>
        {renderList(itemView)}
        {items.length > collapsedSize && (
          <span>
            <button className={`btn btn-link ${style.toggleLink}`} onClick={this.toggleCollapsed.bind(this)}>
              {collapsed ? moreLink : lessLink}
            </button>
          </span>
        )}
      </div>
    );
  }
}

CollapsibleList.propTypes = {
  collapsedSize: PropTypes.number,
  items: PropTypes.array,
};

CollapsibleList.defaultProps = {
  collapsedSize: 5,
};

export default CollapsibleList;
