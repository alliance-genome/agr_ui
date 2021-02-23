import React from 'react';
import {compareAlphabeticalCaseInsensitive} from '../../lib/utils';

export const renderPaginationShowsTotal = (start, end, total) => {
  return <span>Showing { start } - { end } of { total.toLocaleString() } rows</span>;
};

export const getDistinctFieldValue = (response, field) => {
  response = response || {};
  const {distinctFieldValues = {}} = response.supplementalData || {};
  return (distinctFieldValues[field] || [])
    .sort(compareAlphabeticalCaseInsensitive)
    .filter((value) => (
      value && value.trim()
    ));
};

