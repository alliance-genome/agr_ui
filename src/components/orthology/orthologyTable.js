import React, { Component } from 'react';
import { Link } from 'react-router';
import MethodHeader from './methodHeader';
import MethodCell from './methodCell';
import BooleanCell from './booleanCell';

const columnNames = ['Species', 'Gene symbol', 'Score',
  'Best score', 'Best reverse score', 'Method'];

class OrthologyTable extends Component {

  render() {
    return(
      <table className='table'>
        <thead>
          <tr>
          {
            columnNames.map((columnName) => {
              if (columnName === 'Method') {
                return (<MethodHeader key={columnName} name={columnName} />);
              } else {
                return (<th key={columnName}>{columnName}</th>);
              }
            })
          }
          </tr>
        </thead>
        <tbody>
        {
          this.props.data.sort((orthDataA, orthDataB) => {
            return (orthDataA.gene2SpeciesName || '').localeCompare(orthDataB.gene2SpeciesName);
          }).map((orthData) => {
            const scoreNumerator = orthData.predictionMethodsMatched.length;
            const scoreDemominator = scoreNumerator +
              orthData.predictionMethodsNotCalled.length +
              orthData.predictionMethodsNotCalled.length;
            return (
              <tr key={`${orthData.gene2AgrPrimaryId}`}>
                <td>{orthData.gene2SpeciesName}</td>
                <td>
                  <Link to={`/gene/${orthData.gene2AgrPrimaryId}`}>{orthData.gene2Symbol}</Link>
                </td>
                <td>{`${scoreNumerator} of ${scoreDemominator}`}</td>
                <BooleanCell
                  isTrueFunc={(value) => value === 'Yes'}
                  value={orthData.isBestScore}
                />
                <BooleanCell
                  isTrueFunc={(value) => value === 'Yes'}
                  value={orthData.isBestRevScore}
                />
                <MethodCell
                  predictionMethodsMatched={orthData.predictionMethodsMatched}
                  predictionMethodsNotMatched={orthData.predictionMethodsNotMatched}
                />
              </tr>
            );
          })
        }
        </tbody>
      </table>
    );
  }
}

OrthologyTable.propTypes = {
  data: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      gene2AgrPrimaryId: React.PropTypes.string,
      gene2Symbol: React.PropTypes.string,
      gene2Species: React.PropTypes.number,
      gene2SpeciesName: React.PropTypes.string,
      predictionMethodsMatched: React.PropTypes.arrayOf(React.PropTypes.string),
      predictionMethodsNotCalled: React.PropTypes.arrayOf(React.PropTypes.string),
      predictionMethodsNotMatched: React.PropTypes.arrayOf(React.PropTypes.string),
      isBestScore: React.PropTypes.bool,
      isBestRevScore: React.PropTypes.bool,
    })
  )
};

export default OrthologyTable;
