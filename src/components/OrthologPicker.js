import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  STRINGENCY_HIGH,
  STRINGENCY_MED,
  STRINGNECY_LOW
} from './homology/constants';
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip
} from 'reactstrap';
import { SPECIES as ALL_SPECIES, TAXON_ORDER } from '../constants';
import {
  compareAlphabeticalCaseInsensitive,
  compareBy,
  compareByFixedOrder,
  getSpecies,
  makeId,
  orthologyMeetsStringency
} from '../lib/utils';
import {
  getOrthologId,
  getOrthologSpeciesId,
  getOrthologSymbol
} from './orthology';
import useGeneOrthology from '../hooks/useGeneOrthology';
import useResettableState from '../hooks/useResettableState';
import SpeciesName from './SpeciesName';
import HelpPopup from "./helpPopup";
import OrthologPickerHelp from "./disease/OrthologPickerHelp";

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
    label: 'No filter',
    value: STRINGNECY_LOW,
  },
];

const SPECIES = ALL_SPECIES.filter(s => s.enableOrthologComparison);

const sortBySpecies = species => species.sort(
  compareByFixedOrder(SPECIES.map(s => s.taxonId), s => s.taxonId)
);

const uniqueSpecies = species => species.filter((element, idx, array) => (
  array.map(a => a.taxonId).indexOf(element.taxonId) === idx
));

