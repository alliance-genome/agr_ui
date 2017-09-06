import _ from 'underscore';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DiseaseNameCell from './diseaseNameCell';
import ReferenceCell from './referenceCell';
import { LocalDataTable } from '../../components/dataTable';

const refsText = (refs) => {
  return refs.map(ref => ref.pubMedId || ref.publicationModId || '').join(', ');
};

const columns = [
  {
    field: 'doName',
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
    field: 'evidence',
    label: 'Evidence Code',
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

    // the way the incoming data is grouped doesn't exactly align with the way
    // we need it to be grouped for display. so, we need to flatten it out and
    // then re-group it here.
    const flattened = [];
    diseases.forEach((disease) => {
      disease.evidence.forEach((evidence) => {
        evidence.pubs.forEach((pub) => {
          flattened.push({
            doId: disease.do_id,
            doName: disease.do_name,
            doIdDisplay: disease.doIdDisplay,
            associationType: disease.associationType.replace(/_/g, ' '),
            dataProvider: disease.dataProvider,
            evidence: evidence.evidenceCode,
            refs: [pub],
          });
        });
      });
    });
    let data = [];
    _.chain(flattened)
      .sortBy('evidence')
      .sortBy('dataProvider')
      .sortBy('associationType')
      .sortBy('doName')
      .each((row) => {
        let prev = _.last(data);
        if (typeof prev !== 'undefined' &&
            row.evidence === prev.evidence &&
            row.dataProvider === prev.dataProvider &&
            row.associationType === prev.associationType &&
            row.doName === prev.doName) {
          prev.refs = prev.refs.concat(row.refs);
        } else {
          data.push(row);
        }
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
