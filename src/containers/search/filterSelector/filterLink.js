import style from './style.module.scss';
import {Link} from 'react-router-dom';
import {stringifyQuery} from '../../../lib/searchHelpers';
import React from 'react';
import * as PropTypes from 'prop-types';

const FilterLink = props => {
  let {newQueryObj, nameNode, strikeThroughFilter, SEARCH_PATH, value, classSuffix} = props;
  const textDecoration = strikeThroughFilter ? style.strikeThrough : null;
  return (
    <Link
      className={[`nav-link${classSuffix}`, style.link].join(' ')}
      to={{pathname: SEARCH_PATH, search: stringifyQuery(newQueryObj)}}
    >
      <span className={[style.aggLink, textDecoration].join(' ')}>
        <span
          className={style.aggLinkLabel}
        >{nameNode}</span><span>{value.total.toLocaleString()}</span>
      </span>
    </Link>
  );
};
export default FilterLink;

FilterLink.propTypes = {
  newQueryObj: PropTypes.object,
  nameNode: PropTypes.any,
  strikeThroughFilter: PropTypes.bool,
  SEARCH_PATH: PropTypes.string,
  value: PropTypes.object,
  classSuffix: PropTypes.string
};
