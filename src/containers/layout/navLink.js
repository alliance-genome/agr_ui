import React, { Component } from 'react';
import { Link } from 'react-router';

import style from './style.css';

class NavLink extends Component {
  render() {
    return(
      <Link className={`nav-link ${style.navLink}`} to={this.props.url}>{this.props.label} </Link>
    );
  }
}
NavLink.propTypes={
  label: React.PropTypes.string,
  url: React.PropTypes.string
};
export default NavLink;
