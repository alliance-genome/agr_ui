import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../attribute';
import DataSourceLink from '../../components/dataSourceLink';

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
          <DataSourceLink reference={this.props.pantherCrossReference} />
        </AttributeValue>

      </AttributeList>

    );
  }
}

OrthologyBasicInfo.propTypes = {
  focusGeneSymbol: PropTypes.string,
  pantherCrossReference: PropTypes.object,
  species: PropTypes.string,
};

export default OrthologyBasicInfo;
