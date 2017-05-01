import React, { Component } from 'react';
import FlybaseDataGrid from 'react-flybase-datagrid';

const showColumnFilter = true;
const showDownloadButton = true;

function getHeaders(){

  var columns = [
   {id:'do_name', name:'Disease Name'},
   {id:'associationType', name:'Association'},
   {id:'evidence', name:'Evidence Code'},
   {id:'dataProvider', name:'Association Source'},
   {id:'ref', name:'References'}
  ];
  return columns;
}

class DiseaseTable extends Component {
  constructor(props) {
    super(props);

    const diseases = this.props.data.diseases;

    this.data = diseases.map((disease) => {

      const {
        associationType: associationType,
        dataProvider: dataProvider,
        do_name: do_name,
        evidence: [
          {
            evidenceCode: evidenceCode,
            pubs: [ ...pubs ]
          }
        ],
      } = disease;

      return {
        do_name : do_name,
        associationType: associationType,
        evidence: evidenceCode,
        dataProvider: dataProvider,
        ref: pubs.map((pub) => { return pub['pubMedId']; }).filter((pub) => { return (pub!=''); }).join()
      };
    });
  }

  render() {
    return (

       <FlybaseDataGrid
         columns={getHeaders()}
         data={this.data}
         showDownloadButton={true}
         showColumnFilter={true}
       />

    );
  }
}

export default DiseaseTable;
