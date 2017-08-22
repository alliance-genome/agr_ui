/* eslint-disable react/no-set-state */
/* set-state has to be used
  because the state of the component is not shared
  with the rest of the application
*/
import React, { Component, PropTypes } from 'react';
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
  filterConfidence: true
};

class OrthologyFilteredTable extends Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_FILTERS;
  }

  isHighConfidence(dat) {
    return (
      dat.predictionMethodsMatched === 'ZFIN' ||
      dat.predictionMethodsMatched === 'HGNC' ||
      dat.predictionMethodsMatched.length > 2 ||
      (dat.predictionMethodsMatched.length === 2 && dat.isBestScore && dat.isBestRevScore)
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
      (this.state.filterConfidence ? this.isHighConfidence(dat) : true)
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
      filterConfidence: event.target.checked
    });
  }

  resetFilters() {
    this.setState(DEFAULT_FILTERS);
  }

  render() {
    const filteredData = this.props.data.filter((dat) => this.filterCallback(dat));
    const all_methods = this.props.data[0].predictionMethodsMatched.concat(
      this.props.data[0].predictionMethodsNotCalled,
      this.props.data[0].predictionMethodsNotMatched
    ).sort(caseInsensitiveCompare);

    const labelStyle = {
      margin: '0 1em 1em 0',
    };
    const inputStyle = {
      margin: '0 0.5em'
    };

    return (
      <div>
        <div className="card">
          <div className="card-block">
            <label style={labelStyle}>
              Best Score Only:
              <input
                checked={this.state.filterBest}
                onChange={(event) => this.updateBestScoreFilter(event)}
                style={inputStyle}
                type="checkbox"
              />
            </label>
            <label style={labelStyle}>
              Best Reverse Score Only:
              <input
                checked={this.state.filterReverseBest}
                onChange={(event) => this.updateBestReverseScoreFilter(event)}
                style={inputStyle}
                type="checkbox"
              />
            </label>
            <label style={labelStyle}>
              Exclude low confidence matches:
              <input
                checked={this.state.filterConfidence}
                onChange={(event) => this.updateFilterConfidence(event)}
                style={inputStyle}
                type="checkbox"
              />
            </label>
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
            <br />
            <button
              className="btn btn-primary"
              onClick={() => this.resetFilters()}
            >Reset filters</button>
          </div>
        </div>
        {
          filteredData.length > 0 ?
          <OrthologyTable data={filteredData} /> :
          <i className="text-muted">No ortholog matching your filter. Please try a less stringent filter.</i>
        }
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
      gene2Species: PropTypes.number,
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
