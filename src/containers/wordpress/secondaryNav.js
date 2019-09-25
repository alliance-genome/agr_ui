import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

class SecondaryNav extends Component {
  getStyle (menuCat) {
    switch (menuCat) {
    // magic numbers are wordpress parent IDs
    case 16:
      return style.homeMenuContainer;
    case 2:
      return style.aboutMenuContainer;
    case 3:
      return style.contactMenuContainer;
    case 1184:
      return style.workingGroupsMenuContainer;
    case 473:
      return style.postMenuContainer;
    case 179:
      return style.helpMenuContainer;
    case 'post':
      return style.postMenuContainer;
    }
  }

  render () {
    const { parent, title, type } = this.props;

    let menuCat = (type === 'post') ? 'post' : parent;
    let menuContainer = this.getStyle(menuCat);

    return (
      <div>
        <div className={menuContainer}>
          <div className='container-fluid'>
            <div className={style.secondaryNavEmptyRow} />
            <div className={`row ${style.secondaryNav}`}>
              <div className='container'>
                <h1 dangerouslySetInnerHTML={{__html: title}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SecondaryNav.propTypes = {
  parent: PropTypes.number,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default SecondaryNav;
