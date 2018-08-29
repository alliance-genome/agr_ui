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
import { filterOrthologyByStringency } from '../../lib/utils';

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
    const filteredOrthology = filterOrthologyByStringency(orthology, stringency);
    return (
      <React.Fragment>
        <ControlsContainer>
          <b>Compare to ortholog genes</b>
          <StringencySelector defaultLevel={stringency} onChange={s => this.setState({stringency: s})} />
          <Button color="primary" onClick={() => this.setState({selectedOrthologs: filteredOrthology})}>Add all</Button>
          or
          <Select
            closeMenuOnSelect={false}
            getOptionLabel={option => `${option.gene2Symbol} (${option.gene2SpeciesName})`}
            getOptionValue={option => option.gene2AgrPrimaryId}
            isMulti
            onChange={this.handleChange}
            options={filteredOrthology}
            placeholder='Select orthologs...'
            value={selectedOrthologs}
          />
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
