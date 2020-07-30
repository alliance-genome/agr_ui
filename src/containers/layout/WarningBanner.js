import React from 'react';
import { useQuery } from 'react-query';
import { WARNING_BANNER_SLUG, WORDPRESS_PAGE_BASE_URL } from '../../constants';
import style from './style.scss';
import ReplaceLinks from '../wordpress/ReplaceLinks';
import fetchWordpress from '../../lib/fetchWordpress';

const WarningBanner = () => {
  const { data } = useQuery(
    'warning-banner',
    () => fetchWordpress(WORDPRESS_PAGE_BASE_URL + WARNING_BANNER_SLUG),
    {
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
    });

  if (!data) {
    return null;
  }

  return (
    <div className={style.warningBar}>
      <ReplaceLinks html={data.content.rendered} />
    </div>
  );
};

export default WarningBanner;
