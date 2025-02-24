import { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import StringencySelection from '../homology/stringencySelection';
import OrthologyTable, { isBest } from './orthologyTable';
import { getOrthologSpeciesName } from '../homology/utils';
import HorizontalScroll from '../horizontalScroll';
import LoadingSpinner from '../loadingSpinner';
import NoData from '../noData';
import ControlsContainer from '../controlsContainer';
import { STRINGENCY_HIGH } from '../homology/constants';
import {
  compareAlphabeticalCaseInsensitive,
  orthologyMeetsStringency
} from '../../lib/utils';
import HelpPopup from '../helpPopup';
import HomologyFilterHelp from '../homology/homologyFilterHelp';
import useResettableState from '../../hooks/useResettableState';
import useGeneOrthology from '../../hooks/useGeneOrthology';

const OrthologyFilteredTable = ({geneId}) => {
  const [
    filterScoreGreaterThan,
    setFilterScoreGreaterThan,
    resetFilterScoreGreaterThan
  ] = useResettableState(0);
  const [
    filterMethod,
    setFilterMethod,
    resetFilterMethod
  ] = useResettableState(null);
  const [
    filterBest,
    setFilterBest,
    resetFilterBest
  ] = useResettableState(false);
  const [
    filterReverseBest,
    setFilterReverseBest,
    resetFilterReverseBest
  ] = useResettableState(false);
  const [
    filterSpecies,
    setFilterSpecies,
    resetFilterSpecies
  ] = useResettableState(null);
  const [
    stringencyLevel,
    setStringencyLevel,
    resetStringencyLevel
  ] = useResettableState(STRINGENCY_HIGH);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const { data, isLoading } = useGeneOrthology(geneId);

  const filterCallback = (dat) => {
    const meetMethodFilter = filterMethod ?
    dat.predictionMethodsMatched.some(method => method.name === filterMethod) : true;
    
    return (
      meetMethodFilter &&
      dat.predictionMethodsMatched.length > filterScoreGreaterThan &&
      (filterBest ? isBest(dat.isBestScore.name) : true) &&
      (filterReverseBest ? isBest(dat.isBestScoreReverse.name) : true) &&
      (filterSpecies ? getOrthologSpeciesName(dat) === filterSpecies : true) 
      && orthologyMeetsStringency(dat, stringencyLevel)
    );
  };

  const resetFilters = () => {
    resetFilterScoreGreaterThan();
    resetFilterMethod();
    resetFilterBest();
    resetFilterReverseBest();
    resetFilterSpecies();
    resetStringencyLevel();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (data.total === 0) {
    return <NoData />;
  }

  const filteredData = data.results.filter(filterCallback);
  const all_methods = data.results[0].predictionMethodsMatched.concat(
    data.results[0].predictionMethodsNotCalled
  ).map(method => method.name).sort(compareAlphabeticalCaseInsensitive);

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
        <span className='pull-right'>
          <HelpPopup id='orthology-controls-help'>
            <HomologyFilterHelp ortholog={true}/>
          </HelpPopup>
        </span>
        <StringencySelection
          level={stringencyLevel}
          onChange={setStringencyLevel}
        />
        <Collapse isOpen={showFilterPanel}>
          <div>
            <span style={docTextStyle}>Additional filters to further constrain the results:</span>
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: '-0.5em'}}>
              <label style={labelStyle}>
                <input
                  checked={filterBest}
                  onChange={(event) => setFilterBest(event.target.checked)}
                  style={inputStyle}
                  type="checkbox"
                />
                  Best Score Only
              </label>
              <label style={labelStyle}>
                <input
                  checked={filterReverseBest}
                  onChange={(event) => setFilterReverseBest(event.target.checked)}
                  style={inputStyle}
                  type="checkbox"
                />
                  Best Reverse Score Only
              </label>
            </div>
            <label style={labelStyle}>
                Count:
              <select
                onChange={(event) => setFilterScoreGreaterThan(+event.target.value)}
                style={inputStyle}
                value={filterScoreGreaterThan}
              >
                <option value={0}>&gt; 0</option>
                {
                  all_methods.map((method, index) => {
                    const scoreGreaterThanValue = index + 1;
                    return <option key={scoreGreaterThanValue} value={scoreGreaterThanValue}>&gt; {scoreGreaterThanValue}</option>;
                  })
                }
              </select>
            </label>
            <label style={labelStyle}>
                Species:
              <select
                onChange={(event) => {
                  setFilterSpecies(event.target.value === 'all' ? null : event.target.value)
                }}
                style={inputStyle}
                value={filterSpecies || 'all'}
              >
                <option value="all">All</option>
                {
                  data.results.reduce((all_species, dat) => {
                    const speciesName = getOrthologSpeciesName(dat);
                    if (all_species.indexOf(speciesName) === -1) {
                      return all_species.concat([speciesName]);
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
                onChange={(event) => setFilterMethod(event.target.value === 'all' ? null : event.target.value)}
                style={inputStyle}
                value={filterMethod || 'all'}
              >
                <option value="all">All</option>
                {
                  all_methods.map((method) => (
                    method && <option key={method} value={method}>{method}</option>
                  ))
                }
              </select>
            </label>
          </div>
        </Collapse>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            style={buttonStyle}
            type="button"
          >{`${showFilterPanel ? 'Hide' : 'Show'} additional filters`}</button>
          <button
            className="btn btn-outline-secondary"
            onClick={resetFilters}
            style={buttonStyle}
            type="button"
          >Reset filters</button>
        </div>
      </ControlsContainer>

      <div style={{marginBottom: '1rem'}}>
        {
          filteredData.length > 0 ?
            <HorizontalScroll width={800}>
              <OrthologyTable data={filteredData}/>
            </HorizontalScroll> :
            <NoData>No ortholog matching your filter. Please try a less stringent filter.</NoData>
        }
      </div>
    </div>
  );
};

OrthologyFilteredTable.propTypes = {
  geneId: PropTypes.string.isRequired,
};

export default OrthologyFilteredTable;
