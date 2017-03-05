import React, { Component } from 'react';
import MethodHeader from './methodHeader';
import MethodCell from './methodCell';
import BooleanCell from './booleanCell';

const columnNames = ['Species', 'Gene symbol', 'Score',
  'Best score', 'Best reverse score', 'Method', 'Align'];

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
            return (
              <tr key={`${orthData.species}-${orthData.geneSymbol}`}>
                <td>{orthData.species}</td>
                <td>
                  <a href={orthData.geneURL}>{orthData.geneSymbol}</a>
                  <span
                    style={{
                      display: 'inline-block',
                      margin: '0 0.5em'
                    }}
                  >|</span>
                  <a href={`https://www.ncbi.nlm.nih.gov/gene/${orthData.ncbiID}`}>[NCBI]</a>
                </td>
                <td>{`${orthData.scoreNumerator} of ${orthData.scoreDemominator}`}</td>
                <BooleanCell value={orthData.isBestScore} />
                <BooleanCell value={orthData.isBestScoreReverse} />
                <MethodCell methods={orthData.methods} />
                <td><a href={orthData.alignURL}>View</a></td>
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
      geneSymbol: React.PropTypes.string,
      geneURL: React.PropTypes.string,
      ncbiID: React.PropTypes.string,
      scoreNumerator: React.PropTypes.number,
      scoreDemominator: React.PropTypes.number,
      isBestScore: React.PropTypes.bool,
      isBestScoreReverse: React.PropTypes.bool,
      alignURL: React.PropTypes.string,
    })
  )
};

export default OrthologyTable;
