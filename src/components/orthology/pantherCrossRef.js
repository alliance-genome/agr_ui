import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExternalLink from '../externalLink';

class PantherCrossRef extends Component {

  render() {
    const pantherCrossRef = (this.props.crossReferences || []).filter(
      (dat) => dat.crossRefCompleteUrl.match(/http:\/\/pantherdb.org.*/i)
    )[0];
    return (
      pantherCrossRef ?
        <ExternalLink href={pantherCrossRef.crossRefCompleteUrl}>
          {pantherCrossRef.name}
        </ExternalLink> : null
    );
  }
}

PantherCrossRef.propTypes = {
  crossReferences: PropTypes.arrayOf(
    PropTypes.shape({
      crossRefCompleteUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default PantherCrossRef;
