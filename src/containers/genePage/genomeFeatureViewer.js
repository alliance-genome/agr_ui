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
  species: PropTypes.string.isRequired,
  strand: PropTypes.string,
};

export default GenomeFeatureViewer;
