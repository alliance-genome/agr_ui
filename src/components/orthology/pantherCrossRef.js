import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExternalLink from '../externalLink';

class PantherCrossRef extends Component {

  render() {
    const crossReferences = (this.props.crossReferences || {}).generic_cross_reference || [];
    const pantherCrossRef = crossReferences.find( ref => ref.prefix === 'PANTHER' );
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
