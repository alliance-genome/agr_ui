import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Collapse } from 'reactstrap';
import Scrollspy from 'react-scrollspy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { makeId } from '../../lib/utils';

import style from './style.module.scss';

const PageNav = ({ children, sections }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={style.pageNav}>
      <div className="navbar-expand-md">
        <div className={`${style.entity}`}>
          <div className="w-100">{children}</div>
          <button className="navbar-toggler ml-auto" onClick={() => setIsOpen(!isOpen)} type="button">
            <FontAwesomeIcon icon={faBars} fixedWidth />
          </button>
        </div>
        <Collapse isOpen={isOpen} navbar>
          <Scrollspy
            className={`list-group list-group-flush ${style.scrollSpy}`}
            componentTag="div"
            currentClassName="active"
            items={sections.filter((s) => !s.to).map(({ name }) => makeId(name))}
          >
            {sections.map(({ name: section, level = 0, count, to }) => {
              const itemStyle = { paddingLeft: `${level + 1}em` };
              const hasCount = count !== undefined && count !== null;
              const badgeClass = `${style.navBadge} ${count === 0 ? style.navBadgeZero : ''}`;
              const inner = (
                <>
                  <span>{section}</span>
                  {hasCount && <span className={badgeClass}>{count.toLocaleString()}</span>}
                </>
              );
              if (to) {
                return (
                  <Link
                    className={`list-group-item list-group-item-action ${style.navItem}`}
                    key={section}
                    onClick={() => setIsOpen(false)}
                    style={itemStyle}
                    to={to}
                  >
                    {inner}
                  </Link>
                );
              }
              return (
                <HashLink
                  className={`list-group-item list-group-item-action ${style.navItem}`}
                  key={section}
                  onClick={() => setIsOpen(false)}
                  style={itemStyle}
                  to={'#' + makeId(section)}
                >
                  {inner}
                </HashLink>
              );
            })}
          </Scrollspy>
        </Collapse>
      </div>
    </div>
  );
};

PageNav.propTypes = {
  children: PropTypes.node,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      level: PropTypes.number,
      count: PropTypes.number,
      to: PropTypes.string,
    })
  ),
};

export default PageNav;
