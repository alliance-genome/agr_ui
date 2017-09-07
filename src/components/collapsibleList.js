/* eslint-disable react/no-set-state */
import React, {Component} from 'react';

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

  componentWillReceiveProps() {
    // collapse the list again if we recieve new list
    // TODO: it seems like you need to click "more" twice to expand the
    // first time. perhaps this may not be the best place to do this.
    this.setState({
      collapsed: true
    });
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
    let itemView = items;
    if (collapsed) {
      itemView = itemView.slice(0, collapsedSize);
    }
    const moreLink = <span>... More <i className='fa fa-caret-right' /></span>;
    const lessLink = <span>Less <i className='fa fa-caret-left' /></span>;
    return (
      <div>
        {renderList(itemView)}
        {items.length > collapsedSize && (
          <span>
            <a className={style.toggleLink} href='#' onClick={this.toggleCollapsed.bind(this)}>
              {collapsed ? moreLink : lessLink}
            </a>
          </span>
        )}
      </div>);
  }
}

CollapsibleList.propTypes = {
  collapsedSize: React.PropTypes.number,
  items: React.PropTypes.array,
};

CollapsibleList.defaultProps = {
  collapsedSize: 5,
};

export default CollapsibleList;
