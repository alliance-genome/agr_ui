import _ from 'underscore';
import React, { Component } from 'react';
import FlybaseDataGrid from 'react-flybase-datagrid';
import ReferenceCell from './referenceCell';

function getHeaders(){

  var columns = [
   {id:'do_name', name:'Disease Name'},
   {id:'associationType', name:'Association'},
   {id:'evidence', name:'Evidence Code'},
   {id:'dataProvider', name:'Association Source'},
   {id:'refs', name:'References', render: ReferenceCell}
  ];
  return columns;
}

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
            do_id: disease.do_id,
            do_name: disease.do_name,
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
      .sortBy('do_name')
      .each((row) => {
        let prev = _.last(data);
        if (typeof prev !== 'undefined' &&
            row.evidence === prev.evidence &&
            row.dataProvider === prev.dataProvider &&
            row.associationType === prev.associationType &&
            row.do_name === prev.do_name) {
          prev.refs = prev.refs.concat(row.refs);
        } else {
          data.push(row);
        }
      });

    return (

       <FlybaseDataGrid
         columns={getHeaders()}
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
