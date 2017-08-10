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

class OrthologyFilteredTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterScoreGreaterThan: 0,
      filterMethod: null,
      filterBest: false,
      filterReverseBest: false,
      filterSpecies: null
    };
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
      (this.state.filterSpecies ? dat.gene2SpeciesName === this.state.filterSpecies : true)
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
    console.log(event.target.value);
    this.setState({
      filterSpecies: event.target.value === 'all' ? null : event.target.value
    })
  }

  render() {
    const filteredData = this.props.data.filter((dat) => this.filterCallback(dat));
    const all_methods = this.props.data[0].predictionMethodsMatched.concat(
      this.props.data[0].predictionMethodsNotCalled,
      this.props.data[0].predictionMethodsNotMatched
    ).sort(caseInsensitiveCompare);
    return (
      <div>
        <div>
          <label>
            Best Score Only:
            <input
              checked={this.state.filterBest}
              onChange={(event) => this.updateBestScoreFilter(event)}
              type="checkbox"
            />
          </label>
          <label>
            Best Reverse Score Only:
            <input
              checked={this.state.filterReverseBest}
              onChange={(event) => this.updateBestReverseScoreFilter(event)}
              type="checkbox"
            />
          </label>
          <label>
            Score:
            <select
              onChange={(event) => this.updateFilterScoreGreaterThan(event)}
              value={this.state.filterScoreGreaterThan}
            >
              <option value={0}>> 0</option>
              {
                all_methods.map((method, index) => {
                  const scoreGreaterThanValue = index + 1;
                  return <option value={scoreGreaterThanValue}>> {scoreGreaterThanValue}</option>;
                })
              }
            </select>
          </label>
          <label>
            Species:
            <select
              onChange={(event) => this.updateFilterSpecies(event)}
              value={this.state.filterSpecies}
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
                  <option value={species}>{species}</option>
                ))
              }
            </select>
          </label>
          <label>
            Methods:
            <select
              onChange={(event) => this.updateFilterMethod(event)}
              value={this.state.filterMethod}
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
        <OrthologyTable data={filteredData} />
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
