import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExternalLink from '../externalLink';

class PantherCrossRef extends Component {

  render() {
    const pantherCrossRef = (this.props.crossReferences['gene/panther'] || [])[0];
    return (
      pantherCrossRef ?
        <ExternalLink href={pantherCrossRef.crossRefCompleteUrl}>
          {pantherCrossRef.name}
        </ExternalLink> : null
    );
  }
}

PantherCrossRef.propTypes = {
  crossReferences: PropTypes.object,
};

export default PantherCrossRef;
