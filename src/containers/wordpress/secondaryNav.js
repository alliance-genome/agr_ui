import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import style from './style.css';
import { MENU_IDS, WORDPRESS_PAGES } from './../../constants';

class SecondaryNav extends Component {
  getStyle (menuCat) {
    switch (menuCat) {
    case 'home':
      return style.homeMenuContainer;
    case 'about-us':
      return style.aboutMenuContainer;
    case 'contact-us':
      return style.contactMenuContainer;
    case 'projects-work-products-publications':
      return style.projectsMenuContainer;
    case 'post':
      return style.postMenuContainer;
    }
  }

  render () {
    let container = [];
    let pageTitle = this.props.title;
    let pageId = this.props.id;
    let parentId = this.props.parent;

    let menuCat = (this.props.type === 'post') ? 'post' : MENU_IDS[this.props.parent];
    let menuContainer = this.getStyle(menuCat);

    container.push(<Link key='home' to='/home'>Home </Link>);
    if (this.props.type === 'post') {
      container.push(<Link key='posts' to='/posts'> /News</Link>);
    }
    else {
      if (menuCat === 'home') {
        return (<div />);
      }
      let parent = MENU_IDS[parentId];
      let parentLabel = WORDPRESS_PAGES[parent].label;
      container.push(<Link key={parentLabel} to={`/${parent}`}> /{parentLabel}/</Link>);
      if (parentId !== pageId) {
        container.push(<span dangerouslySetInnerHTML={{__html: pageTitle}} key='title' />);
      }

    }
    return (
      <div className={menuContainer}>
        <div className='container-fluid'>
          <div className={style.secondaryNavEmptyRow} />
          <div className={`row ${style.secondaryNav}`}>
            <div className='container'>
              <div className='col-xs-12 col-sm-4'>{container} </div>
              <div className='col-xs-12 col-sm-8 text-xs-right'>
                <h1 dangerouslySetInnerHTML={{__html: pageTitle}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SecondaryNav.propTypes = {
  id: PropTypes.number,
  parent: PropTypes.number,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default SecondaryNav;
