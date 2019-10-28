/* eslint-disable react/no-set-state */
/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import {
  STRINGENCY_HIGH,
  STRINGENCY_MED,
  STRINGNECY_LOW
} from './orthology/constants';
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip
} from 'reactstrap';
import {SPECIES, TAXON_ORDER} from '../constants';
import {
  compareAlphabeticalCaseInsensitive,
  compareBy,
  compareByFixedOrder,
  makeId,
  orthologyMeetsStringency
} from '../lib/utils';
import {
  getOrthologId,
  getOrthologSpeciesId,
  getOrthologSymbol
} from './orthology';

const bySpecies = species => orthology => species
  .map(s => s.taxonId)
  .indexOf(getOrthologSpeciesId(orthology)) >= 0;
const byStringency = stringency => orthology => orthologyMeetsStringency(orthology, stringency);
const compareBySpeciesThenAlphabetical = compareBy([
  compareByFixedOrder(TAXON_ORDER, o => getOrthologSpeciesId(o)),
  compareAlphabeticalCaseInsensitive(o => getOrthologSymbol(o))
]);

const STRINGENCY_OPTIONS = [
  {
    label: 'Stringent',
    value: STRINGENCY_HIGH,
  },
  {
    label: 'Moderate',
    value: STRINGENCY_MED,
  },
  {
    label: 'Any',
    value: STRINGNECY_LOW,
  },
];

class OrthologPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: !!props.defaultEnabled,
      stringency: STRINGENCY_OPTIONS.find(o => o.value === props.defaultStringency),
      allVertebrates: false,
      allInvertebrates: false,
      selectedSpecies: [],
    };
    this.handleClearSpecies = this.handleClearSpecies.bind(this);
  }

  componentDidMount() {
    this.fireChangeCallback();
  }

  componentDidUpdate(prevProps, prevState) {
    const { allVertebrates, allInvertebrates, stringency, enabled, selectedSpecies } = this.state;
    const stringencyChanged = prevState.stringency !== stringency;
    const speciesChanged = !isEqual(prevState.selectedSpecies, selectedSpecies);
    const orthologyChanged = !isEqual(prevProps.orthology, this.props.orthology);
    const enabledChanged = prevState.enabled !== enabled;

    // if the filters or orthology itself have changed...
    if (enabledChanged || stringencyChanged || speciesChanged || orthologyChanged) {
      // ...fire the parent component change callback...
      this.fireChangeCallback();

      // enable the main compare checkbox (may be a no-op in some cases)
      if ((stringencyChanged && stringency) || (speciesChanged && selectedSpecies.length)) {
        this.setState({enabled: true});
      }
    }

    // if the user changed the species, clear the vertebrate/invertebrate checkboxes
    if (speciesChanged && allVertebrates === prevState.allVertebrates) {
      this.setState({allVertebrates: false});
    }
    if (speciesChanged && allInvertebrates === prevState.allInvertebrates) {
      this.setState({allInvertebrates: false});
    }
  }

  fireChangeCallback() {
    const { orthology, onChange, genesWithData } = this.props;
    const { enabled, stringency, selectedSpecies } = this.state;
    if (!enabled) {
      return onChange([]);
    }
    const filteredOrthology = orthology
      .sort(compareBySpeciesThenAlphabetical)
      .filter(o => genesWithData ? genesWithData[getOrthologId(o)] : true);
    let selectedOrthologs = filteredOrthology;
    if (stringency) {
      selectedOrthologs = selectedOrthologs.filter(byStringency(stringency.value));
    }
    if (selectedSpecies.length) {
      selectedOrthologs = selectedOrthologs.filter(bySpecies(selectedSpecies));
    }
    onChange(selectedOrthologs);
  }

  toggleVertebrates(checked) {
    this.setState({allVertebrates: checked});
    if (checked) {
      this.setState(state => ({
        selectedSpecies: [...state.selectedSpecies, ...SPECIES.filter(s => s.vertebrate)],
      }));
    } else {
      this.setState(state => ({
        selectedSpecies: state.selectedSpecies.filter(s => !s.vertebrate)
      }));
    }
  }

  toggleInvertebrates(checked) {
    this.setState({allInvertebrates: checked});
    if (checked) {
      this.setState(state => ({
        selectedSpecies: [...state.selectedSpecies, ...SPECIES.filter(s => !s.vertebrate)],
      }));
    } else {
      this.setState(state => ({
        selectedSpecies: state.selectedSpecies.filter(s => s.vertebrate)
      }));
    }
  }

  handleClearSpecies() {
    this.setState({
      selectedSpecies: [],
      allVertebrates: false,
      allInvertebrates: false,
    });
  }

  speciesHasOrthologsWithData(species) {
    const { genesWithData, orthology } = this.props;
    if (!genesWithData) {
      return true;
    }
    return orthology
      .filter(bySpecies([species]))
      .map(getOrthologId)
      .filter(id => genesWithData[id])
      .length > 0;
  }

  speciesHasOrthologsMeetingStringency(species) {
    const { genesWithData, orthology } = this.props;
    const { stringency } = this.state;

    return orthology
      .filter(bySpecies([species]))
      .filter(o => stringency ? orthologyMeetsStringency(o, stringency.value) : true)
      .filter(o => genesWithData ? genesWithData[getOrthologId(o)] : true)
      .length > 0;
  }

  render() {
    const { focusTaxonId, id, orthology } = this.props;
    const { allInvertebrates, allVertebrates, enabled, selectedSpecies, stringency } = this.state;

    return (
      <React.Fragment>
        <div className='form-group'>
          <div className='form-check form-check-inline'>
            <label className='form-check-label'>
              <input
                checked={enabled}
                className='form-check-input'
                onChange={e => this.setState({enabled: e.target.checked})}
                type='checkbox'
              />
              <b>Compare ortholog genes</b>
            </label>
          </div>
        </div>
        <div>
          <UncontrolledDropdown className='pr-2' tag='span'>
            <DropdownToggle caret className='align-baseline' color='primary' outline={!enabled || !stringency}>
              <span>Stringency{stringency && `: ${stringency.label}`}</span>
            </DropdownToggle>
            <DropdownMenu>
              <form className="px-4 py-3" style={{minWidth: '300px'}}>
                <div className='form-group'>
                  {STRINGENCY_OPTIONS.map(option => (
                    <div className='form-check' key={option.value}>
                      <label className='form-check-label'>
                        <input
                          checked={!!stringency && stringency.value === option.value}
                          className='form-check-input'
                          name='stringency'
                          onChange={() => this.setState({stringency: option})}
                          type='radio'
                        />
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
                <button
                  className='btn btn-outline-secondary'
                  onClick={() => this.setState({stringency: null})}
                  type='button'
                >
                  Clear
                </button>
              </form>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown className='pr-2' tag='span'>
            <DropdownToggle caret className='align-baseline' color='primary' outline={!enabled || !selectedSpecies.length}>
              Species
              {selectedSpecies.length > 0 && `: ${selectedSpecies[0].fullName}`}
              {selectedSpecies.length > 1 && ` +${selectedSpecies.length - 1}`}
            </DropdownToggle>
            <DropdownMenu>
              <form className="px-4 py-3" style={{minWidth: '300px'}}>
                <div className='form-group'>
                  <div className='form-check'>
                    <label className='form-check-label'>
                      <input
                        checked={allVertebrates}
                        className='form-check-input'
                        onChange={e => this.toggleVertebrates(e.target.checked)}
                        type='checkbox'
                      />
                      All vertebrates
                    </label>
                  </div>
                  <div className='form-check'>
                    <label className='form-check-label'>
                      <input
                        checked={allInvertebrates}
                        className='form-check-input'
                        onChange={e => this.toggleInvertebrates(e.target.checked)}
                        type='checkbox'
                      />
                      All invertebrates
                    </label>
                  </div>
                </div>
                <hr />
                <div className='form-group'>
                  {SPECIES
                    .filter(species => focusTaxonId ? species.taxonId !== focusTaxonId : true)
                    .map(species => {
                      const checkId = id + makeId(species.taxonId);
                      const hasOrthologs = orthology.findIndex(o => getOrthologSpeciesId(o) === species.taxonId) >= 0;
                      const hasOrthologsWithData = this.speciesHasOrthologsWithData(species);
                      const hasOrthologsMeetingStringency = this.speciesHasOrthologsMeetingStringency(species);
                      const disabled = !hasOrthologs || !hasOrthologsWithData || !hasOrthologsMeetingStringency;
                      return (
                        <div key={species.taxonId}>
                          <div className={`form-check form-check-inline ${disabled ? 'disabled' : ''}`} id={checkId}>
                            <label className='form-check-label'>
                              <input
                                checked={!!selectedSpecies.find(s => s.taxonId === species.taxonId)}
                                className='form-check-input'
                                disabled={disabled}
                                onChange={e => {
                                  if (e.target.checked) {
                                    this.setState({selectedSpecies: [...selectedSpecies, species]});
                                  } else {
                                    this.setState({selectedSpecies: selectedSpecies.filter(s => s.taxonId !== species.taxonId)});
                                  }
                                }}
                                type='checkbox'
                              />
                              <i>{species.fullName}</i>
                            </label>
                          </div>
                          {disabled &&
                          <UncontrolledTooltip delay={{show: 200, hide: 0}} placement='bottom' target={checkId}>
                            <span dangerouslySetInnerHTML={{
                              __html: (
                                (!hasOrthologs && `No <i>${species.fullName}</i> orthologs of this gene`) ||
                                (!hasOrthologsWithData && `No <i>${species.fullName}</i> orthologs of this gene have annotations`) ||
                                (!hasOrthologsMeetingStringency && `No <i>${species.fullName}</i> orthologs of this gene meet selected Stringency filter`)
                              )
                            }}
                            />
                          </UncontrolledTooltip>
                          }
                        </div>
                      );
                    })
                  }
                </div>
                <button
                  className='btn btn-outline-secondary'
                  onClick={this.handleClearSpecies}
                  type='button'
                >
                  Clear
                </button>
              </form>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </React.Fragment>
    );
  }
}

OrthologPicker.propTypes = {
  defaultEnabled: PropTypes.bool,
  defaultStringency: PropTypes.string,
  focusTaxonId: PropTypes.string,
  genesWithData: PropTypes.object,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  orthology: PropTypes.array,
  value: PropTypes.array,
};

OrthologPicker.defaultProps = {
  orthology: [],
};

export default OrthologPicker;
