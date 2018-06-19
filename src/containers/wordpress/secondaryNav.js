import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';
import { NAV_MENU } from '../../constants';

class SecondaryNav extends Component {
  getStyle (menuCat) {
    switch (menuCat) {
    case '/':
      return style.homeMenuContainer;
    case '/about-us':
      return style.aboutMenuContainer;
    case '/contact-us':
      return style.contactMenuContainer;
    case '/projects-work-products-publications':
      return style.projectsMenuContainer;
    case 'post':
      return style.postMenuContainer;
    }
  }

  render () {
    const { parent, title, type } = this.props;
    const parentPage = NAV_MENU.find(page => page.wordpressId === parent);

    let menuCat = (type === 'post') ? 'post' : (parentPage.route || '/');
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
