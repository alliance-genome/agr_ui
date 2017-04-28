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
          this.props.data.map((orthData) => {
            const scoreNumerator = orthData.predictionMethodsMatched.length;
            const scoreDemominator = scoreNumerator +
              orthData.predictionMethodsNotCalled.length +
              orthData.predictionMethodsNotCalled.length;
            return (
              <tr key={`${orthData.gene2AgrPrimaryId}`}>
                <td>{orthData.gene2Species}</td>
                <td>
                  <Link to={`/gene/${orthData.gene2AgrPrimaryId}`}>{orthData.gene2DisplayId}</Link>
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
      species: React.PropTypes.string,
      gene2AgrPrimaryId: React.PropTypes.string,
      gene2DisplayId: React.PropTypes.string,
      gene2Species: React.PropTypes.number,
      predictionMethodsMatched: React.PropTypes.arrayOf(React.PropTypes.string),
      predictionMethodsNotCalled: React.PropTypes.arrayOf(React.PropTypes.string),
      predictionMethodsNotMatched: React.PropTypes.arrayOf(React.PropTypes.string),
      isBestScore: React.PropTypes.string,
      isBestRevScore: React.PropTypes.string,
    })
  )
};

export default OrthologyTable;
