import React from 'react';
import PropTypes from 'prop-types';
import {dataSourceType} from '../../lib/types';
import DataSourceLink from '../dataSourceLink';
import CommaSeparatedList from '../commaSeparatedList';

const ProvidersCellCuration = ({ s}) => {
  return (
    <CommaSeparatedList listItemClassName='d-block'>
      {
        providers.map(provider => {
          const key = provider.sourceProvider.name +
            (provider.loadProvider ? provider.loadProvider.name : '');
          return (
            <span key={key}>
              <DataSourceLink reference={provider.sourceProvider} />
              {provider.loadProvider &&
              <>
                <i> via </i>
                <DataSourceLink reference={provider.loadProvider} />
              </>
              }
            </span>
          );
        })
      }
    </CommaSeparatedList>
  );
};

export default ProvidersCellCuration;
