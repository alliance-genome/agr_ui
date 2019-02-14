/* eslint-disable react/no-set-state */
/* set-state has to be used
  because the state of the component is not shared
  with the rest of the application
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import { OrthologyTable, StringencySelector } from '.';
import { connect } from 'react-redux';
import { selectOrthologs } from '../../selectors/geneSelectors';
import { fetchOrthologs } from '../../actions/genes';
import HorizontalScroll from '../horizontalScroll';
import LoadingSpinner from '../loadingSpinner';
import NoData from '../noData';
import ControlsContainer from '../controlsContainer';
import { STRINGENCY_HIGH } from './constants';
import { orthologyMeetsStringency } from '../../lib/utils';

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
  stringencyLevel: STRINGENCY_HIGH,
};

class OrthologyFilteredTable extends Component {
  constructor(props) {
    super(props);
    const defaultState = Object.assign({showFilterPanel: false,}, DEFAULT_FILTERS);
    this.state = defaultState;
  }

  componentDidMount () {
    const { geneId, fetchData } = this.props;
    fetchData(geneId);
  }

  componentDidUpdate (prevProps) {
    const { geneId, fetchData } = this.props;
    if (geneId !== prevProps.geneId) {
      fetchData(geneId);
    }
  }

  getOrthologSpeciesName(homologGene = {}) {
    return (homologGene.species || {}).name;
  }

  filterCallback(dat) {
    const meetMethodFilter = this.state.filterMethod ?
      dat.predictionMethodsMatched.indexOf(this.state.filterMethod) > -1 :
      true;
    return (
      meetMethodFilter &&
      dat.predictionMethodsMatched.length > this.state.filterScoreGreaterThan &&
      (this.state.filterBest ? dat.best : true) &&
      (this.state.filterReverseBest ? dat.bestReverse : true) &&
      (this.state.filterSpecies ? this.getOrthologSpeciesName(dat.homologGene) === this.state.filterSpecies : true) &&
      orthologyMeetsStringency(dat, this.state.stringencyLevel)
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

    if (this.props.loading) {
      return <LoadingSpinner />;
    }

    if (this.props.data.length === 0) {
      return <NoData />;
    }

    const filteredData = this.props.data.filter((dat) => this.filterCallback(dat));
    console.log(this.props.data);
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
        <ControlsContainer>
          <StringencySelector
            defaultLevel={this.state.stringencyLevel}
            onChange={level => this.setState({stringencyLevel: level})}
          />
          <Collapse isOpen={this.state.showFilterPanel}>
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
                      const {homologGene = {}} = dat;
                      if (all_species.indexOf(this.getOrthologSpeciesName(homologGene)) === -1) {
                        return all_species.concat([this.getOrthologSpeciesName(homologGene)]);
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
              className="btn btn-outline-secondary"
              onClick={() => this.resetFilters()}
              style={buttonStyle}
              type="button"
            >Reset filters</button>
          </div>
        </ControlsContainer>

        <div style={{marginBottom: '1rem'}}>
          {
            filteredData.length > 0 ?
              <HorizontalScroll width={800}>
                <OrthologyTable data={filteredData} />
              </HorizontalScroll> :
              <NoData>No ortholog matching your filter. Please try a less stringent filter.</NoData>
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
      homologGene: PropTypes.shape({
        // speciesName: PropTypes.string,
        species: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
      predictionMethodsMatched: PropTypes.arrayOf(PropTypes.string),
      predictionMethodsNotCalled: PropTypes.arrayOf(PropTypes.string),
      predictionMethodsNotMatched: PropTypes.arrayOf(PropTypes.string),
      best: PropTypes.bool,
      bestReverse: PropTypes.bool,
    })
  ),
  loading: PropTypes.any,
  fetchData: PropTypes.func.isRequired, // provided via connect
  geneId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const {data, loading, error} = selectOrthologs(state);
  return {
    data: data,
    error: error,
    loading: loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (geneId) => {
      console.log('gonna call fetch orthologs');
      dispatch(fetchOrthologs(geneId));
    },
  };
};

export { OrthologyFilteredTable as OrthologyFilteredTable };
export default connect(mapStateToProps, mapDispatchToProps)(OrthologyFilteredTable);
