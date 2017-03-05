import React, { Component } from 'react';
import DataSourceLink from '../dataSourceLink';

const mockDiseaseData = [
  {
    diseaseName: 'Bannayan-Riley-Ruvalcaba syndrome',
    diseaseId: '153480',
    associationType: 'is model of',
    evidenceCode: 'TAS',
    annotationSource: 'MGI',
    references: [
      {
        dataProvider: 'PMID',
        id: '12345',
      },
      {
        dataProvider: 'PMID',
        id: '12345',
      },
    ],
  },
  {
    diseaseName: 'brain glioma',
    associationType: 'causes or contributes to condition',
    evidenceCode: 'TAS',
    annotationSource: 'FB',
    references: [
      {
        dataProvider: 'PMID',
        id: '12345',
      },
    ],
  },
  {
    diseaseName: 'Cowden disease',
    associationType: 'is model of',
    evidenceCode: 'TAS',
    annotationSource: 'MGI',
    references: [
      {
        dataProvider: 'PMID',
        id: '12345',
      },
    ],
  },
  {
    diseaseName: 'endometrial cancer',
    associationType: 'causes or contributes to condition',
    evidenceCode: 'ISS',
    annotationSource: 'RGD',
    references: [
      {
        dataProvider: 'PMID',
        id: '12345',
      },
    ],
  },
  {
    diseaseName: 'prostate cancer',
    associationType: 'is model of',
    evidenceCode: 'IC',
    annotationSource: 'ZFIN',
    references: [
      {
        dataProvider: 'PMID',
        id: '12345',
      },
    ],
  },
  {
    diseaseName: 'prostate cancer',
    associationType: 'causes or contributes to condition',
    evidenceCode: 'ISS',
    annotationSource: 'SGD',
    references: [
      {
        dataProvider: 'PMID',
        id: '12345',
      },
    ],
  },
  {
    diseaseName: 'acute lymphocytic leukemia',
    associationType: 'is model of',
    evidenceCode: 'TAS',
    annotationSource: 'MGI',
    references: [
      {
        dataProvider: 'PMID',
        id: '12345',
      },
    ],
  },
  {
    diseaseName: 'fatty liver disease',
    associationType: 'causes or contributes to condition',
    evidenceCode: 'IEP',
    annotationSource: 'RGD',
    references: [
      {
        dataProvider: 'PMID',
        id: '12345',
      },
    ],
  },
  {
    diseaseName: 'fatty liver disease',
    associationType: 'is model of',
    evidenceCode: 'TAS',
    annotationSource: 'MGI',
    references: [
      {
        dataProvider: 'PMID',
        id: '12345',
      },
    ],
  },
  {
    diseaseName: 'hepatocellular carcinoma',
    associationType: 'causes or contributes to condition',
    evidenceCode: 'ISS',
    annotationSource: 'WB',
    references: [
      {
        dataProvider: 'PMID',
        id: '12345',
      },
    ],
  },
  {
    diseaseName: 'persistent fetal circulation syndrome',
    associationType: 'is model of',
    evidenceCode: 'TAS',
    annotationSource: 'MGI',
    references: [
      {
        dataProvider: 'PMID',
        id: '12345',
      },
    ],
  },
  {
    diseaseName: 'urinary bladder cancer',
    associationType: 'is marker for',
    evidenceCode: 'ISS',
    annotationSource: 'RGD',
    references: [
      {
        dataProvider: 'PMID',
        id: '12345',
      },
    ],
  },
];

class DiseaseTable extends Component {
  render() {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Disease Name</th>
            <th>Association</th>
            <th>Evidence Code</th>
            <th>Association Source</th>
            <th>References</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((d, idx) => {
            return (
              <tr key={`disease-${idx}`}>
                <td><a href='' onClick={e => e.preventDefault()}>{d.diseaseName}</a></td>
                <td>{d.associationType}</td>
                <td>{d.evidenceCode}</td>
                <td>{d.annotationSource}</td>
                <td>
                  {d.references
                    .map((r, idx) => {
                      return (
                        <DataSourceLink
                          dataProvider={r.dataProvider}
                          id={r.id}
                          key={`ref-${idx}`}
                        />
                      );
                    })
                    .reduce((accu, elem) => {
                      return accu === null ? [elem] : [...accu, ', ', elem];
                    }, null)
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

DiseaseTable.propTypes = {
  data: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      diseaseName: React.PropTypes.string,
      associationType: React.PropTypes.string,
      evidenceCode: React.PropTypes.string,
      annotationSource: React.PropTypes.string,
      references: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          dataProvider: React.PropTypes.string,
          id: React.PropTypes.string,
        })
      ),
    })
  ),
};

export default DiseaseTable;

export {
  DiseaseTable,
  mockDiseaseData
};
