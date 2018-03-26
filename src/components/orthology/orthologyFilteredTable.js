/* eslint-disable react/no-set-state */
/* set-state has to be used
  because the state of the component is not shared
  with the rest of the application
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-bootstrap';
import OrthologyTable from './orthologyTable';

const caseInsensitiveCompare = (stringA, stringB) => {
  const stringALowerCase = stringA.toLowerCase();
  const stringBLowerCase = stringB.toLowerCase();
  if (stringALowerCase < stringBLowerCase) {
    return -1;
  } else if (stringALowerCase > stringBLowerCase) {
    return 1;
  } else {
    return 0;
  }
};

const DEFAULT_FILTERS = {
  filterScoreGreaterThan: 0,
  filterMethod: null,
  filterBest: false,
  filterReverseBest: false,
  filterSpecies: null,
  stringencyLevel: 'high',
};

class OrthologyFilteredTable extends Component {
  constructor(props) {
    super(props);
    const defaultState = Object.assign({showFilterPanel: false,}, DEFAULT_FILTERS);
    this.state = defaultState;
  }

  isHighStringency(dat) {
    return (
      dat.predictionMethodsMatched.indexOf('ZFIN') > -1 ||
      dat.predictionMethodsMatched.indexOf('HGNC') > -1 ||
      (dat.predictionMethodsMatched.length > 2 && (dat.isBestScore || dat.isBestRevScore)) ||
      (dat.predictionMethodsMatched.length === 2 && dat.isBestScore && dat.isBestRevScore)
    );
  }

  isModerateStringency(dat) {
    return (
      dat.predictionMethodsMatched.indexOf('ZFIN') > -1 ||
      dat.predictionMethodsMatched.indexOf('HGNC') > -1 ||
      dat.predictionMethodsMatched.length > 2 ||
      (dat.predictionMethodsMatched.length === 2 && dat.isBestScore && dat.isBestRevScore)
    );
  }

  filterByStringency(dat) {
    switch (this.state.stringencyLevel) {
    case 'high':
      return this.isHighStringency(dat);
    case 'moderate':
      return this.isModerateStringency(dat);
    default:
      return true;
    }
  }

  renderStringencyOption(stringencyLevel, label) {
    const labelStyle = {
      margin: '0em 1em 0em 0',
      lineHeight: '2em',
    };
    const inputStyle = {
      margin: '0 0.5em'
    };
    return (
      <label style={labelStyle}>
        <input
          checked={stringencyLevel === this.state.stringencyLevel}
          onChange={(event) => this.setState({
            stringencyLevel: event.target.value
          })}
          style={inputStyle}
          type="radio"
          value={stringencyLevel}
        />
        {label}
      </label>
    );
  }

  filterCallback(dat) {
    const meetMethodFilter = this.state.filterMethod ?
      dat.predictionMethodsMatched.indexOf(this.state.filterMethod) > -1 :
      true;
    return (
      meetMethodFilter &&
      dat.predictionMethodsMatched.length > this.state.filterScoreGreaterThan &&
      (this.state.filterBest ? dat.isBestScore : true) &&
      (this.state.filterReverseBest ? dat.isBestRevScore : true) &&
      (this.state.filterSpecies ? dat.gene2SpeciesName === this.state.filterSpecies : true) &&
      this.filterByStringency(dat)
    );
  }

  updateFilterMethod(event) {
    this.setState({
      filterMethod: event.target.value === 'all' ? null : event.target.value
    });
  }

  updateBestScoreFilter(event) {
    this.setState({
      filterBest: event.target.checked
    });
  }

  updateBestReverseScoreFilter(event) {
    this.setState({
      filterReverseBest: event.target.checked
    });
  }

  updateFilterScoreGreaterThan(event) {
    this.setState({
      filterScoreGreaterThan: event.target.value
    });
  }

  updateFilterSpecies(event) {
    this.setState({
      filterSpecies: event.target.value === 'all' ? null : event.target.value
    });
  }

  updateFilterConfidence(event) {
    this.setState({
      filterConfidence: !event.target.checked
    });
  }

  resetFilters() {
    this.setState(DEFAULT_FILTERS);
  }

  toggleFilterPanel() {
    this.setState((prevState) => ({
      showFilterPanel: !prevState.showFilterPanel,
    }));
  }

  render() {
    const filteredData = this.props.data.filter((dat) => this.filterCallback(dat));
    const all_methods = this.props.data[0].predictionMethodsMatched.concat(
      this.props.data[0].predictionMethodsNotCalled,
      this.props.data[0].predictionMethodsNotMatched
    ).sort(caseInsensitiveCompare);

    const labelStyle = {
      margin: '0em 1em 0em 0',
      lineHeight: '2em',
    };
    const inputStyle = {
      margin: '0 0.5em'
    };

    const buttonStyle = {
      marginTop: '0.5em',
      marginRight: '0.5em',
      minWidth: '8em',
    };

    const docTextStyle = {
      fontStyle: 'italic',
      opacity: 0.7,
      fontSize: '0.9em',
    };

    return (
      <div>
        <div className="card card-block" style={{margin: '0.5em 0'}}>
          <div>
            <span>Stringency:</span>
            {this.renderStringencyOption('high', 'Best+best reverse filter (default)')}
            {this.renderStringencyOption('moderate', 'Moderate filter')}
            {this.renderStringencyOption('low', 'No filter / Show all')}
          </div>
          <Collapse in={this.state.showFilterPanel}>
            <div>
              <span style={docTextStyle}>Additional filters to further constrain the results:</span>
              <div style={{display: 'flex', flexDirection: 'column', marginLeft: '-0.5em'}}>
                <label style={labelStyle}>
                  <input
                    checked={this.state.filterBest}
                    onChange={(event) => this.updateBestScoreFilter(event)}
                    style={inputStyle}
                    type="checkbox"
                  />
                  Best Score Only
                </label>
                <label style={labelStyle}>
                  <input
                    checked={this.state.filterReverseBest}
                    onChange={(event) => this.updateBestReverseScoreFilter(event)}
                    style={inputStyle}
                    type="checkbox"
                  />
                  Best Reverse Score Only
                </label>
              </div>
              <label style={labelStyle}>
                Count:
                <select
                  onChange={(event) => this.updateFilterScoreGreaterThan(event)}
                  style={inputStyle}
                  value={this.state.filterScoreGreaterThan}
                >
                  <option value={0}>> 0</option>
                  {
                    all_methods.map((method, index) => {
                      const scoreGreaterThanValue = index + 1;
                      return <option key={scoreGreaterThanValue} value={scoreGreaterThanValue}>> {scoreGreaterThanValue}</option>;
                    })
                  }
                </select>
              </label>
              <label style={labelStyle}>
                Species:
                <select
                  onChange={(event) => this.updateFilterSpecies(event)}
                  style={inputStyle}
                  value={this.state.filterSpecies || 'all'}
                >
                  <option value="all">All</option>
                  {
                    this.props.data.reduce((all_species, dat) => {
                      if (all_species.indexOf(dat.gene2SpeciesName) === -1) {
                        return all_species.concat([dat.gene2SpeciesName]);
                      } else {
                        return all_species;
                      }
                    }, []).map((species) => (
                      <option key={species} value={species}>{species}</option>
                    ))
                  }
                </select>
              </label>
              <label>
                Methods:
                <select
                  onChange={(event) => this.updateFilterMethod(event)}
                  style={inputStyle}
                  value={this.state.filterMethod || 'all'}
                >
                  <option value="all">All</option>
                  {
                    all_methods.map((method) => (
                      <option key={method} value={method}>{method}</option>
                    ))
                  }
                </select>
              </label>
            </div>
          </Collapse>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => this.toggleFilterPanel()}
              style={buttonStyle}
              type="button"
            >{`${this.state.showFilterPanel ? 'Hide' : 'Show'} additional filters`}</button>
            <button
              className="btn btn-secondary"
              onClick={() => this.resetFilters()}
              style={buttonStyle}
              type="button"
            >Reset filters</button>
          </div>
        </div>

        <div style={{marginTop: -40}}>
          {
            filteredData.length > 0 ?
            <OrthologyTable data={filteredData} /> :
            <i className="text-muted">No ortholog matching your filter. Please try a less stringent filter.</i>
          }
        </div>
      </div>
    );
  }
}

OrthologyFilteredTable.propTypes = {
  // filterScoreGreaterThan: PropTypes.number,
  // filterMethods: PropTypes.string,
  // filterBest: PropTypes.bool,
  // filterReverseBest: PropTypes.bool
  data: PropTypes.arrayOf(
    PropTypes.shape({
      gene2AgrPrimaryId: PropTypes.string,
      gene2Symbol: PropTypes.string,
      gene2SpeciesName: PropTypes.string,
      predictionMethodsMatched: PropTypes.arrayOf(PropTypes.string),
      predictionMethodsNotCalled: PropTypes.arrayOf(PropTypes.string),
      predictionMethodsNotMatched: PropTypes.arrayOf(PropTypes.string),
      isBestScore: PropTypes.bool,
      isBestRevScore: PropTypes.bool,
    })
  )
};

export default OrthologyFilteredTable;
