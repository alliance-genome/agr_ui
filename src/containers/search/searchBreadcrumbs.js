import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import style from './style.css';
import { getQueryParamWithoutPage, makeFieldDisplayName } from '../../lib/searchHelpers';

import { selectIsPending, selectQueryParams, selectTotal } from '../../selectors/searchSelectors.js';

const IGNORED_PARAMS = ['page', 'mode'];
const SORT_PRIORITY = ['category', 'q'];

class SearchBreadcrumbsComponent extends Component {
  renderCrumbValues(key, values) {
    return values.map( (d, i) => {
      let newQp = getQueryParamWithoutPage(key,d,this.props.queryParams);
      let newPath = { pathname: '/search', query: newQp };
      let label = makeFieldDisplayName(d);
      let labelNode = (key === 'q') ? `"${label}"` : label;
      if (key === 'species') {
        labelNode = <i>{labelNode}</i>;
      }
      return (
        <Link className={`btn btn-primary ${style.sortLabel}`} key={`bc${key}.${i}`} to={newPath}><span>{labelNode} <i className='fa fa-times' /></span></Link>
      );
    });
  }

  renderCrumbs() {
    let qp = this.props.queryParams;
    let keys = Object.keys(qp).filter( d => IGNORED_PARAMS.indexOf(d) < 0);
    // make sure they are sorted
    keys = keys.sort( (a, b) => (SORT_PRIORITY.indexOf(a) < SORT_PRIORITY.indexOf(b)) );
    return keys.map( d => {
      let values = qp[d];
      if (typeof values !== 'object') values = [values];
      return this.renderCrumbValues(d, values);
    });
  }

  renderTotalNode() {
    if (this.props.isPending) return <span className={style.totalPending} />;
    return <span>{this.props.total.toLocaleString()}</span>;
  }

  render() {
    return (
      <div>
        <p>{this.renderTotalNode()} results for {this.renderCrumbs()}</p>
      </div>
    );
  }
}

SearchBreadcrumbsComponent.propTypes = {
  isPending: React.PropTypes.bool,
  queryParams: React.PropTypes.object,
  total: React.PropTypes.number
};

function mapStateToProps(state) {
  return {
    isPending: selectIsPending(state),
    queryParams: selectQueryParams(state),
    total: selectTotal(state)
  };
}

export { SearchBreadcrumbsComponent as SearchBreadcrumbsComponent };
export default connect(mapStateToProps)(SearchBreadcrumbsComponent);
