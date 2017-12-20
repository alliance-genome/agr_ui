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
          {this.props.focusGeneSymbol} - (Species: {this.props.species})
        </AttributeValue>

        <AttributeLabel>Gene tree</AttributeLabel>
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
  species: PropTypes.string,
};

export default OrthologyBasicInfo;
