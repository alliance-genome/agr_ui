/*eslint-disable react/no-set-state */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LoadingPage from '../../components/loadingPage';
import GenomeFeatureComponent from 'genomefeaturecomponent';


class GenomeFeatureViewer extends Component {

  constructor(props) {
    super(props);

    let defaultTrackName = 'All Genes';
    let locationString = this.props.chromosome + ':' + this.props.fmin + '..' + this.props.fmax;

    let apolloServerPrefix = 'http://demo.genomearchitect.org/Apollo-staging/';
    // let apolloServerPrefix = 'http://localhost:8080/apollo/';


    let trackDataPrefix = apolloServerPrefix + 'track/' + encodeURI(this.props.species) + '/' + defaultTrackName + '/' + encodeURI(locationString) + '.json';
    let trackDataWithHighlight = trackDataPrefix + '?name=' + this.props.geneSymbol;

    let geneSymbolUrl = '&lookupSymbol=' + this.props.geneSymbol;
    let externalJBrowsePrefix = process.env.JBROWSE_URL + '/jbrowse/index.html?data=data%2F' + encodeURI(this.props.species);
    let externalJbrowseUrl = externalJBrowsePrefix + '&tracks=All%20Genes&highlight=' + geneSymbolUrl;


    this.state = {
      isLoading: true
    };

    this.trackDataUrl = trackDataWithHighlight;
    this.jbrowseUrl = externalJbrowseUrl;
  }

  // handleImageErrored() {
  //   this.setState({imageStatus: 'Error loading transcript preview.'});
  // }
  //
  // handleImageLoaded() {
  //   this.setState({imageStatus: ''});
  // }

  componentDidMount() {
    this.loadData();
    // this.props.dispatch(fetchGene(this.props.params.geneId));
  }

  componentDidUpdate() {
    // if (this.props.params.geneId !== prevProps.params.geneId) {
    //   this.props.dispatch(fetchGene(this.props.params.geneId));
    // }
  }

