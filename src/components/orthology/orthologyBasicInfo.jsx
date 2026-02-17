import React from 'react';
import PropTypes from 'prop-types';
import { AttributeList, AttributeLabel, AttributeValue } from '../attribute';
import DataSourceLinkCuration from '../dataSourceLinkCuration.jsx';

const OrthologyBasicInfo = ({ pantherCrossReference }) => {
  return (
    <AttributeList>
      <AttributeLabel>Gene tree</AttributeLabel>
      <AttributeValue>{pantherCrossReference && <DataSourceLinkCuration reference={pantherCrossReference} />}</AttributeValue>
    </AttributeList>
  );
};

OrthologyBasicInfo.propTypes = {
  pantherCrossReference: PropTypes.object,
};

export default OrthologyBasicInfo;
