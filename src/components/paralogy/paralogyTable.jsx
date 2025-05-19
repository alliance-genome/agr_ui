import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HorizontalScroll from '../horizontalScroll.jsx';
import LoadingSpinner from '../loadingSpinner.jsx';
import NoData from '../noData.jsx';
import useGeneParalogy from '../../hooks/useGeneParalogy';
import MethodHeader from '../homology/methodHeader.jsx';
import MethodCell from '../homology/methodCell.jsx';
import HelpPopup from '../helpPopup.jsx';
import RankHelp from './rankHelp.jsx';
import AlignmentHelp from './alignmentHelp.jsx';

const ParalogyTable = ({geneId}) => {
  const { data, isLoading } = useGeneParalogy(geneId);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (data?.results?.length === 0 || data?.results === undefined) {
    return <NoData>No paralogs for the gene.</NoData>
  }

  const getMethods = (methods) => methods?.map(element => element.name);

  const getTotalMethodCount = (result) => {
    const { predictionMethodsMatched, predictionMethodsNotMatched } = result.geneToGeneParalogy;

    if (!predictionMethodsMatched && !predictionMethodsNotMatched) {
      return 0;
    }
    if (!predictionMethodsMatched) {
      return predictionMethodsNotMatched.length;
    }
    if (!predictionMethodsNotMatched) {
      return predictionMethodsMatched.length;
    }
    return predictionMethodsMatched.length + predictionMethodsNotMatched.length;
  }

  return (
    <div>
      <div style={{marginBottom: '1rem'}}>
            <HorizontalScroll width={800}>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Gene symbol</th>
                    <th>Rank <HelpPopup id={`help-paralogy-rank`}><RankHelp/></HelpPopup></th>
                    <th>Alignment Length (aa) <HelpPopup id={`help-paralogy-align`}><AlignmentHelp/></HelpPopup></th>
                    <th>Similarity %</th>
                    <th>Identity %</th>
                    <th>Method Count</th>
                    <MethodHeader name="Method" paralogy={true}/>
                  </tr>
                </thead>
                <tbody>
                {
                  data.results?.map( result => {
                    const rowKey = 'paralogyrowkey-' + result.geneToGeneParalogy.objectGene.primaryExternalId.replace(/\s/g, '-');
                    return (<tr key={rowKey}>
                      <td>
                        <Link to={`/gene/${result.geneToGeneParalogy.objectGene.primaryExternalId}`} target="_blank">
                          <span dangerouslySetInnerHTML={{__html: result.geneToGeneParalogy.objectGene.geneSymbol.displayText}} />
                        </Link>
                      </td>
                      <td>{result.geneToGeneParalogy.rank}</td>
                      <td>{result.geneToGeneParalogy.length}</td>
                      <td>{result.geneToGeneParalogy.similarity}</td>
                      <td>{result.geneToGeneParalogy.identity}</td>
                      <td>{(result.geneToGeneParalogy.predictionMethodsMatched.length)} of {getTotalMethodCount(result)}</td>
                      <MethodCell
                        predictionMethodsMatched={getMethods(result.geneToGeneParalogy.predictionMethodsMatched)}
                        predictionMethodsNotMatched={getMethods(result.geneToGeneParalogy.predictionMethodsNotMatched)}
                        rowKey={result.geneToGeneParalogy.objectGene.primaryExternalId}
                        paralogy={true}/>
                    </tr>)})
                }
                </tbody>
              </table>
            </HorizontalScroll>
      </div>
    </div>
  );
};

ParalogyTable.propTypes = {
  geneId: PropTypes.string.isRequired,
};

export default ParalogyTable;