  loadData() {
    this.setState({isLoading: true});

    fetch(this.trackDataUrl)
      .then((response) => {
        response.json().then(data => {
          this.setState({
            isLoading: false
            , loadedData: data
          });
          return data;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    // jbrowseUrl = "http://demo.genomearchitect.org/Apollo-staging/Honeybee/jbrowse/index.html?loc=Group1.1:329115..330633&tracks=Official%20Gene%20Set%20v3.2";
    // dataUrl = "http://demo.genomearchitect.org/Apollo-staging/track/Honeybee/Official%20Gene%20Set%20v3.2/Group1.1/GB42168-RA.json";
    let testData = [{ 'strand': 1, 'children': [{'phase': 0, 'strand': 1, 'fmin': 204920, 'type': 'CDS', 'fmax': 205070}, { 'phase': 0, 'strand': 1, 'fmin': 222771, 'type': 'CDS', 'fmax': 222858 }, {'strand': 1, 'fmin': 222858, 'type': 'three_prime_UTR', 'fmax': 223005}, { 'strand': 1, 'fmin': 204920, 'type': 'exon', 'fmax': 205070 }, {'strand': 1, 'fmin': 222771, 'type': 'exon', 'fmax': 223005}], 'name': 'GB42165-RA', 'id': 'http://icebox.lbl.gov/Apollo-staging/track/Honeybee/Official Gene Set v3.2/Group1.1/GB42165-RA.json', 'fmin': 204920, 'type': 'mRNA', 'fmax': 223005 }, { 'strand': -1, 'children': [[{'phase': 0, 'strand': -1, 'fmin': 229546, 'type': 'CDS', 'fmax': 229565}, { 'phase': 2, 'strand': -1, 'fmin': 227354, 'type': 'CDS', 'fmax': 227568 }, {'phase': 1, 'strand': -1, 'fmin': 226993, 'type': 'CDS', 'fmax': 227269}, { 'phase': 1, 'strand': -1, 'fmin': 226643, 'type': 'CDS', 'fmax': 226926 }, {'phase': 0, 'strand': -1, 'fmin': 226442, 'type': 'CDS', 'fmax': 226564}, { 'phase': 1, 'strand': -1, 'fmin': 226132, 'type': 'CDS', 'fmax': 226359 }, {'phase': 2, 'strand': -1, 'fmin': 225990, 'type': 'CDS', 'fmax': 226060}, { 'phase': 1, 'strand': -1, 'fmin': 225857, 'type': 'CDS', 'fmax': 225913 }, {'phase': 2, 'strand': -1, 'fmin': 225685, 'type': 'CDS', 'fmax': 225772}, { 'phase': 2, 'strand': -1, 'fmin': 225387, 'type': 'CDS', 'fmax': 225577 }, {'phase': 1, 'strand': -1, 'fmin': 216954, 'type': 'CDS', 'fmax': 217046}, { 'phase': 2, 'strand': -1, 'fmin': 215398, 'type': 'CDS', 'fmax': 215433 }, {'phase': 0, 'strand': -1, 'fmin': 213731, 'type': 'CDS', 'fmax': 213905}, { 'strand': -1, 'fmin': 230453, 'type': 'five_prime_UTR', 'fmax': 230560 }, {'strand': -1, 'fmin': 229565, 'type': 'five_prime_UTR', 'fmax': 229635}, { 'strand': -1, 'fmin': 212881, 'type': 'three_prime_UTR', 'fmax': 213731 }, {'strand': -1, 'fmin': 212881, 'type': 'exon', 'fmax': 213905}, { 'strand': -1, 'fmin': 215398, 'type': 'exon', 'fmax': 215433 }, {'strand': -1, 'fmin': 216954, 'type': 'exon', 'fmax': 217046}, { 'strand': -1, 'fmin': 225387, 'type': 'exon', 'fmax': 225577 }, {'strand': -1, 'fmin': 225685, 'type': 'exon', 'fmax': 225772}, { 'strand': -1, 'fmin': 225857, 'type': 'exon', 'fmax': 225913 }, {'strand': -1, 'fmin': 225990, 'type': 'exon', 'fmax': 226060}, { 'strand': -1, 'fmin': 226132, 'type': 'exon', 'fmax': 226359 }, {'strand': -1, 'fmin': 226442, 'type': 'exon', 'fmax': 226564}, { 'strand': -1, 'fmin': 226643, 'type': 'exon', 'fmax': 226926 }, {'strand': -1, 'fmin': 226993, 'type': 'exon', 'fmax': 227269}, { 'strand': -1, 'fmin': 227354, 'type': 'exon', 'fmax': 227568 }, {'strand': -1, 'fmin': 229546, 'type': 'exon', 'fmax': 229635}, { 'strand': -1, 'fmin': 230453, 'type': 'exon', 'fmax': 230560 }]], 'name': 'GB42161-RA', 'id': 'http://demo.genomearchitect.org/Apollo2/track/Honeybee/Official Gene Set v3.2/Group1.1/GB42161-RA.json', 'fmin': 212881, 'type': 'mRNA', 'fmax': 230560 }];
    if(!this.state.isLoading){
      console.log(testData);
      console.log(this.state.loadedData);
    }


    return (
      <div id='genomeViewer'>
        <div className='row'>
          <div className='col-sm-8'>
            <dl className='row'>
              <dt className='col-sm-3'>Genome Location</dt>
              <dd className='col-sm-9'><a href={this.jbrowseUrl}
                                          rel='noopener noreferrer' target='_blank'>
                Chr{this.props.chromosome}:{this.props.fmin}...{this.props.fmax} {this.props.assembly} {this.props.strand} </a>
              </dd>
            </dl>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <ul>

              <li>
                <a href={this.trackDataUrl}>{this.trackDataUrl}</a>
              </li>
              <li>
                <a href={this.jbrowseUrl}>{this.jbrowseUrl}</a>
              </li>
              <li>
                <a href={this.jbrowseUrl} rel='noopener noreferrer'
                   target='_blank' title='Browse Genome'>
                  {
                    this.state.isLoading
                      ? <LoadingPage/> :
                      <div>
                        <GenomeFeatureComponent data={this.state.loadedData}
                                                height={this.props.height}
                                                id={this.props.id}
                                                width={this.props.width}
                        />
                      </div>
                  }
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
      ;
  }


}

GenomeFeatureViewer.propTypes = {
  assembly: PropTypes.string,
  chromosome: PropTypes.string,
  fmax: PropTypes.number,
  fmin: PropTypes.number,
  geneSymbol: PropTypes.string.isRequired,
  height: PropTypes.string,
  id: PropTypes.string,
  species: PropTypes.string.isRequired,
  strand: PropTypes.string,
  width: PropTypes.string,
};

export default GenomeFeatureViewer;
