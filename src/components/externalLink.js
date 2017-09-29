import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExternalLink extends Component {
  render() {
    return (
      <span style={{whiteSpace: 'nowrap'}}>
        <a
          href={this.props.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {this.props.children || this.props.href}
          {this.props.href && (
            <i
              className="fa fa-external-link"
              style={{margin: '0 3px', fontSize: '85%'}}
            />
          )}
        </a>
      </span>
    );
  }
}

ExternalLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
};

export default ExternalLink;
