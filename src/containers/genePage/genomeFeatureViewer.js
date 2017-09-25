/*eslint-disable react/no-set-state */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LoadingPage from '../../components/loadingPage';
import GenomeFeature from '../../components/genomeFeature/GenomeFeature';

class GenomeFeatureViewer extends Component {

  constructor(props) {
    super(props);

    let defaultTrackName = 'All Genes'; // this is the generic track name
    let locationString = this.props.chromosome + ':' + this.props.fmin + '..' + this.props.fmax;

    // TODO: should be process.env.APOLLO_URL
    // let apolloServerPrefix = 'http://demo.genomearchitect.org/Apollo-staging/';
    let apolloServerPrefix = 'http://localhost:8080/apollo/';


    let trackDataPrefix = apolloServerPrefix + 'track/' + encodeURI(this.props.species) + '/' + defaultTrackName + '/' + encodeURI(locationString) + '.json';
    let trackDataWithHighlight = trackDataPrefix + '?name=' + this.props.geneSymbol;
    // trackDataWithHighlight += '&ignoreCache=true';

    let geneSymbolUrl = '&lookupSymbol=' + this.props.geneSymbol;
    let externalJBrowsePrefix = process.env.JBROWSE_URL + '/jbrowse/index.html?data=data%2F' + encodeURI(this.props.species);
    let externalJbrowseUrl = externalJBrowsePrefix + '&tracks=All%20Genes&highlight=' + geneSymbolUrl + '&loc=' + encodeURI(locationString);


    this.state = {
      isLoading: true
    };

    this.trackDataUrl = trackDataWithHighlight;
    this.jbrowseUrl = externalJbrowseUrl;
  }


  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
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


    return (
      <div id='genomeViewer'>
        <div className='row'>
          <div className='col-sm-8'>
            <dl className='row'>
              <dt className='col-sm-3'>Genome Location</dt>
              <dd className='col-sm-9'><a href={this.jbrowseUrl}
                                          rel='noopener noreferrer' target='_blank'>
                Chr{this.props.chromosome}:{this.props.fmin}...{this.props.fmax} {this.props.assembly} {this.props.strand} </a>
                &nbsp;
                <a href={this.trackDataUrl}>[json]</a>
              </dd>
            </dl>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <a href={this.jbrowseUrl} rel='noopener noreferrer'
               target='_blank' title='Browse Genome'>
              {
                this.state.isLoading
                  ? <LoadingPage/> :
                  <div>
                    <GenomeFeature data={this.state.loadedData}
                                   height={this.props.height}
                                   id={this.props.id}
                                   url={this.externalJBrowseUrl}
                                   width={this.props.width}
                    />
                  </div>
              }
            </a>
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
