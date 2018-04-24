import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.css';

class ExternalLink extends Component {
  render() {
    const{children, displayName, flag, href, title} = this.props;
    debugger;
    if(flag){
      return (
        <span>
          <a
            className={href ? style.externalLink : ''}
            dangerouslySetInnerHTML={{ __html: displayName }}
            href={href}
            rel="noopener noreferrer"
            target="_blank"
            title={title}
          >
            {children || href}
          </a>
        </span>
      );
    }
    else{
      return (
        <span>
          <a
            className={href ? style.externalLink : ''}
            href={href}
            rel="noopener noreferrer"
            target="_blank"
            title={title}
          >
            {children || href}
          </a>
        </span>
      );
    }
  }
}

ExternalLink.propTypes = {
  children: PropTypes.node,
  displayName: PropTypes.string,
  flag: PropTypes.bool,
  href: PropTypes.string,
  title: PropTypes.string,
};

export default ExternalLink;
