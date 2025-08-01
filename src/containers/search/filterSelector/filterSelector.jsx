import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';

import style from './style.module.scss';
import SingleFilterSelector from './singleFilterSelector.jsx';
import { getQueryParamWithValueChanged, stringifyQuery } from '../../../lib/searchHelpers.jsx';
import CategoryLabel from '../categoryLabel.jsx';
import CollapsibleFacet from './collapsibleFacet.jsx';

import { selectActiveCategory, selectAggregations } from '../../../selectors/searchSelectors';
import { selectPageLoading } from '../../../selectors/loadingSelector';

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
    return aggs.map((d) => {
      let isShowMore = false;
      //This is the "always show all of the values for __ facet" setting, right now
      //species facets are the only ones that get this special honor.  Also, 'all'
      //would be crazy if 'all' was more than 20, so we're going with 'more'
      if (d.name.toLowerCase().includes('species') || d.name === 'category') {
        isShowMore = true;
      }

      return (
        <div key={`filter${d.name}`}>
          <SingleFilterSelector {...d} isShowMore={isShowMore} queryParams={this.props.queryParams} />
        </div>
      );
    });
  }

  renderCatSelector() {
    let cat = this.props.activeCategory;
    if (cat === 'none') {
      return null;
    }
    let newQp = getQueryParamWithValueChanged('category', [], this.props.queryParams, true);
    let newHref = { pathname: '/search', search: stringifyQuery(newQp) };
    return (
      <div>
        <p>
          <CategoryLabel category={this.props.activeCategory} />
        </p>
        <p>
          <Link to={newHref}>
            <FontAwesomeIcon icon={faCircleChevronLeft} /> Show all Categories
          </Link>
        </p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="d-none d-md-block">
          {this.renderCatSelector()}
          {this.renderFilters()}
        </div>
        <div className="d-block d-md-none">
          <CollapsibleFacet label="Filter">
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
  queryParams: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    activeCategory: selectActiveCategory(state),
    aggregations: selectAggregations(state),
    isPending: selectPageLoading(state),
  };
}

export { FilterSelectorComponent };
export default connect(mapStateToProps)(FilterSelectorComponent);
