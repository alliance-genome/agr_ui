import React from 'react';
import PropTypes from 'prop-types';
import { HashLink } from 'react-router-hash-link';
import $ from 'jquery';
import Scrollspy from 'react-scrollspy';

import { makeId } from '../../lib/utils';

import style from './style.scss';

const PageNav = ({entityName, extra, icon, link, sections}) => {
  return (
    <div className={`col-md-4 col-12 ${style.pageNav}`}>
      <div className='navbar-expand-md'>
        <div className={`${style.entity}`}>
          {icon && <span className='mr-2'>{icon}</span>}
          <span>
            <h4>{entityName}</h4>
            <div className='d-flex flex-column'>
              {extra}
              {link}
            </div>
          </span>
          <button className='navbar-toggler ml-auto' data-target='#data-page-nav' data-toggle='collapse' type='button'>
            <i className='fa fa-fw fa-bars' />
          </button>
        </div>

        <div className='navbar-collapse collapse' id='data-page-nav'>
          <Scrollspy className={`list-group list-group-flush ${style.scrollSpy}`}
                     componentTag='div'
                     currentClassName='active'
                     items={sections.map(makeId)}
          >
            {
              sections.map(section => (
                <HashLink className='list-group-item list-group-item-action'
                          key={section}
                          onClick={() => $('#data-page-nav').collapse('hide')}
                          to={'#' + makeId(section)}
                >
                  {section}
                </HashLink>
              ))
            }
          </Scrollspy>
        </div>
      </div>
    </div>
  );
};

PageNav.propTypes = {
  entityName: PropTypes.string.isRequired,
  extra: PropTypes.node,
  icon: PropTypes.node,
  link: PropTypes.node,
  sections: PropTypes.arrayOf(PropTypes.string),
};

export default PageNav;
