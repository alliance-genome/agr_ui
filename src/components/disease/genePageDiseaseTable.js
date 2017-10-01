import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DiseaseNameCell from './diseaseNameCell';
import ReferenceCell from './referenceCell';
import { LocalDataTable } from '../../components/dataTable';

const refsText = (refs) => {
  return refs.map(ref => ref.pubMedId || ref.pubModId || '').join(', ');
};

const columns = [
  {
    field: 'name',
    label: 'Disease Name',
    format: DiseaseNameCell,
    isKey: true,
    sortable: true,
    filterable: true,
  },
  {
    field: 'associationType',
    label: 'Association',
    sortable: true,
    filterable: true,
  },
  {
    field: 'dataProvider',
    label: 'Association Source',
    sortable: true,
    filterable: true,
  },
  {
    field: 'refs',
    label: 'References',
    format: ReferenceCell,
    asText: refsText,
    sortable: true,
    filterable: true,
  }
];

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
          dataProvider: annotation.source.name,
          refs: annotation.publications,
        });
      });
    });
    data.sort((a, b) => {
      return a.name.toUpperCase().localeCompare(b.name.toUpperCase());
    });

    return (
      <LocalDataTable columns={columns} data={data} filename={filename} />
    );
  }
}

GenePageDiseaseTable.propTypes = {
  data: PropTypes.array.isRequired,
  filename: PropTypes.string,
};

export default GenePageDiseaseTable;
