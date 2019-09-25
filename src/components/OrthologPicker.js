/* eslint-disable react/no-set-state */
import React from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';
import { Button } from 'reactstrap';

import {
  StringencySelection,
  getOrthologSpeciesId,
  getOrthologId,
  getOrthologSymbol,
} from './orthology';
import {
  compareAlphabeticalCaseInsensitive,
  compareBy,
  compareByFixedOrder,
  orthologyMeetsStringency,
  shortSpeciesName,
} from '../lib/utils';
import { TAXON_ORDER } from '../constants';

const makeLabel = (symbol, taxonId) => `${symbol} (${shortSpeciesName(taxonId)})`;
const byStringency = stringency => orthology => orthologyMeetsStringency(orthology, stringency);
const compareBySpeciesThenAlphabetical = compareBy([
  compareByFixedOrder(TAXON_ORDER, o => getOrthologSpeciesId(o)),
  compareAlphabeticalCaseInsensitive(o => getOrthologSymbol(o))
]);

class OrthologPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stringency: props.defaultStringency
    };
  }

  render() {
    const { onChange, orthology, value } = this.props;
    const { stringency } = this.state;

    const filteredOrthology = (orthology.data || [])
      .filter(byStringency(this.state.stringency))
      .sort(compareBySpeciesThenAlphabetical);

    return (
      <React.Fragment>
        <b>Compare to ortholog genes</b>
        <StringencySelection level={stringency} onChange={stringency => this.setState({stringency})} />
        <div className='d-flex align-items-baseline'>
          <div className='flex-grow-1'>
            <Select
              closeMenuOnSelect={false}
              getOptionLabel={option => makeLabel(getOrthologSymbol(option), getOrthologSpeciesId(option))}
              getOptionValue={option => getOrthologId(option)}
              isLoading={orthology.loading}
              isMulti
              maxMenuHeight={210}
              onChange={onChange}
              options={filteredOrthology}
              placeholder='Select orthologs...'
              value={value}
            />
          </div>
          <span className='px-2'>or</span>
          <Button
            color='primary'
            disabled={filteredOrthology.length === 0}
            onClick={() => onChange(filteredOrthology)}
          >
            Add all
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

OrthologPicker.propTypes = {
  defaultStringency: PropTypes.string,
  onChange: PropTypes.func,
  orthology: PropTypes.object,
  value: PropTypes.array,
};

export default OrthologPicker;
