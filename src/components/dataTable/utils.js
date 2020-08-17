import React from 'react';
import {compareAlphabeticalCaseInsensitive} from '../../lib/utils';

export const renderPaginationShowsTotal = (start, end, total) => {
  return <span>Showing { start } - { end } of { total.toLocaleString() } rows</span>;
};

export const getDistinctFieldValue = ({supplementalData = {}} = {}, field) => {
  const {distinctFieldValues = {}} = supplementalData;
  return (distinctFieldValues[field] || []).sort(compareAlphabeticalCaseInsensitive);
};

