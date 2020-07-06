
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import {
  SpeciesCell,
  GeneCell,
  ReferenceCell,
  EvidenceCodesCell,
  BasedOnGeneCell,
  RemoteDataTable,
} from '../dataTable';
import { selectDiseaseRibbonAnnotations } from '../../selectors/diseaseRibbonSelectors';
import { fetchDiseaseRibbonAnnotations } from '../../actions/diseaseRibbonActions';
import AnnotatedEntitiesPopup from '../dataTable/AnnotatedEntitiesPopup';
import DiseaseLink from './DiseaseLink';
import {getDistinctFieldValue} from '../dataTable/utils';
import {compareByFixedOrder} from '../../lib/utils';
import {SPECIES_NAME_ORDER} from '../../constants';
import ProvidersCell from '../dataTable/ProvidersCell';

/*
 * Disease ribbon-table
 * Listens to events in the disease-ribbon component
 */
class DiseaseAnnotationTable extends Component {

  constructor(props){
    super(props);
    this.tableRef = React.createRef();
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { dispatch, genes, term } = this.props;
    if (term !== undefined && ((prevProps.term !== undefined && term !== prevProps.term) || !isEqual(genes, prevProps.genes))) {
      this.tableRef.current && this.tableRef.current.reset();
      dispatch(fetchDiseaseRibbonAnnotations(genes, term));
    }
  }

  handleUpdate(opts) {
    const { dispatch, genes, term } = this.props;
    dispatch(fetchDiseaseRibbonAnnotations(genes, term, opts));
  }

  render() {
    const { annotations, genes, term } = this.props;

    if (!term) {
      return null;
    }

    let columns = [
      {
        dataField: 'species',
        text: 'Species',
        filterable: getDistinctFieldValue(annotations, 'species').sort(compareByFixedOrder(SPECIES_NAME_ORDER)),
        filterLabelClassName: 'species-name',
        headerStyle: {width: '100px'},
        formatter: species => <SpeciesCell species={species} />,
        hidden: genes.length < 2
      },
      {
        dataField: 'gene',
        text: 'Gene',
        formatter:  (gene, row) => (
          <React.Fragment>
            <div>{GeneCell(gene)}</div>
            <small>
              <AnnotatedEntitiesPopup entities={row.primaryAnnotatedEntities}>
                Based on inferences
              </AnnotatedEntitiesPopup>
            </small>
          </React.Fragment>
        ),
        filterable: true,
        headerStyle: {width: '75px'},
      },
      {
        dataField: 'associationType',
        text: 'Association',
        formatter: (type) => type.replace(/_/g, ' '),
        filterable: getDistinctFieldValue(annotations, 'associationType').map(type => type.replace(/_/g, ' ')),
        headerStyle: {width: '120px'},
      },
      {
        dataField: 'disease',
        text: 'Disease',
        filterable: true,
        headerStyle: {width: '150px'},
        formatter: disease => <DiseaseLink disease={disease} />,
      },
      {
        dataField: 'evidenceCodes',
        text: 'Evidence',
        filterable: true,
        headerStyle: {width: '100px'},
        formatter: EvidenceCodesCell,
        filterName: 'evidenceCode',
      },
      {
        dataField: 'providers',
        text: 'Source',
        formatter: providers => providers && <ProvidersCell providers={providers} />,
        filterable: true,
        headerStyle: {width: '100px'},
        filterName: 'provider',
      },
      {
        dataField: 'orthologyGenes',
        text: 'Based On',
        filterable: true,
        filterName: 'basedOnGeneSymbol',
        headerStyle: {width: '100px'},
        formatter: BasedOnGeneCell,
      },
      {
        dataField: 'publications',
        text: 'References',
        filterable: true,
        filterName: 'reference',
        headerStyle: {width: '150px'},
        formatter: ReferenceCell,
      }
    ];

    const data = annotations.data.map(annotation => ({
      species: annotation.gene.species,
      ...annotation,
    }));
    const geneIdParams = genes.map(g => `geneID=${g}`).join('&');
    const downloadUrl = '/api/disease/download?' + geneIdParams + (term !== 'all' ? ('&termID=' + term) : '');

    return (
      <RemoteDataTable
        columns={columns}
        data={data}
        downloadUrl={downloadUrl}
        keyField='primaryKey'
        loading={annotations.loading}
        onUpdate={this.handleUpdate}
        ref={this.tableRef}
        totalRows={annotations.total}
      />
    );
  }
}

DiseaseAnnotationTable.propTypes = {
  annotations: PropTypes.object,
  dispatch: PropTypes.func,
  genes: PropTypes.array,
  term: PropTypes.string
};

const mapStateToProps = state => ({
  annotations: selectDiseaseRibbonAnnotations(state),
});

export default connect(mapStateToProps)(DiseaseAnnotationTable);
