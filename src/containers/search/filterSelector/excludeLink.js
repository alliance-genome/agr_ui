import {
  toCamelCase,
  markAsExcluded,
  stringifyQuery
} from '../../../lib/searchHelpers';
import {Link} from 'react-router-dom';
import React from 'react';
import * as PropTypes from 'prop-types';
import style from './style.scss';
import UncontrolledTooltip from 'reactstrap/lib/UncontrolledTooltip';

/**
 * @return {null}
 */
function ExcludeLink(props) {
  let {queryObject, value, displayExclude, SEARCH_PATH, setStrikeThroughFilter, displayName} = props;
  let newQueryObject = markAsExcluded(queryObject, value);
  let visibility = displayExclude ? 'visible' : 'hidden';
  let id = displayName + value.displayName;
  id = toCamelCase(id.replace(/[^a-zA-Z0-9]/gm, ''));

  if (displayName !== 'Category') {
    return (
      <div
        style={{visibility: visibility}}
        onMouseEnter={() => setStrikeThroughFilter(true)}
        onMouseLeave={() => setStrikeThroughFilter(false)}
      >
        <Link
          to={{pathname: SEARCH_PATH, search: stringifyQuery(newQueryObject)}}
        >
          <span id={id}>&times;</span>
        </Link>

        <UncontrolledTooltip className={style.tooltip} target={id}>
          Exclude Term
        </UncontrolledTooltip>
      </div>
    );
  } else {
    return null;
  }
}

ExcludeLink.propTypes = {
  queryObject: PropTypes.object,
  value: PropTypes.object,
  displayExclude: PropTypes.bool,
  SEARCH_PATH: PropTypes.string,
  setStrikeThroughFilter: PropTypes.func,
  displayName: PropTypes.string
};


export default ExcludeLink;
