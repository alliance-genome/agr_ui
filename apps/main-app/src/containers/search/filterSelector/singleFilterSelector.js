import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import style from './style.scss';
import {
  getQueryParamWithoutPage, removeBlankValue,
  stringifyQuery
} from '../../../lib/searchHelpers';
import SingleFilterValue from './singleFilterValue';

const DELIMITER = '@@';
const SMALL_NUM_VISIBLE = 5;
const MED_NUM_VISIBLE = 20;
const MAX_NUM_VISIBLE = 1000;
const SEARCH_PATH = '/search';

class SingleFilterSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numVisible: SMALL_NUM_VISIBLE,
      isSearchMode: false
    };

    if (props.isShowMore) {
      this.state = {
        numVisible: MED_NUM_VISIBLE
      };
    }
  }

  handleSelectChange(newValues) {
    let simpleValues = newValues.map( d => d.name );
    let newQp = getQueryParamWithoutPage(this.props.name, simpleValues, this.props.queryParams);
    let newPath = { pathname: SEARCH_PATH, search: stringifyQuery(newQp) };
    this.props.history.push(newPath);
  }

  renderFilterValues() {
    let values = removeBlankValue(this.props.values)
      .slice(0, this.state.numVisible);

    return values.map( value =>
      (<SingleFilterValue
        key={`fv.${this.props.name}.${value.name}`}
        value={value}
        name={this.props.name}
        queryParams={this.props.queryParams}
        SEARCH_PATH={SEARCH_PATH}
        displayName={this.props.displayName}
      />)
    );
  }

  handleControlClick(e) {
    e.preventDefault();
    this.setState({ numVisible: this.getNextNumVisible() });
  }

  handleToggleMode(e) {
    e.preventDefault();
    this.setState({ isSearchMode: !this.state.isSearchMode });
  }

  getNextNumVisible() {
    let currentNum = this.state.numVisible;
    let newNum;
    if (currentNum === SMALL_NUM_VISIBLE) {
      newNum = MED_NUM_VISIBLE;
    } else if (currentNum === MED_NUM_VISIBLE) {
      newNum = MAX_NUM_VISIBLE;
    } else {
      newNum = SMALL_NUM_VISIBLE;
    }
    return newNum;
  }

  renderSearchNode() {
    let currentValues = this.props.values.filter( d => d.isActive );
    return (
      <div className={style.selectContainer}>
        <Select
          delimiter={DELIMITER}
          getOptionLabel={option => option.displayName}
          getOptionValue={option => option.name}
          isMulti
          onChange={this.handleSelectChange.bind(this)}
          options={this.props.values}
          placeholder='Search or Select'
          value={currentValues}
        />
      </div>
    );
  }

  renderControlNode() {
    if (this.props.values.length <= SMALL_NUM_VISIBLE) {
      return null;
    }
    let moreLabel = (this.state.numVisible !== MAX_NUM_VISIBLE) ? 'Show More' : `Show ${SMALL_NUM_VISIBLE}`;
    let modeLabelNode = this.state.isSearchMode ? <span>List</span> : <span><FontAwesomeIcon icon={faMagnifyingGlass} /></span>;
    let moreLabelNode = this.state.isSearchMode ? <span /> : <a href='#' onClick={this.handleControlClick.bind(this)}>{moreLabel}</a>;
    return (
      <p className={style.singleFacetControl}>
        <a href='#' onClick={this.handleToggleMode.bind(this)} >{modeLabelNode}</a>
        {moreLabelNode}
      </p>
    );
  }

  renderListNode() {
    return (
      <ul className='nav nav-pills flex-column'>
        {this.renderFilterValues(this.props)}
      </ul>
    );
  }

  render() {
    // don't render an empty filter
    if (this.props.values.length === 0) {
      return null;
    }
    let selectableNode = this.state.isSearchMode ? this.renderSearchNode() : this.renderListNode();
    return (
      <div className={style.aggValContainer}>
        <p className={style.filterLabel}><b>{this.props.displayName}</b></p>
        {selectableNode}
        {this.renderControlNode()}
      </div>
    );
  }
}

SingleFilterSelector.propTypes = {
  dispatch: PropTypes.func,
  displayName: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isShowMore: PropTypes.bool,
  name: PropTypes.string,
  queryParams: PropTypes.object,
  values: PropTypes.array,
};

export default withRouter(connect()(SingleFilterSelector));
