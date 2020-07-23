import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';
import numeral from 'numeral';
import ExternalLink from '../../components/externalLink';
import GenomeFeatureViewer from 'agr_genomefeaturecomponent';
import {getTranscriptTypes} from '../../lib/genomeFeatureTypes';
import LoadingSpinner from '../../components/loadingSpinner';
import '../../style.scss';
import HorizontalScroll from '../../components/horizontalScroll';
import {SPECIES} from '../../constants';
import HelpPopup from '../../components/helpPopup';
import isEqual from 'lodash.isequal';

import style from './style.scss';

const APOLLO_SERVER_PREFIX = '/apollo/';
const LINK_BUFFER = 1.2;

class GenomeFeatureWrapper extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loadState: 'loading'
    };

    this.trackDataUrl = APOLLO_SERVER_PREFIX + 'track/';
    this.variantDataUrl = APOLLO_SERVER_PREFIX + 'vcf/';
  }


  componentDidMount() {
    this.loadGenomeFeature();
    this.generateJBrowseLink();
  }

  componentDidUpdate(prevProps) {
    if (this.props.primaryId !== prevProps.primaryId) {
      this.loadGenomeFeature();
      this.generateJBrowseLink();
      this.gfc.setSelectedAlleles(this.props.allelesSelected!==undefined ? this.props.allelesSelected:[],`#${this.props.id}`);
    }
    else
    if(!isEqual(prevProps.allelesSelected,this.props.allelesSelected) && this.props.allelesSelected!==undefined) {
      this.gfc.setSelectedAlleles(this.props.allelesSelected.map( a => a.id),`#${this.props.id}`);
    }
    else
    if(!isEqual(prevProps.visibleVariants,this.props.visibleVariants)) {
      this.loadGenomeFeature();
    }
  }

  componentWillUnmount() {
    this.gfc.closeModal();
  }

  generateJBrowseLink() {
    const geneSymbolUrl = '&lookupSymbol=' + this.props.geneSymbol;
    const externalJBrowsePrefix = '/jbrowse/?' + 'data=data%2F' + encodeURIComponent(this.getSpeciesConstantForTaxon(this.props.species).apolloName);
    const linkLength = this.props.fmax - this.props.fmin;
    let bufferedMin = Math.round(this.props.fmin - (linkLength * LINK_BUFFER / 2.0));
    bufferedMin = bufferedMin < 0 ? 0 : bufferedMin;
    const bufferedMax = Math.round(this.props.fmax + (linkLength * LINK_BUFFER / 2.0));
    const externalLocationString = this.props.chromosome + ':' + bufferedMin + '..' + bufferedMax;
    // TODO: handle bufferedMax exceeding chromosome length, though I think it has a good default.
    const tracks = ['Variants', 'All Genes'];
    this.jbrowseUrl = externalJBrowsePrefix +
      '&tracks=' + encodeURIComponent(tracks.join(',')) +
      '&highlight=' + geneSymbolUrl +
      '&loc=' + encodeURIComponent(externalLocationString);
  }

  getSpeciesConstantForTaxon(species) {
    // short-name is for SARS only
    return SPECIES.find(s => (s.taxonId === species));
  }

  generateTrackConfig(fmin, fmax, chromosome, species, nameSuffixString, variantFilter, displayType) {
    let transcriptTypes = getTranscriptTypes();
    const speciesInfo = this.getSpeciesConstantForTaxon(species);
    const apolloPrefix = speciesInfo.apolloName;
    if (displayType === 'ISOFORM') {
      return {
        'locale': 'global',
        'chromosome': apolloPrefix==='yeast' ? 'chr' +chromosome : chromosome,
        'start': fmin,
        'end': fmax,
        'transcriptTypes': transcriptTypes,
        'tracks': [
          {
            'id': 1,
            'genome': apolloPrefix,
            'type': 'ISOFORM',
            'url': [
              this.trackDataUrl,
              '/All%20Genes/',
              `.json${nameSuffixString}`
            ]
          },
        ]
      };
    } else if (displayType === 'ISOFORM_AND_VARIANT') {
      return {
        'locale': 'global',
        'chromosome': chromosome,
        'start': fmin,
        'end': fmax,
        'showVariantLabel': false,
        'variantFilter': variantFilter ? variantFilter : [],
        'visibleVariants': undefined,
        'binRatio': 0.01,
        'transcriptTypes': transcriptTypes,
        'tracks': [
          {
            'id': 1,
            'genome': apolloPrefix,
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
    } else {
      // eslint-disable-next-line no-console
      console.error('Undefined displayType', displayType);
    }
  }

  loadGenomeFeature() {
    const {chromosome, fmin, fmax, species, id, primaryId, geneSymbol, displayType, synonyms = [], visibleVariants} = this.props;
    // provide unique names
    let nameSuffix = [geneSymbol, ...synonyms, primaryId].filter((x, i, a) => a.indexOf(x) === i).map(x => encodeURI(x));
    let nameSuffixString = nameSuffix.length === 0 ? '' : nameSuffix.join('&name=');
    if (nameSuffixString.length > 0) {
      nameSuffixString = `?name=${nameSuffixString}`;
    }

    // resolved in GenomeFeaturesViewer widget as:
    // var dataUrl = track["url"][0] + encodeURI(track["genome"]) + track["url"][1] + encodeURI(externalLocationString) + track["url"][2];
    // https://agr-apollo.berkeleybop.io/apollo/track/Mus%20musculus/All%20Genes/2:105668900..105697364.json?name=MGI:97490&name=Pax6
    // [0] should be apollo_url: https://agr-apollo.berkeleybop.io/apollo/track
    // [1] should be track name : ALL_Genes
    // [2] should be track name : name suffix string
    // const visibleVariants = allelesVisible && allelesVisible.length>0 ? allelesVisible.map( a => a.id ) : undefined;
    const trackConfig = this.generateTrackConfig(fmin, fmax, chromosome, species, nameSuffixString, visibleVariants, displayType);
    this.gfc = new GenomeFeatureViewer(trackConfig, `#${id}`, 900, undefined);
    this.helpText = this.gfc.generateLegend();
  }

  render() {
    const {assembly, chromosome, fmin, fmax, id, strand, displayType} = this.props;
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
          <AttributeValue>{assembly}
          </AttributeValue>
        </AttributeList>

        <HorizontalScroll width={960}>
          <div>
            <svg id={id}>
              <LoadingSpinner/>
            </svg>
          </div>
          {displayType === 'ISOFORM_AND_VARIANT' &&
          <div>
            <span className='mr-1'>Variant Types and Consequences</span>
            <HelpPopup
              id='variant-legend'
              placement='bottom-start'
              popperClassName={style.variantLegendPopper}
            >
              <span dangerouslySetInnerHTML={{__html: this.helpText}}/>
            </HelpPopup>
          </div>
          }
          {this.state.loadState === 'error' ?
            <div className='text-danger'>Unable to retrieve data</div> : ''}
        </HorizontalScroll>
      </div>
    );
  }


}

GenomeFeatureWrapper.propTypes = {
  allelesSelected: PropTypes.array,
  assembly: PropTypes.string,
  biotype: PropTypes.string,
  chromosome: PropTypes.string,
  displayType: PropTypes.string,
  fmax: PropTypes.number,
  fmin: PropTypes.number,
  geneSymbol: PropTypes.string.isRequired,
  height: PropTypes.string,
  id: PropTypes.string,
  primaryId: PropTypes.string,
  species: PropTypes.string.isRequired,
  strand: PropTypes.string,
  synonyms: PropTypes.array,
  visibleVariants: PropTypes.array,
  width: PropTypes.string,
};

export default GenomeFeatureWrapper;
