import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MethodHeader from '../orthology/methodHeader';
import MethodCell from '../orthology/methodCell';
import BooleanCell from '../orthology/booleanCell';
import {
  getOrthologId,
  getOrthologSymbol as getHomologSymbol,
} from '../orthology/utils';
import { sortBy } from '../../lib/utils';
import HelpPopup from '../helpPopup';

import style from '../orthology/style.scss';

const columns = [
  {name: 'Gene symbol'},
  {name: 'Count'},
  {name: 'Best', help: <span>This gene is called a paralog of the input gene by the highest number of algorithms.<br/> In specific cases, ZFIN curators have asserted reliable paralogy to the gene called by the second highest number of algorithms. These are denoted <strong>Yes *</strong>.</span>},
  {name: 'Best reverse', help: 'The input gene is called a paralog of this gene by the highest number of algorithms.'},
  {name: 'Method'}
];

export function isBest(value = '') {
  return typeof value === 'boolean' ? value : value.match(/yes/i);
}

class ParalogyTable extends Component {

  render() {
    let rowGroup = 0;
    return(
      <table className='table'>
        <thead className='text-capitalize'>
          <tr>
            {
              columns.map((column) => {
                if (column.name === 'Method') {
                  return (<MethodHeader key={column.name} name={column.name} />);
                } else {
                  return (<th key={column.name}>
                    {column.name} {column.help && <HelpPopup id={`help-${column.name}`}>{column.help}</HelpPopup>}
                  </th>);
                }
              })
            }
          </tr>
        </thead>
        <tbody>
          {
              sortBy(this.props.data, [
                (orthDataA, orthDataB) => orthDataB.predictionMethodsMatched.length - orthDataA.predictionMethodsMatched.length
              ]).map((orthData, idx, orthList) => {
              const scoreNumerator = orthData.predictionMethodsMatched.length;
              const scoreDemominator = scoreNumerator +
                orthData.predictionMethodsNotMatched.length;
              const orthId = getOrthologId(orthData);

              return (
                <tr className={rowGroup % 2 === 0 ? style.groupedRow : ''} key={orthId}>
                  <td>
                    <Link to={`/gene/${orthId}`}>
                      <span dangerouslySetInnerHTML={{__html: getHomologSymbol(orthData)}} />
                    </Link>
                  </td>
                  <td>{`${scoreNumerator} of ${scoreDemominator}`}</td>
                  <BooleanCell
                    isTrueFunc={isBest}
                    render={
                      orthData.best === 'Yes_Adjusted' ?
                        () => 'Yes *' :
                        null
                    }
                    value={orthData.best}
                  />
                  <BooleanCell
                    isTrueFunc={isBest}
                    value={orthData.bestReverse}
                  />
                  <MethodCell
                    predictionMethodsMatched={orthData.predictionMethodsMatched}
                    predictionMethodsNotMatched={orthData.predictionMethodsNotMatched}
                    rowKey={orthId}
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

ParalogyTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      gene: PropTypes.shape({
        id: PropTypes.string,
        symbol: PropTypes.string,
        species: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
      predictionMethodsMatched: PropTypes.arrayOf(PropTypes.string),
      predictionMethodsNotCalled: PropTypes.arrayOf(PropTypes.string),
      predictionMethodsNotMatched: PropTypes.arrayOf(PropTypes.string),
      best: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
      ]),
      bestReverse: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
      ]),
    })
  )
};

export default ParalogyTable;
