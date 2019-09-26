
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import isEqual from 'lodash.isequal';

import {
  SpeciesCell,
  GeneCell,
  ReferenceCell,
  DiseaseNameCell,
  EvidenceCodesCell,
  BasedOnGeneCell,
  RemoteDataTable,
  FilterSets,
  GeneticEntityCell

} from '../dataTable';
import { selectDiseaseRibbonAnnotations } from '../../selectors/diseaseRibbonSelectors';
import { fetchDiseaseRibbonAnnotations } from '../../actions/diseaseRibbonActions';

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

  componentDidMount() {
    const { dispatch, genes, term } = this.props;
    dispatch(fetchDiseaseRibbonAnnotations(genes, term));
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
        dataField: 'key',
        text: 'key',
        hidden: true,
      },
      {
        dataField: 'species',
        text: 'Species',
        filterable: FilterSets.species,
        headerStyle: {width: '100px'},
        formatter: species => <SpeciesCell species={species} />,
        hidden: genes.length < 2
      },
      {
        dataField: 'gene',
        text: 'Gene',
        formatter: GeneCell,
        filterable: true,
        headerStyle: {width: '75px'},
        hidden: genes.length < 2
      },
      {
        dataField: 'disease',
        text: 'Disease',
        filterable: true,
        headerStyle: {width: '100px'},
        formatter: DiseaseNameCell,
        hidden: false
      },
      {
        dataField: 'geneticEntityType',
        text: 'Genetic entity type',
        filterable: FilterSets.geneticEntityTypes,
        headerStyle: {
          width: '110px'
        },
        hidden: false
      },
      {
        dataField: 'geneticEntity',
        text: 'Genetic entity',
        filterable: true,
        headerStyle: {
          width: '110px'
        },
        formatter: GeneticEntityCell,
        hidden: false
      },
      {
        dataField: 'associationType',
        text: 'Association',
        formatter: (type) => type.replace(/_/g, ' '),
        filterable: FilterSets.associationTypes,
        headerStyle: {width: '120px'},
        hidden: false
      },
      {
        dataField: 'evidenceCode',
        text: 'Evidence',
        filterable: true,
        headerStyle: {width: '100px'},
        formatter: EvidenceCodesCell,
        hidden: false

      },
      {
        dataField: 'source',
        text: 'Source',
        filterable: true,
        headerStyle: {width: '100px'},
        hidden: false

      },
      {
        dataField: 'basedOnGeneSymbol',
        text: 'Based On',
        filterable: true,
        headerStyle: {width: '100px'},
        formatter: BasedOnGeneCell,
        hidden: false
      },
      {
        dataField: 'reference',
        text: 'References',
        filterable: true,
        headerStyle: {width: '150px'},
        formatter: ReferenceCell,
        hidden: false
      }

    ];

    const data = annotations && annotations.data && annotations.data.map(result => ({
      key: hash(result),
      evidenceCode : result.evidenceCodes,
      gene: result.gene,
      species: result.gene.species,
      basedOnGeneSymbol: result.orthologyGenes ? result.orthologyGenes : null,
      reference: result.publications,
      disease: result.disease,
      geneticEntityType: result.geneticEntityType,
      geneticEntity: result.allele? result.allele: null,
      source : result.source.name,
      associationType: result.associationType
    }));


    const geneIdParams = genes.map(g => `geneID=${g}`).join('&');
    const downloadUrl = '/api/disease/download?' + geneIdParams + (term.type !== 'GlobalAll' ? ('&termID=' + term.id) : '');

    return (
      <RemoteDataTable
        columns={columns}
        data={data}
        downloadUrl={downloadUrl}
        keyField='key'
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
