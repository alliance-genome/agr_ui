import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';
import { NAV_MENU } from '../../constants';
import { Link } from 'react-router-dom';

class NavLinksContainer extends Component {
  render() {
    return (
      <div className={this.props.type}>
        {
          NAV_MENU.map(page => (
            <div className={style.navContainer} key={page.route}>
              <Link className={`nav-link ${style.navLink}`} to={page.route}>
                {page.label}
              </Link>
              <div className={style.sub_nav}>
                <ul className='list-unstyled'>
                  {page.sub && page.sub.map(sub => (
                    <li className={style.subMenuListItem} key={sub.route}>
                      <Link className={style.sub_nav_link} to={sub.route}>
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

NavLinksContainer.propTypes={
  type: PropTypes.string,
};

export default NavLinksContainer;
