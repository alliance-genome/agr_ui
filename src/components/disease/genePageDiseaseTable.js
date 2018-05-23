import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReferenceCell from './referenceCell';
import { LocalDataTable } from '../../components/dataTable';
import { GeneticEntityCell, DiseaseNameCell, EvidenceCodesCell } from '.';
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
          entityName: annotation.featureDocument,
          entityCategory: annotation.featureDocument && annotation.featureDocument.category,
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
        width: 150,
      },
      {
        field: 'entityName',
        label: 'Genetic Entity',
        format: GeneticEntityCell,
        sortable: true,
        filterable: true,
        asText: (featureDocument) => featureDocument ? featureDocument.symbol : '',
        width: 185,
      },
      {
        field: 'entityCategory',
        label: 'Genetic Entity Type',
        sortable: true,
        filterable: true,
        width: 110,
      },
      {
        field: 'associationType',
        label: 'Association',
        sortable: true,
        filterable: true,
        width: 110,
      },
      {
        field: 'publications',
        label: 'Evidence Code',
        format: EvidenceCodesCell,
        asText: EvidenceCodesCell,
        sortable: true,
        filterable: true,
        width: 75,
      },
      {
        field: 'dataProvider',
        label: 'Source',
        sortable: true,
        filterable: true,
        width: 75,
      },
      {
        field: 'refs',
        label: 'References',
        format: ReferenceCell,
        asText: refsText,
        sortable: true,
        filterable: true,
        width: 150,
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
