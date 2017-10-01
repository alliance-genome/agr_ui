import React, { Component } from 'react';

import style from './style.css';
import NavLinksContainer from './navLinksContainer';

class Menu extends Component {
  render() {
    return (
      <NavLinksContainer type={style.nav} />
    );
  }
}
export default Menu;
