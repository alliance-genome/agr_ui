import React, { Component } from 'react';

import style from './style.css';
import NavLinksContainer from './navLinksContainer';


class SiteMap extends Component {
  render() {
    return (
      <div className={style.site_map}>
        <div className={style.sectionHeader}><h4>Site Map</h4></div>
        <NavLinksContainer type={style.content} />
      </div>
    );
  }
}
export default SiteMap;
