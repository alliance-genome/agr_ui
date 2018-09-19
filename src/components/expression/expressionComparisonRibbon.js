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
import SummaryRibbon from './summaryRibbon';
import { selectAnnotations } from '../../selectors/expressionSelectors';
import { fetchExpressionAnnotations } from '../../actions/expression';
import RemoteDataTable from '../dataTable/remoteDataTable';

const makeLabel = (symbol, taxonId) => `${symbol} (${shortSpeciesName(taxonId)})`;

const columns = [
  {
    field: 'key',
    isKey: true,
    hidden: true,
  },
  {
    field: 'species',
    label: 'Species',
  },
  {
    field: 'gene',
    label: 'Gene',
  },
  {
    field: 'location',
    label: 'Location',
  },
  {
    field: 'stage',
    label: 'Stage',
  }
];

class ExpressionComparisonRibbon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stringency: STRINGENCY_HIGH,
      selectedOrthologs: [],
      selectedTerm: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlockClick = this.handleBlockClick.bind(this);
    this.handleAnnotationUpdate = this.handleAnnotationUpdate.bind(this);
  }

  handleChange(values) {
    this.setState({selectedOrthologs: values});
  }

  handleBlockClick(block) {
    this.setState({selectedTerm: block.class_id}, () => this.handleAnnotationUpdate());
  }

  handleAnnotationUpdate(opts) {
    opts = opts || {};
    opts.page = opts.page || 1;
    const { dispatch, geneId } = this.props;
    const { selectedOrthologs, selectedTerm } = this.state;
    const selectedGenes = [geneId].concat(selectedOrthologs.map(o => o.gene2AgrPrimaryId));
    dispatch(fetchExpressionAnnotations(selectedGenes, selectedTerm, opts.page));
  }

  render() {
    const { annotations, geneId, geneSymbol, geneTaxon, orthology } = this.props;
    const { stringency, selectedOrthologs } = this.state;
    const filteredOrthology = sortBy(filterOrthologyByStringency(orthology, stringency), [
      compareSpeciesPhylogenetic(o => o.gene2Species),
      compareAlphabeticalCaseInsensitive(o => o.gene2Symbol)
    ]);
    const data = annotations.data && annotations.data.results.map(result => ({
      key: `${result.gene.geneID}-${result.termName}-${result.stage.stageID}`,
      species: result.gene.speciesName,
      gene: result.gene.symbol,
      location: result.termName,
      stage: result.stage.name,
    }));
    return (
      <React.Fragment>
        <ControlsContainer>
          <b>Compare to ortholog genes</b>
          <StringencySelector defaultLevel={stringency} onChange={s => this.setState({stringency: s})} />
          <div className='d-flex align-items-baseline'>
            <div className='flex-grow-1'>
              <Select
                closeMenuOnSelect={false}
                getOptionLabel={option => makeLabel(option.gene2Symbol, option.gene2Species)}
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
        <div>
          <SummaryRibbon geneId={geneId}
                         label={makeLabel(geneSymbol, geneTaxon)}
                         onClick={this.handleBlockClick}
                         showLabel={selectedOrthologs.length > 0}
          />
          {selectedOrthologs.map(o => (
            <SummaryRibbon geneId={o.gene2AgrPrimaryId}
                           key={o.gene2AgrPrimaryId}
                           label={makeLabel(o.gene2Symbol, o.gene2Species)}
                           onClick={this.handleBlockClick}
            />
          ))}
        </div>
        { annotations.data &&
          <RemoteDataTable
            columns={columns}
            data={data}
            loading={annotations.loading}
            onUpdate={this.handleAnnotationUpdate}
            totalRows={annotations.data ? annotations.data.total : 0}
          />
        }
      </React.Fragment>
    );
  }
}

ExpressionComparisonRibbon.propTypes = {
  annotations: PropTypes.object,
  dispatch: PropTypes.func,
  geneId: PropTypes.string.isRequired,
  geneSymbol: PropTypes.string.isRequired,
  geneTaxon: PropTypes.string.isRequired,
  orthology: PropTypes.array,
};

function mapStateToProps (state) {
  return {
    orthology: selectOrthology(state),
    annotations: selectAnnotations(state),
  };
}

export default connect(mapStateToProps)(ExpressionComparisonRibbon);
