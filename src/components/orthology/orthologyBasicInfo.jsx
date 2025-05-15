import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../attribute';
import DataSourceLink from '../dataSourceLink.jsx';

class OrthologyBasicInfo extends Component {

  render() {
    const { pantherCrossReference } = this.props;

    return (
      <AttributeList>

        <AttributeLabel>Gene tree</AttributeLabel>
        <AttributeValue>
          {pantherCrossReference && <DataSourceLink reference={pantherCrossReference} />}
        </AttributeValue>

      </AttributeList>

    );
  }
}

OrthologyBasicInfo.propTypes = {
  pantherCrossReference: PropTypes.object,
};

export default OrthologyBasicInfo;
