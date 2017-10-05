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
    let apolloServerPrefix = 'https://agr-apollo.berkeleybop.io/apollo/';
    // let apolloServerPrefix = 'http://localhost:8080/apollo/';


    // TODO: this is a hack to fix inconsistencies in JBrowse
    let trackDataPrefix = apolloServerPrefix + 'track/' + encodeURI(this.props.species) + '/' + defaultTrackName + '/' + encodeURI(locationString) + '.json';
    let trackDataWithHighlight = trackDataPrefix + '?name=' + this.props.geneSymbol;
    // trackDataWithHighlight += '&ignoreCache=true';

    let geneSymbolUrl = '&lookupSymbol=' + this.props.geneSymbol;
    let externalJBrowsePrefix = process.env.JBROWSE_URL + '/jbrowse/index.html?data=data%2F' + encodeURI(this.props.species);

    let linkBuffer = 0.2;
    let linkLength = this.props.fmax - this.props.fmin ;
    let bufferedMin = Math.round(this.props.fmin - (linkLength * linkBuffer/2.0));
    let bufferedMax = Math.round(this.props.fmax + (linkLength * linkBuffer/2.0));
    let externalLocationString = this.props.chromosome + ':' + bufferedMin + '..' + bufferedMax;
    bufferedMin = bufferedMin < 0 ? 0 : bufferedMin;
    // TODO: handle bufferedMax exceeding chromosome length, though I think it has a good default.
    let externalJbrowseUrl = externalJBrowsePrefix + '&tracks=All%20Genes&highlight=' + geneSymbolUrl + '&loc=' + encodeURI(externalLocationString);


    this.state = {
      loadState: 'loading'
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
    this.setState({loadState: 'loading'});

    fetch(this.trackDataUrl)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => {
        response.json().then(data => {
          this.setState({
            loadState: 'loaded'
            , loadedData: data
          });
          return data;
        });
      })
      .catch(() => {
        // console.log(error);
        this.setState({
          loadState: 'error'
        });
      });
  }


  render() {


    return (
      <div id='genomeViewer'>
        <div className='row'>
          <div className='col-sm-8'>
            <dl className='row'>
              <dt className='col-sm-3'>Genome Location</dt>
              <dd className='col-sm-9'><a href={this.jbrowseUrl} rel='noopener noreferrer' target='_blank'>
                {this.props.chromosome.toLowerCase().startsWith('chr') ? this.props.chromosome : 'Chr' + this.props.chromosome}:{this.props.fmin}...{this.props.fmax} </a>
                &nbsp;
                &nbsp;
                &nbsp;
                {/*<a href={this.trackDataUrl}>[json]</a>*/}
                {this.props.assembly} {this.props.strand}
                &nbsp;
                ({(this.props.fmax-this.props.fmin)/1000.0} kb)
              </dd>
            </dl>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <a href={this.jbrowseUrl} rel='noopener noreferrer'
               target='_blank' title='Browse Genome'
            >
              {this.state.loadState == 'loading' ? <LoadingPage/> : ''}
              {this.state.loadState == 'loaded' ? <GenomeFeature data={this.state.loadedData}
                                                                 height={this.props.height}
                                                                 id={this.props.id}
                                                                 url={this.externalJBrowseUrl}
                                                                 width={this.props.width}
              /> : ''}
            </a>
            {this.state.loadState == 'error' ? <div className='text-danger'>Unable to retrieve data</div> : ''}
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
