import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import style from './style.scss';
import SingleFilterSelector from './singleFilterSelector';
import { getQueryParamWithValueChanged } from '../../../lib/searchHelpers';
import CategoryLabel from '../categoryLabel';
import { stringify } from 'query-string';
import CollapsibleFacet from './collapsibleFacet';

import {
  selectActiveCategory,
  selectAggregations,
} from '../../../selectors/searchSelectors';
import {selectPageLoading} from '../../../selectors/loadingSelector';

class FilterSelectorComponent extends Component {
  renderFilters() {
    let aggs = this.props.aggregations;
    if (aggs.length === 0) {
      return <p>No filters available.</p>;
    }
    // if on cat selector and pending, render nothing
    if (this.props.activeCategory === 'none' && this.props.isPending) {
      return null;
    }
    return aggs.map( d => {
      let isShowMore = false;
      //This is the "always show all of the values for __ facet" setting, right now
      //species facets are the only ones that get this special honor.  Also, 'all'
      //would be crazy if 'all' was more than 20, so we're going with 'more'
      if (d.name.toLowerCase().includes('species')) {
        isShowMore = true;
      }
      return <div key={`filter${d.name}`}><SingleFilterSelector {...d} isShowMore={isShowMore} queryParams={this.props.queryParams} /></div>;
    });
  }

  renderCatSelector() {
    let cat = this.props.activeCategory;
    if (cat === 'none') {
      return null;
    }
    let newQp = getQueryParamWithValueChanged('category', [], this.props.queryParams, true);
    let newHref = { pathname: '/search', search: stringify(newQp) };
    return (
      <div>
        <p><CategoryLabel category={this.props.activeCategory} /></p>
        <p>
          <Link to={newHref}><i className='fa fa-chevron-left' /> Show all Categories</Link>
        </p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className='d-none d-md-block'>
          {this.renderCatSelector()}
          {this.renderFilters()}
        </div>
        <div className='d-block d-md-none'>
          <CollapsibleFacet label='Filter'>
            <div className={style.mobileFacetList}>
              {this.renderCatSelector()}
              {this.renderFilters()}
            </div>
          </CollapsibleFacet>
        </div>
      </div>
    );
  }
}

FilterSelectorComponent.propTypes = {
  activeCategory: PropTypes.string,
  aggregations: PropTypes.array,
  isPending: PropTypes.bool,
  queryParams: PropTypes.object
};

function mapStateToProps(state) {
  return {
    activeCategory:  selectActiveCategory(state),
    aggregations: selectAggregations(state),
    isPending: selectPageLoading(state),
  };
}

export { FilterSelectorComponent as FilterSelectorComponent };
export default connect(mapStateToProps)(FilterSelectorComponent);
