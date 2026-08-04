import React from 'react';
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

const FilterSelectorComponent = ({ activeCategory, aggregations, isPending, queryParams }) => {
  const renderFilters = () => {
    if (aggregations.length === 0) {
      return <p>No filters available.</p>;
    }
    // if on cat selector and pending, render nothing
    if (activeCategory === 'none' && isPending) {
      return null;
    }
    return aggregations.map((d) => {
      let isShowMore = false;
      //This is the "always show all of the values for __ facet" setting, right now
      //species facets are the only ones that get this special honor.  Also, 'all'
      //would be crazy if 'all' was more than 20, so we're going with 'more'
      if (d.name.toLowerCase().includes('species') || d.name === 'category') {
        isShowMore = true;
      }

      return (
        <div key={`filter${d.name}`}>
          <SingleFilterSelector {...d} isShowMore={isShowMore} queryParams={queryParams} />
        </div>
      );
    });
  };

  const renderCatSelector = () => {
    if (activeCategory === 'none') {
      return null;
    }
    const newQp = getQueryParamWithValueChanged('category', [], queryParams, true);
    const newHref = { pathname: '/search', search: stringifyQuery(newQp) };
    return (
      <div>
        <p>
          <CategoryLabel category={activeCategory} />
        </p>
        <p>
          <Link to={newHref}>
            <FontAwesomeIcon icon={faCircleChevronLeft} /> Show all Categories
          </Link>
        </p>
      </div>
    );
  };

  return (
    <div>
      <div className="d-none d-md-block">
        {renderCatSelector()}
        {renderFilters()}
      </div>
      <div className="d-block d-md-none">
        <CollapsibleFacet label="Filter">
          <div className={style.mobileFacetList}>
            {renderCatSelector()}
            {renderFilters()}
          </div>
        </CollapsibleFacet>
      </div>
    </div>
  );
};

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
