/* eslint-disable react/no-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Button } from 'reactstrap';

import ControlsContainer from '../controlsContainer';
import { StringencySelector } from '../orthology';
import { STRINGENCY_HIGH } from '../orthology/constants';
import { selectOrthology } from '../../selectors/geneSelectors';
import {
  compareAlphabeticalCaseInsensitive, compareSpeciesPhylogenetic, filterOrthologyByStringency, shortSpeciesName,
  sortBy,
} from '../../lib/utils';

class ExpressionComparisonRibbon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stringency: STRINGENCY_HIGH,
      selectedOrthologs: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(values) {
    this.setState({selectedOrthologs: values});
  }

  render() {
    const { orthology } = this.props;
    const { stringency, selectedOrthologs } = this.state;
    const filteredOrthology = sortBy(filterOrthologyByStringency(orthology, stringency), [
      compareSpeciesPhylogenetic(o => o.gene2Species),
      compareAlphabeticalCaseInsensitive(o => o.gene2Symbol)
    ]);
    return (
      <React.Fragment>
        <ControlsContainer>
          <b>Compare to ortholog genes</b>
          <StringencySelector defaultLevel={stringency} onChange={s => this.setState({stringency: s})} />
          <div className='d-flex align-items-baseline'>
            <div className='flex-grow-1'>
              <Select
                closeMenuOnSelect={false}
                getOptionLabel={option => `${option.gene2Symbol} (${shortSpeciesName(option.gene2Species)})`}
                getOptionValue={option => option.gene2AgrPrimaryId}
                isMulti
                onChange={this.handleChange}
                options={filteredOrthology}
                placeholder='Select orthologs...'
                value={selectedOrthologs}
              />
            </div>
            <span className='px-2'>or</span>
            <Button color='primary' onClick={() => this.setState({selectedOrthologs: filteredOrthology})}>Add all</Button>
          </div>
        </ControlsContainer>
      </React.Fragment>
    );
  }
}

ExpressionComparisonRibbon.propTypes = {
  orthology: PropTypes.array,
};

function mapStateToProps (state) {
  return {
    orthology: selectOrthology(state),
  };
}

export default connect(mapStateToProps)(ExpressionComparisonRibbon);
