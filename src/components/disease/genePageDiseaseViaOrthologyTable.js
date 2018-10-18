import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  LocalDataTable,
  DiseaseNameCell,
  EvidenceCodesCell,
  ReferenceCell
} from '../../components/dataTable';
import { compareAlphabeticalCaseInsensitive } from '../../lib/utils';

class GenePageDiseaseTable extends Component {

  render() {
    const diseases = this.props.data;
    const filename = this.props.filename;

    let data = [];
    diseases.forEach((disease) => {
      disease.annotations.forEach((annotation) => {
        data.push({
          name: disease.name,
          doId: disease.doId,
          associationType: annotation.associationType.replace(/_/g, ' '),
          orthologyGene: annotation.orthologyGeneDocument || {},
          orthologyGeneSpecies: (annotation.orthologyGeneDocument || {}).species,
          entityName: annotation.featureDocument,
          entityCategory: annotation.featureDocument ? annotation.featureDocument.category : 'gene',
          dataProvider: annotation.source.name,
          publications: annotation.publications,
          refs: annotation.publications,
        });
      });
    });
    data.sort(compareAlphabeticalCaseInsensitive(row => row.name));

    const refsText = (refs) => {
      return refs.map(ref => ref.pubMedId || ref.pubModId || '').join(', ');
    };

    const columns = [
      {
        field: 'name',
        label: 'Disease',
        format: DiseaseNameCell,
        isKey: true,
        sortable: true,
        filterable: true,
        width: '150px',
      },
      {
        field: 'orthologyGeneSpecies',
        label: 'Ortholog Species',
        format: (species) => species ? <i>{species}</i> : '',
        asText: (species) => species ? species : '',
        sortable: true,
        filterable: true,
        width: '150px',
      },
      {
        field: 'orthologyGene',
        label: 'Ortholog',
        format: ({primaryId, symbol}) => <Link to={`/gene/${primaryId}`}>{symbol}</Link>,
        sortable: true,
        filterable: true,
        asText: ({symbol}) => symbol ? symbol : '',
        width: '110px',
      },
      {
        field: 'associationType',
        label: 'Association',
        sortable: true,
        filterable: true,
        width: '110px',
      },
      {
        field: 'publications',
        label: 'Evidence Code',
        format: EvidenceCodesCell,
        asText: EvidenceCodesCell,
        sortable: true,
        filterable: true,
        width: '75px',
      },
      {
        field: 'dataProvider',
        label: 'Source',
        sortable: true,
        filterable: true,
        width: '75px',
      },
      {
        field: 'refs',
        label: 'References',
        format: ReferenceCell,
        asText: refsText,
        sortable: true,
        filterable: true,
        width: '150px',
      }
    ];

    return (
      <LocalDataTable columns={columns} data={data} filename={filename} paginated />
    );
  }
}

GenePageDiseaseTable.propTypes = {
  data: PropTypes.array.isRequired,
  filename: PropTypes.string,
};

export default GenePageDiseaseTable;
