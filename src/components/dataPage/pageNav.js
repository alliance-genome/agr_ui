import React from 'react';
import PropTypes from 'prop-types';

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

        <div className='navbar-collapse collapse list-group list-group-flush' id='data-page-nav'>
          {
            sections && sections.map(section => (
              <a className='list-group-item list-group-item-action'
                 href={'#' + makeId(section)}
                 key={section}
              >
                {section}
              </a>
            ))
          }
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
