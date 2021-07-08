import React from 'react';
import LoadingSpinner from '../../components/loadingSpinner';
import { useRelease } from '../../hooks/ReleaseContextProvider';

const ReleaseBanner = () => {

  const {
    data: releaseInfo,
    isLoading,
    isError,
  } = useRelease();

  const { releaseVersion } = releaseInfo || {};

  return isLoading ? <LoadingSpinner /> : 
    (
      <small className="text-secondary">
        Version: {isError ? 'Unknown' : releaseVersion}
      </small>
    );
};

export default ReleaseBanner;

