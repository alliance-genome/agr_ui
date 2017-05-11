/* eslint-disable react/no-multi-comp */

import _ from 'underscore';
import React, { Component } from 'react';
import FlybaseDataGrid from 'react-flybase-datagrid';
import DiseaseNameCell from './diseaseNameCell';
import ReferenceCell from './referenceCell';

const headers = [
  {id:'doName', name:'Disease Name', render: DiseaseNameCell},
  {id:'associationType', name:'Association'},
  {id:'evidence', name:'Evidence Code'},
  {id:'dataProvider', name:'Association Source'},
  {id:'refs', name:'References', render: ReferenceCell}
];

class DiseaseTable extends Component {
  render() {
    const diseases = this.props.data;

    // the way the incoming data is grouped doesn't exactly exactly align with
    // the way we need it to be grouped for display. so, we need to flatten it
    // and then re-group it here.
    const flattened = [];
    diseases.forEach((disease) => {
      disease.evidence.forEach((evidence) => {
        evidence.pubs.forEach((pub) => {
          flattened.push({
            doId: disease.do_id,
            doName: disease.do_name,
            doIdDisplay: disease.doIdDisplay,
            associationType: disease.associationType,
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

       <FlybaseDataGrid
         columns={headers}
         data={data}
         showColumnFilter
         downloadButton={['tsv']}
         width={1110}
       />

    );
  }
}

DiseaseTable.propTypes = {
  data: React.PropTypes.array.isRequired,
};

export default DiseaseTable;
