/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import style from './style.module.scss';
import { getQueryParamWithoutPage, removeBlankValue, stringifyQuery } from '../../../lib/searchHelpers.jsx';
import SingleFilterValue from './singleFilterValue.jsx';
import { useNavigate } from 'react-router-dom';

const DELIMITER = '@@';
const SMALL_NUM_VISIBLE = 5;
const MED_NUM_VISIBLE = 20;
const MAX_NUM_VISIBLE = 1000;
const SEARCH_PATH = '/search';

const SingleFilterSelector = ({ displayName, isShowMore, name, navigate, queryParams, values }) => {
  const [numVisible, setNumVisible] = useState(isShowMore ? MED_NUM_VISIBLE : SMALL_NUM_VISIBLE);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const handleSelectChange = (newValues) => {
    const simpleValues = newValues.map((d) => d.name);
    const newQp = getQueryParamWithoutPage(name, simpleValues, queryParams);
    navigate({ pathname: SEARCH_PATH, search: stringifyQuery(newQp) });
  };

  const getNextNumVisible = () => {
    if (numVisible === SMALL_NUM_VISIBLE) return MED_NUM_VISIBLE;
    if (numVisible === MED_NUM_VISIBLE) return MAX_NUM_VISIBLE;
    return SMALL_NUM_VISIBLE;
  };

  const handleControlClick = (e) => {
    e.preventDefault();
    setNumVisible(getNextNumVisible());
  };

  const handleToggleMode = (e) => {
    e.preventDefault();
    setIsSearchMode((prev) => !prev);
  };

  // don't render an empty filter
  if (values?.length === 0) return null;

  const renderFilterValues = () =>
    removeBlankValue(values)
      ?.slice(0, numVisible)
      .map((value) => (
        <SingleFilterValue
          key={`fv.${name}.${value.name}`}
          value={value}
          name={name}
          queryParams={queryParams}
          SEARCH_PATH={SEARCH_PATH}
          displayName={displayName}
        />
      ));

  const renderSearchNode = () => {
    const currentValues = values.filter((d) => d.isActive);
    return (
      <div className={style.selectContainer}>
        <Select
          delimiter={DELIMITER}
          getOptionLabel={(option) => option.displayName}
          getOptionValue={(option) => option.name}
          isMulti
          onChange={handleSelectChange}
          options={values}
          placeholder="Search or Select"
          value={currentValues}
        />
      </div>
    );
  };

  const renderControlNode = () => {
    if (values?.length <= SMALL_NUM_VISIBLE) return null;
    const moreLabel = numVisible !== MAX_NUM_VISIBLE ? 'Show More' : `Show ${SMALL_NUM_VISIBLE}`;
    const modeLabelNode = isSearchMode ? (
      <span>List</span>
    ) : (
      <span>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </span>
    );
    const moreLabelNode = isSearchMode ? (
      <span />
    ) : (
      <a href="#" onClick={handleControlClick}>
        {moreLabel}
      </a>
    );
    return (
      <p className={style.singleFacetControl}>
        <a href="#" onClick={handleToggleMode}>
          {modeLabelNode}
        </a>
        {moreLabelNode}
      </p>
    );
  };

  const selectableNode = isSearchMode ? renderSearchNode() : <ul className="nav nav-pills flex-column">{renderFilterValues()}</ul>;

  return (
    <div className={style.aggValContainer}>
      <p className={style.filterLabel}>
        <b>{displayName}</b>
      </p>
      {selectableNode}
      {renderControlNode()}
    </div>
  );
};

SingleFilterSelector.propTypes = {
  displayName: PropTypes.string,
  navigate: PropTypes.func.isRequired,
  isShowMore: PropTypes.bool,
  name: PropTypes.string,
  queryParams: PropTypes.object,
  values: PropTypes.array,
};

const SingleFilterSelectorWithNavigate = (props) => {
  const navigate = useNavigate();
  return <SingleFilterSelector navigate={navigate} {...props} />;
};

SingleFilterSelectorWithNavigate.propTypes = {
  displayName: PropTypes.string,
  isShowMore: PropTypes.bool,
  name: PropTypes.string,
  queryParams: PropTypes.object,
  values: PropTypes.array,
};

export default connect()(SingleFilterSelectorWithNavigate);
