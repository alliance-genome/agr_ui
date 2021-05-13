import React from 'react';
import { useQuery } from 'react-query';
import fetchData from '../../lib/fetchData';
import LoadingSpinner from '../../components/loadingSpinner';

const ReleaseBanner = () => {
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

  const { releaseVersion, releaseDate } = data || {};

  return isLoading ? <LoadingSpinner /> : 
    (
      <small className="text-secondary">
        Version: {releaseVersion}.{' '}
        <span className="d-none d-md-inline-block mx-1">Released on {releaseDate && new Date(releaseDate).toLocaleDateString('en-US', {dateStyle: 'medium'})}</span>    
      </small>      
    );
};

export default ReleaseBanner;

