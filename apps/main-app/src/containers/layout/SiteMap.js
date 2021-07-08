import React from 'react';
import {Link} from 'react-router-dom';

import {NAV_MENU} from '../../constants';

import style from './style.scss';
import SubMenuItem from './navigation/SubMenuItem';

const SiteMap = () => {
  return (
    <div className={style.siteMapContainer}>
      {
        NAV_MENU.map(page => {
          // no need for the Home link here
          if (page.route === '/') {
            return;
          }
          const item = page.route ?
            <Link to={page.route}>{page.label}</Link> :
            <span className={style.siteMapHeader}>{page.label}</span>;
          return (
            <div className={style.siteMapGroup} key={page.label}>
              {item}
              {page.sub &&
              <ul className='list-unstyled mb-0 ml-2'>
                {page.sub.map(sub => (
                  <li key={sub.route}>
                    <SubMenuItem item={sub}>{sub.label}</SubMenuItem>
                  </li>
                ))}
              </ul>
              }
            </div>
          );
        })
      }
    </div>
  );
};

export default SiteMap;