const OrthologPicker =({
  checkboxValue,
  defaultStringency,
  focusGeneId,
  focusTaxonId,
  geneHasDataTest,
  id,
  onChange,
  onCheckboxValueChange,
}) => {
  // UI state
  const [inputDisabled,setInputDisabled] = useState(false);
  const [stringency, setStringency] = useState(STRINGENCY_OPTIONS.find(o => o.value === defaultStringency));
  const [allVertebrates, setAllVertebrates, resetAllVertebrates] = useResettableState(false);
  const [allInvertebrates, setAllInvertebrates, resetAllInvertebrates] = useResettableState(false);
  const [selectedSpecies, setSelectedSpecies, resetSelectedSpecies] = useResettableState([]);

  // data from API
  const orthology = useGeneOrthology(focusGeneId);
  const orthologyResults = orthology.data?.results || [];

  const geneHasData = (id) => {
    if (!geneHasDataTest) {
      return true;
    }
    return geneHasDataTest(orthology.data.supplementalData[id]);
  };
  // if the orthology data has settled, filter it and pass it back to the parent
  // via the `onChange` callback whenever the orthology or one of the UI controls
  // has changed
  useEffect(() => {
    if (orthology.isLoading) {
      return;
    }
    let selectedOrthologs = [];
    if (checkboxValue && orthologyResults) {
      selectedOrthologs = orthologyResults.sort(compareBySpeciesThenAlphabetical)
        .filter(o => geneHasData(getOrthologId(o)));
      if (stringency) {
        selectedOrthologs = selectedOrthologs.filter(byStringency(stringency.value));
      }
      if (selectedSpecies.length) {
        selectedOrthologs = selectedOrthologs.filter(bySpecies(selectedSpecies));
      }
    }
    onChange(selectedOrthologs);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orthology.isLoading, checkboxValue, stringency, selectedSpecies]);

  // if the stringency changes, ensure the checkbox is enabled but not on the
  // first render because it's possible to have the checkbox off and a default
  // stringency set. we shouldn't override in that case.
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (stringency) {
      onCheckboxValueChange(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringency]);

  // if the selected species change, ensure the checkbox is enabled
  useEffect(() => {
    if (selectedSpecies.length) {
      onCheckboxValueChange(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSpecies.length]);

  // when the focus gene changes, ensure that the species is allowed to have
  // ortholog comparison. if it isn't, disable the inputs and instruct the parent
  // to turn the checkbox off.
  useEffect(() => {
    if (!getSpecies(focusTaxonId).enableOrthologComparison) {
      onCheckboxValueChange(false);
      setInputDisabled(true);
    } else {
      setInputDisabled(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusTaxonId]);

  const toggleVertebrates = (checked) => {
    setAllVertebrates(checked);
    if (checked) {
      setSelectedSpecies(current => uniqueSpecies(sortBySpecies(
        [...current, ...SPECIES.filter(s => s.vertebrate)]
      )));
    } else {
      setSelectedSpecies(current => current.filter(s => !s.vertebrate));
    }
  };

  const toggleInvertebrates = (checked) => {
    setAllInvertebrates(checked);
    if (checked) {
      setSelectedSpecies(current => uniqueSpecies(sortBySpecies(
        [...current, ...SPECIES.filter(s => !s.vertebrate)]
      )));
    } else {
      setSelectedSpecies(current => current.filter(s => s.vertebrate));
    }
  };

  const toggleSpecies = (checked, species) => {
    if (checked) {
      setSelectedSpecies(current => uniqueSpecies(sortBySpecies([...current, species])));
    } else {
      if (species.vertebrate) {
        setAllVertebrates(false);
      } else {
        setAllInvertebrates(false);
      }
      setSelectedSpecies(current => current.filter(s => s.taxonId !== species.taxonId));
    }
  };

  const handleClearSpecies = () => {
    resetSelectedSpecies();
    resetAllVertebrates();
    resetAllInvertebrates();
  };

  const speciesHasOrthologsWithData  = (species) => {
    if (!geneHasDataTest) {
      return true;
    }
    return orthologyResults?.filter(bySpecies([species]))
      .map(getOrthologId)
      .some(geneHasData);
  };

  const speciesHasOrthologsMeetingStringency = (species) => {
    return orthologyResults?.filter(bySpecies([species]))
      .filter(o => stringency ? orthologyMeetsStringency(o, stringency.value) : true)
      .some(o => geneHasData(getOrthologId(o)));
  };

  if (orthology.isLoading || !orthology.data) {
    return null;
  }

  return (
    <div className='mb-3'>
      <div className='form-group mb-1'>
        <div className='form-check form-check-inline'>
          <input
            checked={checkboxValue}
            className='form-check-input'
            disabled={inputDisabled}
            id={id + '-checkbox'}
            onChange={e => onCheckboxValueChange(e.target.checked)}
            type='checkbox'
          />
          <label className='form-check-label' htmlFor={id + '-checkbox'}>
            <b>Compare ortholog genes</b>
          </label>
        </div>
        <div style={{display: 'inline'}} onclick={(e) => {e.stopPropagation()}}>
           <span>
            <HelpPopup id='ortholog-picker-help'>
              <OrthologPickerHelp/>
            </HelpPopup>
          </span>
        </div>
      </div>
      <div className='ml-3'>
        <UncontrolledDropdown className='pr-2' tag='span'>
          <DropdownToggle caret className='align-baseline' color='primary' disabled={inputDisabled}
                          outline={!checkboxValue || !stringency}>
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
                        onChange={() => setStringency(option)}
                        type='radio'
                      />
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              <button
                className='btn btn-outline-secondary'
                onClick={() => setStringency(null)}
                type='button'
              >
                Clear
              </button>
            </form>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown className='pr-2' tag='span'>
          <DropdownToggle caret className='align-baseline' color='primary' disabled={inputDisabled} outline={!checkboxValue || !selectedSpecies.length}>
            Species
            {selectedSpecies.length > 0 && <span>: <SpeciesName>{selectedSpecies[0].fullName}</SpeciesName></span>}
            {selectedSpecies.length > 1 && <span className='ml-1'>+{selectedSpecies.length - 1} species</span>}
          </DropdownToggle>
          <DropdownMenu>
            <form className="px-4 py-3" style={{minWidth: '300px'}}>
              <div className='form-group'>
                <div className='form-check'>
                  <label className='form-check-label'>
                    <input
                      checked={allVertebrates}
                      className='form-check-input'
                      onChange={e => toggleVertebrates(e.target.checked)}
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
                      onChange={e => toggleInvertebrates(e.target.checked)}
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
                    const hasOrthologs = orthologyResults?.findIndex(o => getOrthologSpeciesId(o) === species.taxonId) >= 0;
                    const hasOrthologsWithData = speciesHasOrthologsWithData(species);
                    const hasOrthologsMeetingStringency = speciesHasOrthologsMeetingStringency(species);
                    const disabled = !hasOrthologs || !hasOrthologsWithData || !hasOrthologsMeetingStringency;
                    return (
                      <div key={species.taxonId}>
                        <div className={`form-check form-check-inline ${disabled ? 'disabled' : ''}`} id={checkId}>
                          <label className='form-check-label'>
                            <input
                              checked={!!selectedSpecies.find(s => s.taxonId === species.taxonId)}
                              className='form-check-input'
                              disabled={disabled}
                              onChange={e => toggleSpecies(e.target.checked, species)}
                              type='checkbox'
                            />
                            <SpeciesName>{species.fullName}</SpeciesName>
                          </label>
                        </div>
                        {disabled &&
                        <UncontrolledTooltip delay={{show: 200, hide: 0}} placement='bottom' target={checkId}>
                          {
                            (!hasOrthologs && <>No <SpeciesName>{species.fullName}</SpeciesName> orthologs of this gene</>) ||
                            (!hasOrthologsWithData && <>No <SpeciesName>{species.fullName}</SpeciesName> orthologs of this gene have annotations</>) ||
                            (!hasOrthologsMeetingStringency && <>No <SpeciesName>{species.fullName}</SpeciesName> orthologs of this gene meet selected Stringency filter</>)
                          }
                        </UncontrolledTooltip>
                        }
                      </div>
                    );
                  })
                }
              </div>
              <button
                className='btn btn-outline-secondary'
                onClick={handleClearSpecies}
                type='button'
              >
                Clear
              </button>
            </form>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </div>
  );
};

OrthologPicker.propTypes = {
  checkboxValue: PropTypes.bool.isRequired,
  defaultStringency: PropTypes.string,
  focusGeneId: PropTypes.string,
  focusTaxonId: PropTypes.string,
  geneHasDataTest: PropTypes.func,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onCheckboxValueChange: PropTypes.func.isRequired,
};

export default OrthologPicker;
