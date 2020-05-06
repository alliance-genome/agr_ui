import React from 'react';
import PropTypes from 'prop-types';
import {dataSourceType} from '../../lib/types';
import DataSourceLink from '../dataSourceLink';

const ProvidersCell = ({providers}) => {
  return (
    <>
      <DataSourceLink reference={providers.sourceProvider} />
      {providers.loadProvider &&
        <>
          <i> via </i>
          <DataSourceLink reference={providers.loadProvider} />
        </>
      }
    </>
  );
};

ProvidersCell.propTypes = {
  providers: PropTypes.shape({
    sourceProvider: dataSourceType.isRequired,
    loadProvider: dataSourceType,
  }).isRequired,
};

export default ProvidersCell;
