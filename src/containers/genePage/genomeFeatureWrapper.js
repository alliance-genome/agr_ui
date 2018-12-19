/*eslint-disable react/no-set-state */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';
// import GenomeFeature from '../../components/genomeFeature/GenomeFeature';
import numeral from 'numeral';
// import {getTranscriptTypes} from '../../lib/genomeFeatureTypes';
import ExternalLink from '../../components/externalLink';
import LoadingSpinner from '../../components/loadingSpinner';
import GenomeFeatureViewer from 'genomefeaturecomponent';
import {getTranscriptTypes} from '../../lib/genomeFeatureTypes';

class GenomeFeatureWrapper extends Component {

  constructor(props) {
    super(props);

    // this.featureTypeHandler = new FeatureTypeHandler();

    let defaultTrackName = 'All Genes'; // this is the generic track name
    let locationString = this.props.chromosome + ':' + this.props.fmin + '..' + this.props.fmax;
    let apolloServerPrefix = process.env.APOLLO_URL;

    // TODO: this is a hack to fix inconsistencies in JBrowse
    let trackDataWithHighlight = apolloServerPrefix + 'track/' + encodeURI(this.props.species) + '/' + defaultTrackName + '/' + encodeURI(locationString) + '.json';
    let names = [];
    if (this.props.primaryId.indexOf(':') > 0) {
      names.push(this.props.primaryId.split(':')[1]);
    }
    names.push(this.props.geneSymbol);


    if (this.props.synonyms) {
      for (let syn of this.props.synonyms) {
        names.push(syn);
      }
    }

    for (let name in names) {
      trackDataWithHighlight = trackDataWithHighlight + (Number.parseInt(name) === 0 ? '?' : '&') + 'name=' + encodeURI(names[name]);
    }


    // TODO: Still some inconsistencies with SGD data
    // else
    // trackDataWithHighlight += '&ignoreCache=true';

    let geneSymbolUrl = '&lookupSymbol=' + this.props.geneSymbol;
    let externalJBrowsePrefix = process.env.JBROWSE_URL + '/jbrowse/index.html?data=data%2F' + encodeURI(this.props.species);

    let linkBuffer = 1.2;
    let linkLength = this.props.fmax - this.props.fmin;
    let bufferedMin = Math.round(this.props.fmin - (linkLength * linkBuffer / 2.0));
    bufferedMin = bufferedMin < 0 ? 0 : bufferedMin;
    let bufferedMax = Math.round(this.props.fmax + (linkLength * linkBuffer / 2.0));
    let externalLocationString = this.props.chromosome + ':' + bufferedMin + '..' + bufferedMax;
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
    this.loadGenomeFeature();
  }

  componentDidUpdate() {
    this.loadGenomeFeature();
  }

  loadData() {
    this.setState({loadState: 'loading'});
    // this.transcriptTypes = getTranscriptTypes();
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
        this.setState({
          loadState: 'error'
        });
      });
  }


  render() {
    const {assembly, chromosome, fmin, fmax, strand} = this.props;
    const lengthValue = numeral((fmax - fmin) / 1000.0).format('0,0.00');

    return (
      <div id='genomeViewer'>
        <AttributeList>
          <AttributeLabel>Genome location</AttributeLabel>
          <AttributeValue>
            <ExternalLink href={this.jbrowseUrl}>
              {chromosome.toLowerCase().startsWith('chr') ? chromosome : 'Chr' + chromosome}:{fmin}...{fmax}
            </ExternalLink> {strand} ({lengthValue} kb)
          </AttributeValue>

          <AttributeLabel>Assembly version</AttributeLabel>
          <AttributeValue>{assembly}</AttributeValue>
        </AttributeList>
        <div className='row'>
          <div className='col-12'>
            <a
              href={this.jbrowseUrl} rel='noopener noreferrer'
              target='_blank' title='Browse Genome'
            >
              {this.state.loadState === 'loading' ? <LoadingSpinner/> : ''}
              <div id={this.props.id}>LOAD HERE</div>
            </a>
            {this.state.loadState === 'error' ? <div className='text-danger'>Unable to retrieve data</div> : ''}
          </div>
        </div>
      </div>
    ) ;
  }


  loadGenomeFeature() {
    const {chromosome, fmin, fmax, geneSymbol, synonyms} = this.props;
    let nameSuffix = [geneSymbol, ...synonyms];
    let nameSuffixString = nameSuffix.join('&name=');
    if (nameSuffixString.length > 0) {
      nameSuffixString = `?name=${nameSuffixString}`;
    }

    const configGlobal = {
      'locale': 'global',
      'chromosome': chromosome,
      'start': fmin,
      'end': fmax,
      'transcriptTypes':getTranscriptTypes,
      'tracks': [
        {
          'id': 1,
          'genome': this.props.species,
          'type': 'isoform',
          'url': [
            process.env.APOLLO_URL + '/track/',
            '/All%20Genes/',
            `.json${nameSuffixString}`
          ]
        },
      ]
    };
    new GenomeFeatureViewer(configGlobal, `#${this.props.id}`, 700, 500);
  }
}

GenomeFeatureWrapper.propTypes = {
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
  synonyms: PropTypes.array,
  width: PropTypes.string,
};

export default GenomeFeatureWrapper;
