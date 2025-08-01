import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MethodHeader from '../homology/methodHeader.jsx';
import MethodCell from '../homology/methodCell.jsx';
import BooleanCell from '../homology/booleanCell.jsx';
import { getOrthologSpeciesId, getOrthologSpeciesName, getOrthologId, getOrthologSymbol } from '../homology/utils';
import { sortBy, compareByFixedOrder } from '../../lib/utils';
import { TAXON_ORDER } from '../../constants';
import HelpPopup from '../helpPopup.jsx';

import style from '../homology/style.module.scss';
import SpeciesName from '../SpeciesName.jsx';

const columns = [
  { name: 'Species' },
  { name: 'Gene symbol' },
  { name: 'Count' },
  {
    name: 'Best',
    help: (
      <span>
        Within this species, this gene is called as an ortholog of the input gene by the highest number of algorithms.
        <br /> In specific cases, ZFIN curators have asserted reliable orthology to the gene called by the second
        highest number of algorithms. These are denoted <strong>Yes *</strong>.
      </span>
    ),
  },
  {
    name: 'Best reverse',
    help: 'Within the species of the input gene, the input gene is called as an ortholog of this gene by the highest number of algorithms.',
  },
  { name: 'Method' },
];

export function isBest(value = '') {
  return typeof value === 'boolean' ? value : !!value.match(/yes/i);
}

class OrthologyTable extends Component {
  render() {
    let rowGroup = 0;
    return (
      <table className="table">
        <thead className="text-capitalize">
          <tr>
            {columns.map((column) => {
              if (column.name === 'Method') {
                return <MethodHeader key={column.name} name={column.name} />;
              } else {
                return (
                  <th key={column.name}>
                    {column.name} {column.help && <HelpPopup id={`help-${column.name}`}>{column.help}</HelpPopup>}
                  </th>
                );
              }
            })}
          </tr>
        </thead>
        <tbody>
          {sortBy(this.props.data, [
            compareByFixedOrder(TAXON_ORDER, (o) => getOrthologSpeciesId(o)),
            (orthDataA, orthDataB) =>
              orthDataB.predictionMethodsMatched.length - orthDataA.predictionMethodsMatched.length,
          ]).map((orthData, idx, orthList) => {
            const scoreNumerator = orthData.predictionMethodsMatched?.length;
            const scoreDemominator = scoreNumerator + (orthData.predictionMethodsNotMatched?.length || 0);
            const orthId = getOrthologId(orthData);

            if (idx > 0 && getOrthologSpeciesName(orthList[idx - 1]) !== getOrthologSpeciesName(orthData)) {
              rowGroup += 1;
            }
            return (
              <tr className={rowGroup % 2 === 0 ? style.groupedRow : ''} key={orthId}>
                <td>
                  <SpeciesName>{getOrthologSpeciesName(orthData)}</SpeciesName>
                </td>
                <td>
                  <Link to={`/gene/${orthId}`}>
                    <span dangerouslySetInnerHTML={{ __html: getOrthologSymbol(orthData) }} />
                  </Link>
                </td>
                <td>{`${scoreNumerator} of ${scoreDemominator}`}</td>
                <BooleanCell
                  isTrueFunc={isBest}
                  render={orthData.isBestScore?.name === 'Yes_Adjusted' ? () => 'Yes *' : null}
                  value={orthData.isBestScore.name}
                />
                <BooleanCell isTrueFunc={isBest} value={orthData.isBestScoreReverse.name} />
                <MethodCell
                  predictionMethodsMatched={orthData.predictionMethodsMatched?.map((method) => method.name)}
                  predictionMethodsNotMatched={orthData.predictionMethodsNotMatched?.map((method) => method.name)}
                  rowKey={orthId}
                  paralogy={false}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

OrthologyTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      gene: PropTypes.shape({
        id: PropTypes.string,
        symbol: PropTypes.string,
        species: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
      predictionMethodsMatched: PropTypes.arrayOf(PropTypes.object),
      predictionMethodsNotCalled: PropTypes.arrayOf(PropTypes.object),
      predictionMethodsNotMatched: PropTypes.arrayOf(PropTypes.object),
      best: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
      bestReverse: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    })
  ),
};

export default OrthologyTable;
