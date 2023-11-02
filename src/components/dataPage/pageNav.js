import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { HashLink } from 'react-router-hash-link';
import { Collapse } from 'reactstrap';
import Scrollspy from 'react-scrollspy';

import { makeId } from '../../lib/utils';

import style from './style.module.scss';

const PageNav = ({children, sections}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={style.pageNav}>
      <div className='navbar-expand-md'>
        <div className={`${style.entity}`}>
          <div className='w-100'>
            {children}
          </div>
          <button className='navbar-toggler ml-auto' onClick={() => setIsOpen(!isOpen)} type='button'>
            <i className='fa fa-fw fa-bars' />
          </button>
        </div>
        <Collapse isOpen={isOpen} navbar>
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
                    onClick={() => setIsOpen(false)}
                    style={style}
                    to={'#' + makeId(section)}
                  >
                    {section}
                  </HashLink>
                );
              })
            }
          </Scrollspy>
        </Collapse>
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
