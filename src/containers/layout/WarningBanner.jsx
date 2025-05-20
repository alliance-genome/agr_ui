import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { WARNING_BANNER_SLUG, WORDPRESS_PAGE_BASE_URL } from '../../constants';
import style from './style.module.scss';
import ReplaceLinks from '../wordpress/ReplaceLinks.jsx';
import fetchWordpress from '../../lib/fetchWordpress';

const WarningBanner = () => {
  const { data } = useQuery({
    queryKey: ['warning-banner'],
    queryFn: () => fetchWordpress(WORDPRESS_PAGE_BASE_URL + WARNING_BANNER_SLUG)
      .catch((error) => {
        // we can safely ignore this error because the banner is not always up
        if (error.message === 'Page not found') {
          return null;
        }
        throw error;
      })
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
