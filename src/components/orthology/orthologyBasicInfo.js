import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../attribute';
import PantherCrossRef from './pantherCrossRef';

class OrthologyBasicInfo extends Component {

  render() {

    return (
      <AttributeList>

        <AttributeLabel>Focus gene</AttributeLabel>
        <AttributeValue>
          {this.props.focusGeneSymbol}
        </AttributeValue>

        <AttributeLabel>Panther</AttributeLabel>
        <AttributeValue>
          <PantherCrossRef crossReferences={this.props.crossReferences} />
        </AttributeValue>

      </AttributeList>

    );
  }
}

OrthologyBasicInfo.propTypes = {
  crossReferences: PropTypes.any,
  focusGeneSymbol: PropTypes.string,
};

export default OrthologyBasicInfo;
