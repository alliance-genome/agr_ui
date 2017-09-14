import React, { Component, PropTypes } from 'react';
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
  symbol: PropTypes.string,
};

export default OrthologyBasicInfo;
