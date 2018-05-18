import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

class ExternalLink extends Component {
  render () {
    const {children, href, title} = this.props;
    return (
      <a
        className={href ? style.externalLink : ''}
        href={href || null}
        rel="noopener noreferrer"
        target="_blank"
        title={title}
      >
        {children || href}
      </a>
    );
  }
}

ExternalLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  title: PropTypes.string,
};

export default ExternalLink;
