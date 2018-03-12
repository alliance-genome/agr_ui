/*eslint-disable react/no-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  handleSelected(event, item) {
    if (item.method == 'click') {
      if (item.suggestion.category == 'gene') {
        let href = '/gene/' + item.suggestion.primaryId;
        this.props.dispatch(push({ pathname: href}));
      } else if (item.suggestion.category == 'disease') {
        let href = '/disease/' + item.suggestion.primaryId;
        this.props.dispatch(push({ pathname: href}));
      } else if (item.suggestion.category == 'go') {
        this.setState({ value: '' });
        let field = 'gene_' + item.suggestion.go_type;
        let newQp = { category: 'gene' };
        newQp[field] = item.suggestion.name_key;
        this.props.dispatch(push({ pathname: '/search', query: newQp }));
      } else {
        this.setState({ value: item.suggestion.name_key });
        let query = item.suggestion.name_key;
        let newCat = this.state.catOption.name;
        let newQp = { q: query };
        if (query === '') newQp = {};
        if (newCat !== 'all') newQp.category = newCat;
        this.props.dispatch(push({ pathname: '/search', query: newQp }));
      }
    }
  }

  renderDropdown() {
    let _title = this.state.catOption.displayName;
    let nodes = CATEGORIES.map( d => {
      let labelNode = (d.name === DEFAULT_CAT.name) ? 'All' : <CategoryLabel category={d.name} />;
      return <MenuItem className={style.dropdownItem} eventKey={d.name} key={d.name}>{labelNode}</MenuItem>;
    });
    return (<div className={`input-group-btn ${style.searchBtns}`}>
        <DropdownButton className={`btn-outline-light ${style.dropdown} ${style.dropdownBtn}`} id="bg-nested-dropdown" onSelect={this.handleSelect.bind(this)} title={_title}>
          {nodes}
        </DropdownButton>
      </div>);
  }

  renderSuggestion(d) {
    return (
      <div className={style.autoListItem}>
        <span>{d.name_key}</span>
        <span className={style.catContainer}>
          <CategoryLabel category={d.category} />
        </span>
      </div>
    );
  }

  render() {
    let _getSuggestionValue = ( d => d.name_key );
    let _inputProps = {
      placeholder: 'search a gene, disease or GO term',
      value: this.state.value,
      onChange: this.handleTyping.bind(this)
    };
    let _theme = {
      containerOpen: style.autoContainerOpen,
      input: style.autoInput,
      suggestionsContainer: style.suggestionsContainer,
      suggestionsList: style.suggestionsList,
      suggestion: style.suggestion,
      suggestionFocused: style.suggestionFocused
    };
    return (<form className={style.formSearch} onSubmit={this.handleSubmit.bind(this)} ref="form" role="search">
        <div className="input-group">
          {this.renderDropdown()}
          <Autosuggest className="form-control" getSuggestionValue={_getSuggestionValue} inputProps={_inputProps} onSuggestionSelected={this.handleSelected.bind(this)} onSuggestionsClearRequested={this.handleClear.bind(this)} onSuggestionsFetchRequested={this.handleFetchData.bind(this)} renderSuggestion={this.renderSuggestion} suggestions={this.state.autoOptions} theme={_theme} />
          <div className="input-group-btn">
            <button className={`btn btn-primary ${style.searchBtns}`} onClick={this.handleSubmit.bind(this)} type="submit">
              <i className="fa fa-search" />
            </button>
          </div>
        </div>
      </form>);
  }
}

SearchBarComponent.propTypes = {
  dispatch: PropTypes.func,
  queryParams: PropTypes.object,
  searchUrl: PropTypes.string
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
