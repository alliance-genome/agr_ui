import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';
import numeral from 'numeral';
import ExternalLink from '../../components/externalLink';
import GenomeFeatureViewer from 'genomefeaturecomponent';
import {getTranscriptTypes} from '../../lib/genomeFeatureTypes';
import LoadingSpinner from '../../components/loadingSpinner';
import '../../style.scss';
import HorizontalScroll from '../../components/horizontalScroll';
import {SPECIES} from '../../constants';

class GenomeFeatureWrapper extends Component {

  constructor(props) {
    super(props);
    let apolloServerPrefix = process.env.APOLLO_URL;

    // TODO: this is a hack to fix inconsistencies in JBrowse
    // let trackDataWithHighlight = apolloServerPrefix + 'track/' + encodeURI(this.props.species) + '/' + defaultTrackName + '/' + encodeURI(locationString) + '.json';
    let trackDataWithHighlight = apolloServerPrefix + 'track/' ;
    let variantDataWithHighlight = apolloServerPrefix + 'vcf/' ;

    let geneSymbolUrl = '&lookupSymbol=' + this.props.geneSymbol;
    let externalJBrowsePrefix = process.env.JBROWSE_URL + '/jbrowse/index.html?data=data%2F' + encodeURIComponent(this.props.species);

    let linkBuffer = 1.2;
    let linkLength = this.props.fmax - this.props.fmin;
    let bufferedMin = Math.round(this.props.fmin - (linkLength * linkBuffer / 2.0));
    bufferedMin = bufferedMin < 0 ? 0 : bufferedMin;
    let bufferedMax = Math.round(this.props.fmax + (linkLength * linkBuffer / 2.0));
    let externalLocationString = this.props.chromosome + ':' + bufferedMin + '..' + bufferedMax;
    // TODO: handle bufferedMax exceeding chromosome length, though I think it has a good default.
    const tracks = ['Variants','All Genes'];
    let externalJbrowseUrl = externalJBrowsePrefix +
      '&tracks=' + encodeURIComponent(tracks.join(',')) +
      '&highlight=' + geneSymbolUrl +
      '&loc=' + encodeURIComponent(externalLocationString);


    this.state = {
      loadState: 'loading'
    };

    this.trackDataUrl = trackDataWithHighlight;
    this.variantDataUrl = variantDataWithHighlight;
    this.jbrowseUrl = externalJbrowseUrl;
  }


  componentDidMount() {
    this.loadGenomeFeature();
  }

  getSpeciesString(species){
    return SPECIES.find( s => s.fullName===species).apolloName;
  }

  generateTrackConfig(fmin, fmax, chromosome, species, nameSuffixString,variantFilter) {
    console.log('generating with variant filter',variantFilter);
    let transcriptTypes = getTranscriptTypes();
    if(species==='Saccharomyces cerevisiae' || species ==='Homo sapiens'){
      return {
        'locale': 'global',
        'chromosome':  species==='Saccharomyces cerevisiae' ? 'chr'+chromosome : chromosome ,
        'start': fmin,
        'end': fmax,
        'transcriptTypes':transcriptTypes,
        'tracks': [
          {
            'id': 1,
            'genome': this.getSpeciesString(species),
            'type': 'ISOFORM',
            'url': [
              this.trackDataUrl,
              '/All%20Genes/',
              `.json${nameSuffixString}`
            ]
          },
        ]
      };
    }
    // else
    return {
      'locale': 'global',
      'chromosome': chromosome,
      'start': fmin,
      'end': fmax,
      'showVariantLabel': false,
      'variantFilter': variantFilter ? [variantFilter] : [],
      'tracks': [
        {
          'id': 1,
          'genome': this.getSpeciesString(species),
          'type': 'ISOFORM_AND_VARIANT',
          'isoform_url': [
            this.trackDataUrl,
            '/All%20Genes/',
            `.json${nameSuffixString}`
          ],
          'variant_url': [
            this.variantDataUrl,
            '/Variants/',
            '.json'
          ],

        },
      ]
    };
  }

  loadGenomeFeature() {
    const {chromosome, fmin, fmax, species,id,primaryId,geneSymbol, synonyms = [],variant} = this.props;
    // provide unique names
    let nameSuffix = [geneSymbol, ...synonyms,primaryId].filter((x, i, a) => a.indexOf(x) === i).map( x => encodeURI(x));
    let nameSuffixString = nameSuffix.length ===0 ? '': nameSuffix.join('&name=');
    if (nameSuffixString.length > 0) {
      nameSuffixString = `?name=${nameSuffixString}`;
    }

    // resolved in GenomeFeaturesViewer widget as:
    // var dataUrl = track["url"][0] + encodeURI(track["genome"]) + track["url"][1] + encodeURI(externalLocationString) + track["url"][2];
    //
    // https://agr-apollo.berkeleybop.io/apollo/track/Mus%20musculus/All%20Genes/2:105668900..105697364.json?name=MGI:97490&name=Pax6
    // [0] should be apollo_url: https://agr-apollo.berkeleybop.io/apollo/track
    // [1] should be track name : ALL_Genes
    // [2] should be track name : name suffix string
    const trackConfig = this.generateTrackConfig(fmin,fmax,chromosome,species,nameSuffixString,variant);
    new GenomeFeatureViewer(trackConfig, `#${id}`, 900, undefined);
  }

  render() {
    const {assembly, chromosome, fmin, fmax, id, strand} = this.props;
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

        <HorizontalScroll width={960}>
          <svg id={id}>
            <LoadingSpinner/>
          </svg>
          {this.state.loadState === 'error' ? <div className='text-danger'>Unable to retrieve data</div> : ''}
        </HorizontalScroll>
      </div>
    ) ;
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
  variant: PropTypes.string,
  width: PropTypes.string,
};

export default GenomeFeatureWrapper;
