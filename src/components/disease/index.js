/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import FlybaseDataGrid from 'react-flybase-datagrid';

const doLink = (name, row) => (
  <a href={`http://www.disease-ontology.org/?id=${row.do_id}`}>{name}</a>
);

const headers = [
  {id:'do_name', name:'Disease Name', render: doLink},
  {id:'associationType', name:'Association'},
  {id:'evidence', name:'Evidence Code'},
  {id:'dataProvider', name:'Association Source'},
  {id:'ref', name:'References'}
];

class DiseaseTable extends Component {
  constructor(props) {
    super(props);

    // var diseases = [
    //   {
    //     'associationType': 'contributes_to_condition',
    //     'dataProvider': 'ZFIN',
    //     'do_name': [
    //       'cardiomyopathy'
    //     ],
    //     'evidence': [
    //       {
    //         'evidenceCode': 'TAS',
    //         'pubs': [
    //           {
    //             'pubMedId': '27642634',
    //             'publicationModId': 'ZFIN:ZDB-PUB-160920-5'
    //           },
    //           {
    //             'pubMedId': '1233',
    //             'publicationModId': 'ZFIN:ZDB-PUB-170406-10'
    //           }
    //         ]
    //       }
    //     ],
    //   },
    //   {
    //     'associationType': 'contributes_to_condition',
    //     'dataProvider': 'flybase',
    //     'do_name': [
    //       'cancer'
    //     ],
    //     'evidence': [
    //       {
    //         'evidenceCode': 'TAS',
    //         'pubs': [
    //           {
    //             'pubMedId': '987654',
    //             'publicationModId': 'ZFIN:ZDB-PUB-160920-5'
    //           },
    //           {
    //             'pubMedId': '',
    //             'publicationModId': 'ZFIN:ZDB-PUB-170406-10'
    //           }
    //         ]
    //       }
    //     ],
    //   }
    // ];

  }

  render() {
    const diseases = this.props.data;

    var data = diseases.map((disease) => {
      const {
        associationType: associationType,
        dataProvider: dataProvider,
        do_id: do_id,
        do_name: do_name,
        evidence: [
          {
            evidenceCode: evidenceCode,
            pubs: [ ...pubs ]
          }
        ],
      } = disease;

      return {
        do_id : do_id,
        do_name : do_name,
        associationType: associationType,
        evidence: evidenceCode,
        dataProvider: dataProvider,
        ref: pubs.map((pub) => { return pub['pubMedId']; }).filter((pub) => { return (pub!=''); }).join()
      };
    });

    return (

       <FlybaseDataGrid
         columns={headers}
         data={data}
         showColumnFilter
         showDownloadButton
         width={1110}
       />

    );
  }
}

DiseaseTable.propTypes = {
  data: React.PropTypes.array.isRequired,
};

export default DiseaseTable;
