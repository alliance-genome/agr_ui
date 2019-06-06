
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';

import { RemoteDataTable, FilterSets} from '../dataTable';

import {
  SpeciesCell,
  GeneCell,
  ReferenceCell,
  DiseaseNameCell,
  EvidenceCodesCell
} from '../dataTable';

/*
 * Disease ribbon-table
 * Listens to events in the disease-ribbon component
 */
export class DiseaseAnnotationTable extends Component {

  constructor(props){
    super(props);
    this.tableRef = React.createRef();
    this.state = {
      annotations: props.annotations,
      geneId: props.geneId,
      genes: props.genes,
      onUpdate: props.onUpdate,
      term: props.term
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this.setState({
      annotations: nextProps.annotations,
      geneId: nextProps.geneId,
      genes: nextProps.genes,
      onUpdate: nextProps.onUpdate,
      term: nextProps.term
    });
  }


  render() {
    const annotations = this.state.annotations;

    if(!this.state.term) {
      return('');
    }

    if(!this.state.genes) {
      return('');
    }

    if(!annotations || !annotations.data || annotations.data.length == 0) {
      return(
        <div><i>No data available for {this.state.term.label}</i></div>
      );
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
        formatter: SpeciesCell,
        hidden: this.state.genes.length < 2
      },
      {
        dataField: 'gene',
        text: 'Gene',
        formatter: GeneCell,
        filterable: true,
        headerStyle: {width: '75px'},
        hidden: this.state.genes.length < 2
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
        dataField: 'geneticEntity',
        text: 'Genetic Entity',
        filterable: true,
        headerStyle: {width: '105px'},
        hidden: true

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
        dataField: 'based_on',
        text: 'Based On',
        filterable: true,
        headerStyle: {width: '100px'},
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

    let data = [];
    if (annotations.data.length > 0) {
      data = annotations.data
        .map(result => ({
          key: hash(result),
          evidenceCode : result.evidenceCodes,
          gene: result.gene,
          species: result.gene.species,
          based_on: result.gene.symbol,
          reference: result.publications,
          disease: result.disease,
          geneticEntityType: result.geneticEntityType,
          source : result.source.name,
          associationType: result.associationType
        }));

      const geneIdParams = this.state.genes.map(g => `geneID=${g}`).join('&');
      const downloadUrl = '/api/disease/download?' + geneIdParams + (this.state.term.type == 'GlobalAll' ? '' : '&termID=' + this.state.term.id);

      return (
        <div style={{marginTop : '20px'}}>
          {(annotations) ?
            <RemoteDataTable
              columns={columns}
              data={data || []}
              downloadUrl={downloadUrl}
              keyField='key'
              loading={annotations.loading}
              onUpdate={this.props.onUpdate}
              ref={this.tableRef}
              totalRows={annotations.total > 0 ? annotations.total: 0}
            />: ''
          }
        </div>
      );
    }
    else{
      return('');
    }
  }
}

DiseaseAnnotationTable.propTypes = {
  annotations: PropTypes.object.isRequired,
  geneId: PropTypes.string.isRequired,
  genes: PropTypes.array,
  onUpdate: PropTypes.func,
  term: PropTypes.object
};

export default DiseaseAnnotationTable;
