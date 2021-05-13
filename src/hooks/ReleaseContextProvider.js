import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import fetchData from '../lib/fetchData';

const ReleaseContext = createContext();

const ReleaseContextProvider = ({children}) => {
  const devServerAPIHostname = process.env.NODE_ENV === 'production' ? '' :
    (process.env.API_URL || '').replace(/https?:\/\//, '');
  const [host] = (devServerAPIHostname || window.location.hostname).split('.');
  const releaseUrl = `https://fms.alliancegenome.org/api/releaseversion/current?host=${host}`;

  const {
    data,
    isLoading,
    isError,
  } = useQuery([releaseUrl], () => {
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