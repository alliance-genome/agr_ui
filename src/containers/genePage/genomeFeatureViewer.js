/*eslint-disable react/no-set-state */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';
import LoadingPage from '../../components/loadingPage';
import GenomeFeature from '../../components/genomeFeature/GenomeFeature';
import numeral from 'numeral';

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
    let trackDataWithHighlight;
    if (this.props.species == 'Caenorhabditis elegans' && this.props.primaryId.indexOf(':') > 0) {
      trackDataWithHighlight = trackDataPrefix + '?name=' + this.props.primaryId.split(':')[1];
    }
    else {
      trackDataWithHighlight = trackDataPrefix + '?name=' + this.props.geneSymbol;
    }
// TODO: Still some inconsistencies with SGD data
// else
    // trackDataWithHighlight += '&ignoreCache=true';

    let geneSymbolUrl = '&lookupSymbol=' + this.props.geneSymbol;
    let externalJBrowsePrefix = process.env.JBROWSE_URL + '/jbrowse/index.html?data=data%2F' + encodeURI(this.props.species);

    let linkBuffer = 1.2;
    let linkLength = this.props.fmax - this.props.fmin;
    let bufferedMin = Math.round(this.props.fmin - (linkLength * linkBuffer / 2.0));
    let bufferedMax = Math.round(this.props.fmax + (linkLength * linkBuffer / 2.0));
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

  isCodingType(){
    let proteinCodingTypes = [
      'gene'
      ,'protein_coding_gene'
      ,'protein_coding'
    ];
    return proteinCodingTypes.indexOf(this.props.biotype)>=0 ;
  }

  loadData() {
    if(!this.isCodingType()){
      this.setState({loadState: 'noncoding'});
    }
    else{
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

  }



  render() {
    const {assembly, chromosome, fmin, fmax, strand} = this.props;
    const lengthValue = numeral((fmax - fmin) / 1000.0).format('0,0.00');

    return (
      <div id='genomeViewer'>
        <AttributeList>
          <AttributeLabel>Genome location</AttributeLabel>
          <AttributeValue>
            <a href={this.jbrowseUrl} rel='noopener noreferrer' target='_blank'>
              {chromosome.toLowerCase().startsWith('chr') ? chromosome : 'Chr' + chromosome}:{fmin}...{fmax}
            </a> {strand} ({lengthValue} kb)
          </AttributeValue>

          <AttributeLabel>Assembly version</AttributeLabel>
          <AttributeValue>{assembly}</AttributeValue>
        </AttributeList>
        <div className='row'>
          <div className='col-xs-12'>
            <a href={this.jbrowseUrl} rel='noopener noreferrer'
               target='_blank' title='Browse Genome'
            >
              {this.state.loadState == 'loading' ? <LoadingPage /> : ''}
              {this.state.loadState == 'loaded' ? <GenomeFeature data={this.state.loadedData}
                                                                 height={this.props.height}
                                                                 id={this.props.id}
                                                                 url={this.externalJBrowseUrl}
                                                                 width={this.props.width}
                                                  /> : ''}
            </a>
            {this.state.loadState == 'error' ? <div className='text-danger'>Unable to retrieve data</div> : ''}
            {this.state.loadState == 'noncoding' ? <div className='text-warning'>Overview for non-coding genes unavailable</div> : ''}
          </div>
        </div>
      </div>
    )
      ;
  }


}

GenomeFeatureViewer.propTypes = {
  assembly: PropTypes.string,
  biotype: PropTypes.string,
  chromosome: PropTypes.string,
  fmax: PropTypes.number,
  fmin: PropTypes.number,
  geneSymbol: PropTypes.string.isRequired,
  height: PropTypes.string,
  id: PropTypes.string,
  primaryId: PropTypes.string,
  species: PropTypes.string.isRequired,
  strand: PropTypes.string,
  width: PropTypes.string,
};

export default GenomeFeatureViewer;
