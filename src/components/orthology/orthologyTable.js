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
              <tr key={`${orthData.gene2DataProvider}-${orthData.gene2}`}>
                <td>{orthData.gene2DataProvider}</td>
                <td>
                  <Link to={`/gene/${orthData.gene2}`}>{orthData.gene2}</Link>
                </td>
                <td>{`${scoreNumerator} of ${scoreDemominator}`}</td>
                <BooleanCell
                  isTrue={(value) => value === 'Yes'}
                  value={orthData.isBestScore}
                />
                <BooleanCell
                  isTrue={(value) => value === 'Yes'}                
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
      gene2: React.PropTypes.string,
      gene2DataProvider: React.PropTypes.string,
      predictionMethodsMatched: React.PropTypes.arrayOf(React.PropTypes.string),
      predictionMethodsNotCalled: React.PropTypes.arrayOf(React.PropTypes.string),
      predictionMethodsNotMatched: React.PropTypes.arrayOf(React.PropTypes.string),
      isBestScore: React.PropTypes.bool,
      isBestRevScore: React.PropTypes.bool,
    })
  )
};

export default OrthologyTable;
