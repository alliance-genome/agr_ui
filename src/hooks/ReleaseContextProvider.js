import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import fetchData from '../lib/fetchData';

const ReleaseContext = createContext();

const ReleaseContextProvider = ({children}) => {
  const releaseUrl = '/api/releaseInfo/summary';

  const {
    data,
    isLoading,
    isError,
  } = useQuery([releaseUrl], () => {
  /*
    return {
      'releaseInfo': {
        'releaseDate': null,
        'releaseVersion': '4.1.0',
        'snapShotDate': null
      },
      'metaData': [
        {
          'date_produced': null,
          'mod': 'TAGS',
          'release': 'NotSpecified',
          'type': 'HTP'
        },
        {
          'date_produced': null,
          'mod': 'SGD',
          'release': 'SGD 1.0.1.4 2021-01-21',
          'type': 'BGI'
        },
      ]
    }; */
    return fetchData(releaseUrl);
  });

  const value = useMemo(() => ({
    data,
    isLoading,
    isError,
  }), [data, isLoading, isError]);

  return (
    <ReleaseContext.Provider value={value}>
      {children}
    </ReleaseContext.Provider>
  );
};

ReleaseContextProvider.propTypes = {
  children: PropTypes.any,
};

export default ReleaseContextProvider;

export function useRelease() {
  const context = React.useContext(ReleaseContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}