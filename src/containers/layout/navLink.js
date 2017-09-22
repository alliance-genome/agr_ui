import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import style from './style.css';

class NavLink extends Component {
  render() {
    return(
      <Link className={`nav-link ${style.navLink}`} to={this.props.url}>{this.props.label} </Link>
    );
  }
}
NavLink.propTypes={
  label: PropTypes.string,
  url: PropTypes.string
};
export default NavLink;
