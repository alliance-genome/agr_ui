import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import {
  getQueryParamWithoutPage,
  makeValueDisplayName,
  makeTitleCaseFieldDisplayName,
  stringifyQuery,
  strikeThroughLabelNode,
  isExcluded,
} from '../../lib/searchHelpers.jsx';

import CategoryLabel from './categoryLabel.jsx';
import {compareByFixedOrder} from '../../lib/utils';

const IGNORED_PARAMS = ['page', 'mode', 'q'];
const SORT_PRIORITY = ['category'];

const getLabelNode = (key, value) => {
  const valueDisplay = makeValueDisplayName(value);
  switch (key) {
  case 'species':
    return <i>{valueDisplay}</i>;
  case 'category':
    return <CategoryLabel category={value} />;
  default:
    return valueDisplay;
  }
};

const SearchBreadcrumbs = ({queryParams}) => {
  return Object.keys(queryParams)
    .filter( d => IGNORED_PARAMS.indexOf(d) < 0)
    .sort(compareByFixedOrder(SORT_PRIORITY))
    .map(key => {
      let values = queryParams[key];
      if (!Array.isArray(values)) {
        values = [values];
      }
      return values.map(value => {
        const newQp = getQueryParamWithoutPage(key, value, queryParams);
        const newLocation = { pathname: '/search', search: stringifyQuery(newQp) };
        const fieldLabel = makeTitleCaseFieldDisplayName(key) + ':';
        let labelNode = getLabelNode(key, value);
        labelNode = isExcluded(value) ? strikeThroughLabelNode(labelNode) : labelNode;

        return (
          <Link className='btn btn-primary mr-2 mb-2' key={`bc${key}.${value}`} to={newLocation}>
            {key !== 'category' && fieldLabel} {labelNode} <FontAwesomeIcon icon={faCircleXmark} />
          </Link>
        );
      });
    });
};

SearchBreadcrumbs.propTypes = {
  queryParams: PropTypes.object,
};

export default SearchBreadcrumbs;
