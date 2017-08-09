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
      filterReverseBest: false
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
      (this.state.filterReverseBest ? dat.isBestRevScore : true)
    );
  }

  updateFilterMethod(event) {
    this.setState({
      filterMethod: event.target.value
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
            Methods:
            <select
              onChange={(event) => this.updateFilterMethod(event)}
              value={this.state.filterMethod}
            >
              <option>All</option>
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
