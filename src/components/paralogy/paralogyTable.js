import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HorizontalScroll from '../horizontalScroll';
import LoadingSpinner from '../loadingSpinner';
import NoData from '../noData';
import useGeneParalogy from '../../hooks/useGeneParalogy';
import MethodHeader from '../homology/methodHeader';
import MethodCell from '../homology/methodCell';
import HelpPopup from '../helpPopup';
import RankHelp from './rankHelp';
import AlignmentHelp from './alignmentHelp';

const ParalogyTable = ({geneId}) => {
  const { data, isLoading } = useGeneParalogy(geneId);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (data?.results?.length === 0 || data?.results === undefined) {
    return <NoData>No paralogs for the gene.</NoData>
  }

  const results = data.results?.sort( (a,b) => {
    if (Number(a.rank) < Number(b.rank)) {
      return -1;
    }
    if (Number(a.rank) > Number(b.rank)) {
      return 1;
    }
    return 0;
  });
  
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
                  results?.map( result => {
                    const rowKey = 'paralogyrowkey-' + result.homologGene.id.replace(/\s/g, '-');
                    return (<tr key={rowKey}>
                      <td>
                        <Link to={`/gene/${result.homologGene.id}`} target="_blank">
                          <span dangerouslySetInnerHTML={{__html: result.homologGene.symbol}} />
                        </Link>
                      </td>                    
                      <td>{result.rank}</td>
                      <td>{result.length}</td>
                      <td>{result.similarity}</td>
                      <td>{result.identity}</td>
                      <td>{result.methodCount} of {result.totalMethodCount}</td>
                      <MethodCell
                        predictionMethodsMatched={result.predictionMethodsMatched}
                        predictionMethodsNotMatched={result.predictionMethodsNotMatched}
                        rowKey={result.homologGene.id}
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
