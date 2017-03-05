/*eslint-disable react/no-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import { push } from 'react-router-redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import style from './style.css';
import CategoryLabel from '../../search/categoryLabel';
import fetchData from '../../../lib/fetchData';

import { CATEGORIES } from '../../../constants';
const AUTO_BASE_URL = '/api/search_autocomplete';
const DEFAULT_CAT = CATEGORIES[0];

class SearchBarComponent extends Component {
  constructor(props) {
    super(props);
    let initValue = this.props.queryParams.q || '';
    this.state = {
      autoOptions: [],
      catOption: DEFAULT_CAT,
      value: initValue
    };
  }

  handleClear() {
    this.setState({ autoOptions: [] });
  }

  handleOptionSelected(selected) {
    this.dispatchSearchFromQuery(selected);
  }

  handleSelect(eventKey) {
    let newCatOption = CATEGORIES.filter( d => d.name === eventKey )[0];
    this.setState({ catOption: newCatOption });
  }

  handleSubmit(e) {
    if (e) e.preventDefault();
    let query = this.state.value;
    let newCat = this.state.catOption.name;
    let newQp = { q: query };
    if (query === '') newQp = {};
    if (newCat !== 'all') newQp.category = newCat;
    this.props.dispatch(push({ pathname: '/search', query: newQp }));
  }

  handleTyping(e, { newValue }) {
    this.setState({ value: newValue });
  }

  handleFetchData({ value }) {
    let query = value;
    let cat = this.state.catOption.name;
    let catSegment = cat === DEFAULT_CAT.name ? '' : ('&category=' + cat);
    let url = AUTO_BASE_URL + '?q=' + query + catSegment;
    fetchData(url)
      .then( (data) => {
        let newOptions = data.results || [];
        this.setState({ autoOptions: newOptions });
      });
  }

  renderDropdown() {
    let _title = this.state.catOption.displayName;
    let nodes = CATEGORIES.map( d => {
      let labelNode = (d.name === DEFAULT_CAT.name) ? 'All' : <CategoryLabel category={d.name} />;
      return <MenuItem className={style.dropdownItem} eventKey={d.name} key={d.name}>{labelNode}</MenuItem>;
    });
    return (
      <DropdownButton className={style.dropdown} id='bg-nested-dropdown' onSelect={this.handleSelect.bind(this)} title={_title}>
        {nodes}
      </DropdownButton>
    );
  }

  renderSuggestion(d) {
    return (
      <div className={style.autoListItem}>
        <span>{d.name}</span>
        <span className={style.catContainer}>
          <CategoryLabel category={d.category} />
        </span>
      </div>
    );
  }

  render() {
    let _getSuggestionValue = ( d => d.name );
    let _inputProps = {
      placeholder: 'search a gene or GO term',
      value: this.state.value,
      onChange: this.handleTyping.bind(this)
    };
    let _theme = {
      container: style.autoContainer,
      containerOpen: style.autoContainerOpen,
      input: style.autoInput,
      suggestionsContainer: style.suggestionsContainer,
      suggestionsList: style.suggestionsList,
      suggestion: style.suggestion,
      suggestionFocused: style.suggestionFocused
    };
    return (
      <div className={style.container}>
        <form onSubmit={this.handleSubmit.bind(this)} ref='form'>
          {this.renderDropdown()}
            <Autosuggest
              getSuggestionValue={_getSuggestionValue}
              inputProps={_inputProps}
              onSuggestionsClearRequested={this.handleClear.bind(this)}
              onSuggestionsFetchRequested={this.handleFetchData.bind(this)}
              renderSuggestion={this.renderSuggestion}
              suggestions={this.state.autoOptions}
              theme={_theme}
            />
          <a className={`btn btn-primary ${style.searchBtn}`} href='#' onClick={this.handleSubmit.bind(this)}><i className='fa fa-search' /></a>
        </form>

      </div>
    );
  }
}

SearchBarComponent.propTypes = {
  dispatch: React.PropTypes.func,
  queryParams: React.PropTypes.object,
  searchUrl: React.PropTypes.string
};

function mapStateToProps(state) {
  let location = state.routing.locationBeforeTransitions;
  let _queryParams = location ? location.query : {};
  return {
    queryParams: _queryParams
  };
}
export { SearchBarComponent as SearchBarComponent };
export default connect(mapStateToProps)(SearchBarComponent);
