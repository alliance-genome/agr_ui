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
    const { parent, slug, title, type } = this.props;

    let menuCat = (type === 'post') ? 'post' : parent;
    let menuContainer = this.getStyle(menuCat);

    // background image is typically decided by the parent page, but this one
    // is a special case for now.
    // TODO: should all banner images be determined by slug instead of parent? can it come from wordpress instead of hardcoded?
    let menuStyle;
    if (slug === 'coronavirus-resources') {
      menuStyle = {
        backgroundImage: 'url(\'https://alliancegenome.files.wordpress.com/2020/05/covid19.png\')'
      };
    }

    return (
      <div>
        <div className={menuContainer} style={menuStyle}>
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
  slug: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default SecondaryNav;
