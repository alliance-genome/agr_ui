import React from 'react';
import LoadingSpinner from '../../components/loadingSpinner';
import { useRelease } from '../../hooks/ReleaseContextProvider.jsx';

const ReleaseBanner = () => {

  const {
    data: releaseInfo,
    isLoading,
    isError,
  } = useRelease();

  const { releaseVersion, releaseDate } = releaseInfo || {};

  return isLoading ? <LoadingSpinner /> :
    (
      <small className="text-secondary">
        Version: {isError ? 'Unknown' : releaseVersion}<br />
        Date: { isError ? 'Unknown' : new Date(releaseDate).toDateString()}
      </small>
    );
};

export default ReleaseBanner;

