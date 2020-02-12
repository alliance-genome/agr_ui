import React from 'react';
import PropTypes from 'prop-types';
import { HashLink } from 'react-router-hash-link';
import $ from 'jquery';
import Scrollspy from 'react-scrollspy';

import { makeId } from '../../lib/utils';

import style from './style.scss';

const PageNav = ({children, sections}) => {
  return (
    <div className={style.pageNav}>
      <div className='navbar-expand-md'>
        {children}
        <div className='navbar-collapse collapse' id='data-page-nav'>
          <Scrollspy
            className={`list-group list-group-flush ${style.scrollSpy}`}
            componentTag='div'
            currentClassName='active'
            items={sections.map(({name}) => makeId(name))}
          >
            {
              sections.map(({name: section, level=0}) => {
                const style = {paddingLeft: `${level + 1}em`, border: 'none',};
                return (
                  <HashLink
                    className="list-group-item list-group-item-action"
                    key={section}
                    onClick={() => $('#data-page-nav').collapse('hide')}
                    style={style}
                    to={'#' + makeId(section)}
                  >
                    {section}
                  </HashLink>
                );
              })
            }
          </Scrollspy>
        </div>
      </div>
    </div>
  );
};

PageNav.propTypes = {
  children: PropTypes.node,
  sections: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    level: PropTypes.number,
  })),
};

export default PageNav;
