import React, { Component } from 'react';
import FlybaseDataGrid from 'react-flybase-datagrid';

function getHeaders(){

  var columns = [
   {id:'name', name:'Disease Name'},
   {id:'assc', name:'Association'},
   {id:'ec', name:'Evidence Code'},
   {id:'as', name:'Association Source'},
   {id:'ref', name:'References'}
  ];

  return columns;

}

const data = [
{ name: 'Bannayan-Riley-Ruvalcaba syndrome', assc: 'is model of', ec: 'TAS', as: 'MGI', ref: 'PMID:12345, PMID:12345'},
{ name: 'brain glioma', assc: 'causes or contributes to condition', ec: 'TAS', as: 'FB', ref: 'PMID:12345'},
{ name: 'Cowden disease', assc: 'is model of', ec: 'TAS', as: 'MGI', ref: 'PMID:12345'},
{ name: 'endometrial cancer', assc: 'causes or contributes to condition', ec: 'ISS', as: 'RGD', ref: 'PMID:12345'},
{ name: 'prostate cancer', assc: 'is model of', ec: 'IC', as: 'ZFIN', ref: 'PMID:12345'},
{ name: 'prostate cancer', assc: 'causes or contributes to condition', ec: 'ISS', as: 'SGD', ref: 'PMID:12345'},
{ name: 'acute lymphocytic leukemia', assc: 'is model of', ec: 'TAS', as: 'MGI', ref: 'PMID:12345'},
{ name: 'fatty liver disease', assc: 'causes or contributes to condition', ec: 'IEP', as: 'RGD', ref: 'PMID:12345'},
{ name: 'fatty liver disease', assc: 'is model of', ec: 'TAS', as: 'MGI', ref: 'PMID:12345'},
{ name: 'hepatocellular carcinoma', assc: 'causes or contributes to condition', ec: 'ISS', as: 'WB', ref: 'PMID:12345'},
{ name: 'persistent fetal circulation syndrome', assc: 'is model of', ec: 'TAS', as: 'MGI', ref: 'PMID:12345'},
{ name: 'urinary bladder cancer', assc: 'is marker for', ec: 'ISS', as: 'RGD', ref: 'PMID:12345'},
];

class DiseaseTable extends Component {
  render() {
    return (

       <FlybaseDataGrid columns={getHeaders()} data={data} showColumnFilter={true} showDownloadButton={true} />

    );
  }
}

export default DiseaseTable;
