import {markAsExcluded, stringifyQuery} from '../../../lib/searchHelpers';
import {Link} from 'react-router-dom';
import React from 'react';
import * as PropTypes from 'prop-types';

/**
 * @return {null}
 */
function ExcludeLink(props) {
  let {queryObject, value, displayExclude, SEARCH_PATH, toggleStrikeThrough, displayName} = props;
  let newQueryObject = markAsExcluded(queryObject, value);
  let visibility = displayExclude ? 'visible' : 'hidden';
  if (displayName !== 'Category') {
    return (
      <span
        style={{visibility: visibility}}
        onMouseEnter={toggleStrikeThrough}
        onMouseLeave={toggleStrikeThrough}
      >
        <Link
          to={{pathname: SEARCH_PATH, search: stringifyQuery(newQueryObject)}}
        >
          <span title="Exclude term">&times;</span>
        </Link>
      </span>
    );
  } else {
    return null;
  }
}

ExcludeLink.propTypes = {
  queryObject: PropTypes.any,
  value: PropTypes.any,
  displayExclude: PropTypes.any,
  SEARCH_PATH: PropTypes.any,
  toggleStrikeThrough: PropTypes.any,
  displayName: PropTypes.any
};


export default ExcludeLink;
