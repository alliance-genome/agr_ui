import React from 'react';
import PropTypes from 'prop-types';
import {dataSourceType} from '../../lib/types';
import DataSourceLink from '../dataSourceLink.jsx';
import CommaSeparatedList from '../commaSeparatedList';

const ProvidersCell = ({providers}) => {
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
}

ProvidersCell.propTypes = {
  providers: PropTypes.arrayOf(PropTypes.shape({
    sourceProvider: dataSourceType.isRequired,
    loadProvider: dataSourceType,
  })).isRequired,
};;

export default ProvidersCell;
