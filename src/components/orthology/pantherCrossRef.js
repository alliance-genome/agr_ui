import React, { Component, PropTypes } from 'react';
import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../attribute';
import ExternalLink from '../externalLink';

class PantherCrossRef extends Component {

  render() {
    const pantherCrossRef = (this.props.crossReferences || []).filter(
      (dat) => dat.crossRefCompleteUrl.match(/http:\/\/pantherdb.org.*/i)
    )[0];
    return (
      <AttributeList>
        <AttributeLabel>Panther</AttributeLabel>
        <AttributeValue>
          {
            pantherCrossRef ?
              <ExternalLink href={pantherCrossRef.crossRefCompleteUrl}>
                {pantherCrossRef.localId}
              </ExternalLink> : null
          }
        </AttributeValue>
      </AttributeList>

    );
  }
}

PantherCrossRef.propTypes = {
  crossReferences: PropTypes.arrayOf(
    PropTypes.shape({
      crossRefCompleteUrl: PropTypes.string.isRequired,
      localId: PropTypes.string.isRequired,
    })
  ),
};

export default PantherCrossRef;
