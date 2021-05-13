import React from 'react';
import LoadingSpinner from '../../components/loadingSpinner';
import { useRelease } from '../../hooks/ReleaseContextProvider';

const ReleaseBanner = () => {

  const {
    data,
    isLoading,
    isError,
  } = useRelease();

  const { releaseVersion, releaseDate } = data || {};

  return isLoading ? <LoadingSpinner /> : 
    (
      <small className="text-secondary">
        Version: {isError ? 'Unknown' : releaseVersion}.
        <span className="d-none d-md-inline-block mx-1">
          Released on {releaseDate ? new Date(releaseDate).toLocaleDateString('en-US', {dateStyle: 'medium'}) : 'Unknown'}
        </span>
      </small>
    );
};

export default ReleaseBanner;

