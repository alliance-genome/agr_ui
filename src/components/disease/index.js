import React, { Component } from 'react';
import FlybaseDataGrid from 'react-flybase-datagrid';

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

    const diseases = this.props.data;

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
