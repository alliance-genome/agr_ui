import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MethodHeader from './methodHeader';
import MethodCell from './methodCell';
import BooleanCell from './booleanCell';
import HelpIcon from './helpIcon';
import { sortBy, compareByFixedOrder } from '../../lib/utils';
import { TAXON_ORDER } from '../../constants';

const columns = [
  {name: 'Species'},
  {name: 'Gene symbol'},
  {name: 'Count'},
  {name: 'Best', help: 'Within this species, this gene is called as an ortholog of the input gene by the highest number of algorithms.'},
  {name: 'Best reverse', help: 'Within the species of the input gene, the input gene is called as an ortholog of this gene by the highest number of algorithms.'},
  {name: 'Method'}
];

class OrthologyTable extends Component {

  render() {
    let rowGroup = 0;
    return(
      <table className='table'>
        <thead>
          <tr>
            {
              columns.map((column) => {
                if (column.name === 'Method') {
                  return (<MethodHeader key={column.name} name={column.name} />);
                } else {
                  return (<th key={column.name}>
                    {column.name}{column.help && <HelpIcon iconKey={`help-${column.name}`} text={column.help} />}
                  </th>);
                }
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            sortBy(this.props.data, [
              compareByFixedOrder(TAXON_ORDER, o => o.gene2Species),
              (orthDataA, orthDataB) => orthDataB.predictionMethodsMatched.length - orthDataA.predictionMethodsMatched.length
            ]).map((orthData, idx, orthList) => {
              const gene2 = orthData.homologGene || {};
              const scoreNumerator = orthData.predictionMethodsMatched.length;
              const scoreDemominator = scoreNumerator +
                orthData.predictionMethodsNotMatched.length;

              if (idx > 0 && orthList[idx - 1].gene2Species !== gene2.speciesName) {
                rowGroup += 1;
              }

              const key = gene2.geneID;
              return (
                <tr key={key} style={{backgroundColor: rowGroup % 2 === 0 ? '#eee' : ''}} >
                  <td style={{fontStyle: 'italic'}}>{gene2.speciesName}</td>
                  <td>
                    <Link to={`/gene/${gene2.geneID}`}>{gene2.symbol}</Link>
                  </td>
                  <td>{`${scoreNumerator} of ${scoreDemominator}`}</td>
                  <BooleanCell
                    isTrueFunc={(value) => value === 'Yes'}
                    value={orthData.best}
                  />
                  <BooleanCell
                    isTrueFunc={(value) => value === 'Yes'}
                    value={orthData.bestReverse}
                  />
                  <MethodCell
                    predictionMethodsMatched={orthData.predictionMethodsMatched}
                    predictionMethodsNotMatched={orthData.predictionMethodsNotMatched}
                    rowKey={key}
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      gene: PropTypes.shape({
        geneID: PropTypes.string,
        symbol: PropTypes.string,
        speciesName: PropTypes.string,
      }),
      predictionMethodsMatched: PropTypes.arrayOf(PropTypes.string),
      predictionMethodsNotCalled: PropTypes.arrayOf(PropTypes.string),
      predictionMethodsNotMatched: PropTypes.arrayOf(PropTypes.string),
      best: PropTypes.bool,
      bestReverse: PropTypes.bool,
    })
  )
};

export default OrthologyTable;
