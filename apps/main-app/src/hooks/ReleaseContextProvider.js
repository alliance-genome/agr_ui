import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import fetchData from '../lib/fetchData';

const ReleaseContext = createContext();

const ReleaseContextProvider = ({children}) => {
  const releaseUrl = '/api/releaseInfo';

  const {
    data,
    isLoading,
    isError,
  } = useQuery([releaseUrl], () => {
  /*
    return {
      'releaseDate': "2021-06-23T04:00:00.000+0000",
      'releaseVersion': '4.1.0',
      'snapShotDate': "2021-06-09T15:21:07.880+0000"
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
