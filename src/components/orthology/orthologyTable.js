import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import MethodHeader from './methodHeader';
import MethodCell from './methodCell';
import BooleanCell from './booleanCell';
import HelpIcon from './helpIcon';

const columns = [
  {name: 'Species'},
  {name: 'Gene symbol'},
  {name: 'Count'},
  {name: 'Best', help: 'Within this species, this gene is called as an ortholog of the input gene by the highest number of algorithms.'},
  {name: 'Best reverse', help: 'Within the species of the input gene, the input gene is called as an ortholog of this gene by the highest number of algorithms.'},
  {name: 'Method'}
];

const defaultSpeciesOrder = [
  'Homo sapiens',
  'Mus musculus',
  'Rattus norvegicus',
  'Danio rerio',
  'Drosophila melanogaster',
  'Caenorhabditis elegans',
  'Saccharomyces cerevisiae'
];

const getSpeciesOrderScore = (speciesName, speciesOrder = defaultSpeciesOrder) => {
  const speciesIndex = speciesOrder.indexOf(speciesName);
  return speciesIndex === -1 ? speciesOrder.length : speciesIndex;
};

class OrthologyTable extends Component {

  render() {
    const speciesPresent = this.props.data.map((orthData) => {
      return orthData.gene2SpeciesName;
    });
    // refine the species order to keep only species present in orthologs
    const speciesOrder = defaultSpeciesOrder.filter((speciesName) => {
      return speciesPresent.indexOf(speciesName) !== -1;
    });

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
                  {column.name}
                  {column.help && <HelpIcon iconKey={`help-${column.name}`} text={column.help} />}
                </th>);
              }
            })
          }
          </tr>
        </thead>
        <tbody>
        {
          this.props.data.sort((orthDataA, orthDataB) => {
            const speciesOrderDelta = getSpeciesOrderScore(orthDataA.gene2SpeciesName) -
              getSpeciesOrderScore(orthDataB.gene2SpeciesName);
            return speciesOrderDelta === 0 ?
              (orthDataB.predictionMethodsMatched.length) - (orthDataA.predictionMethodsMatched.length) :
              speciesOrderDelta;
          }).map((orthData) => {
            const scoreNumerator = orthData.predictionMethodsMatched.length;
            const scoreDemominator = scoreNumerator +
              orthData.predictionMethodsNotMatched.length;

            const rowStyle = getSpeciesOrderScore(orthData.gene2SpeciesName, speciesOrder) % 2 === 0 ?
              {backgroundColor: '#eee'} : {};
            return (
              <tr key={`${orthData.gene2AgrPrimaryId}`} style={rowStyle} >
                <td style={{fontStyle: 'italic'}}>{orthData.gene2SpeciesName}</td>
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      gene2AgrPrimaryId: PropTypes.string,
      gene2Symbol: PropTypes.string,
      gene2SpeciesName: PropTypes.string,
      predictionMethodsMatched: PropTypes.arrayOf(PropTypes.string),
      predictionMethodsNotCalled: PropTypes.arrayOf(PropTypes.string),
      predictionMethodsNotMatched: PropTypes.arrayOf(PropTypes.string),
      isBestScore: PropTypes.bool,
      isBestRevScore: PropTypes.bool,
    })
  )
};

export default OrthologyTable;
