import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import style from './style.scss';
import { getQueryParamWithoutPage, makeValueDisplayName, makeTitleCaseFieldDisplayName } from '../../lib/searchHelpers';
import { selectIsPending, selectTotal } from '../../selectors/searchSelectors.js';
import { stringify } from 'query-string';

import CategoryLabel from './categoryLabel.js';

const IGNORED_PARAMS = ['page', 'mode'];
const SORT_PRIORITY = ['category', 'q'];

class SearchBreadcrumbsComponent extends Component {
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

  renderTotalNode() {
    if (this.props.isPending) return <span className={style.totalPending} />;
    return <span>{this.props.total.toLocaleString()}</span>;
  }

  render() {
    return (
      <div>
        <p>{this.renderTotalNode()} results {this.renderCrumbs()}</p>
      </div>
    );
  }
}

SearchBreadcrumbsComponent.propTypes = {
  isPending: PropTypes.bool,
  queryParams: PropTypes.object,
  total: PropTypes.number
};

function mapStateToProps(state) {
  return {
    isPending: selectIsPending(state),
    total: selectTotal(state)
  };
}

export { SearchBreadcrumbsComponent as SearchBreadcrumbsComponent };
export default connect(mapStateToProps)(SearchBreadcrumbsComponent);
