import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.css';

class ExternalLink extends Component {
  render() {
    return (
      <span>
        <a
          className={this.props.href ? style.externalLink : ''}
          href={this.props.href}
          rel="noopener noreferrer"
          target="_blank"
          title={this.props.title}
        >
          {this.props.children || this.props.href}
        </a>
      </span>
    );
  }
}

ExternalLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  title: PropTypes.string,
};

export default ExternalLink;
