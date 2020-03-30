import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import style from './style.scss';
import { getQueryParamWithoutPage, makeValueDisplayName, makeTitleCaseFieldDisplayName } from '../../lib/searchHelpers';
import { selectTotal } from '../../selectors/searchSelectors.js';
import { stringify } from 'query-string';

import CategoryLabel from './categoryLabel.js';
import {selectPageLoading} from '../../selectors/loadingSelector';

const IGNORED_PARAMS = ['page', 'mode'];
const SORT_PRIORITY = ['category', 'q'];

class SearchBreadcrumbs extends Component {
  renderCrumbValues(key, values) {
    return values.map( (d, i) => {
      let newQp = getQueryParamWithoutPage(key,d,this.props.queryParams);
      let newPath = { pathname: '/search', search: stringify(newQp) };
      let label = makeValueDisplayName(d);
      let labelNode = (key === 'q') ? `"${label}"` : label;
      let fieldLabel = makeTitleCaseFieldDisplayName(key) + ':';
      if (key === 'species') {
        labelNode = <i>{labelNode}</i>;
      }
      else if (key === 'category') {
        fieldLabel = '';
        labelNode = <CategoryLabel category={d} />;
      }
      return (
        <Link className={`btn btn-primary ${style.sortLabel}`} key={`bc${key}.${i}`} to={newPath}><span>{fieldLabel} {labelNode} <i className='fa fa-times' /></span></Link>
      );
    });
  }

  renderCrumbs() {
    let qp = this.props.queryParams;
    let keys = Object.keys(qp).filter( d => IGNORED_PARAMS.indexOf(d) < 0);
    // make sure they are sorted
    keys = keys.sort( (a, b) => (SORT_PRIORITY.indexOf(a) < SORT_PRIORITY.indexOf(b)) );
    let crumbs = keys.map( d => {
      let values = qp[d];
      if (typeof values !== 'object') values = [values];
      return this.renderCrumbValues(d, values);
    });
    crumbs = (crumbs == '') ? crumbs : <span> for {crumbs} </span>;
    return crumbs;
  }

  render() {
    return this.renderCrumbs();
  }
}

SearchBreadcrumbs.propTypes = {
  isPending: PropTypes.bool,
  queryParams: PropTypes.object,
  total: PropTypes.number
};

function mapStateToProps(state) {
  return {
    isPending: selectPageLoading(state),
    total: selectTotal(state)
  };
}

export default connect(mapStateToProps)(SearchBreadcrumbs);
