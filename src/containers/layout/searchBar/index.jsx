import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { parseQueryString, stringifyQuery } from '../../../lib/searchHelpers.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import style from './style.module.scss';
import CategoryLabel from '../../search/categoryLabel.jsx';
import fetchData from '../../../lib/fetchData';

import { CATEGORIES } from '../../../constants';

import { autocompleteGoToPageEvent, autocompleteSearchEvent } from '../../../lib/analytics.js';
import { getURLForEntry } from '../../../lib/searchHelpers.jsx';

const AUTO_BASE_URL = '/api/search_autocomplete';
const DEFAULT_CAT = CATEGORIES[0];

const SearchBarComponent = ({ autoFocus, placeholder = 'search: RPB7, kinase, asthma, liver' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState(parseQueryString(location.search).q || '');
  const [catOption, setCatOption] = useState(DEFAULT_CAT);
  const [autoOptions, setAutoOptions] = useState([]);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const queryOptions = parseQueryString(location.search);
    setValue(queryOptions.q || '');
    setCatOption(CATEGORIES.find((cat) => cat.name === queryOptions.category) ?? DEFAULT_CAT);
  }, [location.search]);

  // Abort any in-flight autocomplete fetch on unmount so the resolver doesn't
  // call setAutoOptions on an unmounted component (avoids React's "state update
  // on unmounted component" warning).
  useEffect(() => () => abortControllerRef.current?.abort(), []);

  const doQuery = (query) => {
    const newCat = catOption.name;
    let newQp = { q: query };
    if (query === '') {
      newQp = {};
    }
    if (newCat !== 'all') {
      newQp.category = newCat;
    }
    autocompleteSearchEvent(query);
    navigate({
      pathname: '/search',
      search: stringifyQuery(newQp),
    });
  };

  const handleClear = () => setAutoOptions([]);

  const handleSelect = (selected) => {
    setCatOption(CATEGORIES.find((cat) => cat.name === selected) ?? DEFAULT_CAT);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    doQuery(value);
  };

  const handleTyping = (e, { newValue }) => setValue(newValue);

  const handleFetchData = ({ value: query }) => {
    const cat = catOption.name;
    const catSegment = cat === DEFAULT_CAT.name ? '' : '&category=' + cat;
    const url = AUTO_BASE_URL + '?q=' + query + catSegment;
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    fetchData(url, { signal: abortController.signal })
      .then((data) => {
        setAutoOptions(data.results || []);
        abortControllerRef.current = null;
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        throw error;
      });
  };

  const handleSelected = (event, item) => {
    // gene and disease will go to the pages and skip search results,
    // go terms and alleles will just go to regular search pages as the query
    if (item.method === 'click') {
      const id = item.suggestion.primaryKey ? item.suggestion.primaryKey : item.suggestion.curie;
      const url = getURLForEntry(item.suggestion.category, id);
      if (url) {
        autocompleteGoToPageEvent(id);
        navigate(url);
      } else {
        const query = item.suggestion.nameKey ? item.suggestion.nameKey : item.suggestion.name;
        setValue(query);
        doQuery(query);
      }
    }
  };

  const renderSuggestion = (d) => (
    <div className={style.autoListItem}>
      <span>{d.nameKey ? d.nameKey : d.name}</span>
      <span className={style.catContainer}>
        <CategoryLabel category={d.category} />
      </span>
    </div>
  );

  const renderDropdown = () => {
    const _title = catOption.displayName;
    const nodes = CATEGORIES.map((d) => {
      const labelNode = d.name === DEFAULT_CAT.name ? 'All' : <CategoryLabel category={d.name} />;
      return (
        <DropdownItem className={style.dropdownItem} key={d.name} onClick={() => handleSelect(d.name)}>
          {labelNode}
        </DropdownItem>
      );
    });
    return (
      <UncontrolledDropdown className="input-group-prepend">
        <DropdownToggle caret className={`${style.searchButton} border-right-0`} color="secondary" outline>
          {_title}
        </DropdownToggle>
        <DropdownMenu>{nodes}</DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  const _inputProps = {
    autoFocus,
    placeholder,
    value,
    onChange: handleTyping,
  };
  const _theme = {
    container: style.autoContainer,
    containerOpen: style.autoContainerOpen,
    input: style.autoInput,
    suggestionsContainer: style.suggestionsContainer,
    suggestionsList: style.suggestionsList,
    suggestion: style.suggestion,
    suggestionHighlighted: style.suggestionHighlighted,
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={`input-group flex-nowrap my-1 my-md-0 ${style.searchBarOuter}`}>
        {renderDropdown()}
        <Autosuggest
          getSuggestionValue={(d) => d.nameKey}
          inputProps={_inputProps}
          onSuggestionSelected={handleSelected}
          onSuggestionsClearRequested={handleClear}
          onSuggestionsFetchRequested={handleFetchData}
          renderSuggestion={renderSuggestion}
          suggestions={autoOptions}
          theme={_theme}
        />
        <div className="input-group-append">
          <button className={`btn text-primary border-left-0 ${style.searchButton}`} type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
    </form>
  );
};

SearchBarComponent.propTypes = {
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default SearchBarComponent;
