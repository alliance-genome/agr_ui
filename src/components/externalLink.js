import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

class ExternalLink extends Component {
  render() {
    if(this.props.flag){
      return (
      <span>
        <a
          className={this.props.href ? style.externalLink : ''}
          dangerouslySetInnerHTML={{ __html: this.props.displayName }}
          href={this.props.href}
          rel="noopener noreferrer"
          target="_blank"
          title={this.props.title}
        />
      </span>
      );

    }
    else{
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
}

ExternalLink.propTypes = {
  children: PropTypes.node,
  displayName: PropTypes.string,
  flag:PropTypes.bool,
  href: PropTypes.string,
  title: PropTypes.string,

};

export default ExternalLink;
