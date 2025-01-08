import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';
import numeral from 'numeral';
import ExternalLink from '../../components/ExternalLink';
import GenomeFeatureViewer from 'agr_genomefeaturecomponent';
import {getTranscriptTypes} from '../../lib/genomeFeatureTypes';
import LoadingSpinner from '../../components/loadingSpinner';
import HorizontalScroll from '../../components/horizontalScroll';
import HelpPopup from '../../components/helpPopup';
import isEqual from 'lodash.isequal';
import CommaSeparatedList from '../../components/commaSeparatedList';
import {select} from 'd3-selection';

import style from './style.module.scss';
import {
  getSpecies,
  getSingleGenomeLocation,
} from '../../lib/utils';

import SequenceFeatureViewerSubsectionHelp from '../../components/sequenceFeatureViewer/sequenceFeatureViewerSubsectionHelp';

const APOLLO_SERVER_PREFIX = '/apollo/';
const LINK_BUFFER = 1.2;
//is this needed?
// const helpSequenceViewer = 'The Allele/Variant Sequence Viewer shows the positions of allele-associated variants, where this data exists, in the context of the transcripts for the gene. Since the viewer is showing the genomic positions, alleles where the genomic location of the alteration is not known currently will not be displayed in the viewer. Polymorphisms determined by whole genome or whole exon sequencing are also not shown in this view due to the overwhelming number of these variants. To view these, use the link to the Alliance JBrowse below the viewer.';



class GenomeFeatureWrapper extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loadState: 'loading',
      helpText: ''
    };

    this.trackDataUrl = APOLLO_SERVER_PREFIX + 'track/';
    this.variantDataUrl = APOLLO_SERVER_PREFIX + 'vcf/';
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {

    const {id}= event.target;
    if(!id || id === `${this.props.id}` || typeof this.props.onAllelesSelect === 'undefined'){return;}
    let clickedAlleles = select(`#${this.props.id}`).select(`#${id}`).data()[0].alleles;
    let currentAlleles = this.props.allelesSelected.map( a => a.id);
    //If one or more clicked alleles are currently selected.
    if(currentAlleles.filter(d => clickedAlleles.includes(d)).length > 0){
      clickedAlleles.forEach(function(element){
        let index = currentAlleles.indexOf(element);
        if (index !== -1) {
          currentAlleles.splice(index, 1);
        }
      });
      this.props.onAllelesSelect(currentAlleles);
    }
    else{
      this.props.onAllelesSelect(clickedAlleles.concat(currentAlleles));
    }
  }

  componentDidMount() {
    this.loadGenomeFeature();
  }

  componentDidUpdate(prevProps) {
    if (this.props.primaryId !== prevProps.primaryId) {
      this.loadGenomeFeature();
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

  generateJBrowseLink(chr, start, end, htpVariant) {
    //const geneSymbolUrl = '&lookupSymbol=' + this.props.geneSymbol;
    //  maybe will use this ^^^ haven't decided
    const assembly = (getSpecies(this.props.species).jBrowseName).replace(" ","_");
    var externalJBrowsePrefix = '/jbrowse2?tracklist=true&assembly=' + assembly;

	  //  htpVariant is a loc string of the format 'chr:start' for a variant
    if (htpVariant) {
        const pieces  = htpVariant.split(':');
        externalJBrowsePrefix = externalJBrowsePrefix + '&highlight=' + pieces[0] + ':' + pieces[1] + '-' + pieces[1];
    }

    const linkLength = end - start;
    let bufferedMin = Math.round(start - (linkLength * LINK_BUFFER / 2.0));
    bufferedMin = bufferedMin < 0 ? 0 : bufferedMin;
    const bufferedMax = Math.round(end + (linkLength * LINK_BUFFER / 2.0));
    if(this.props.species === 'NCBITaxon:8355' && !chr.toLowerCase().startsWith('chr') && !chr.toLowerCase().startsWith('scaffold')){
      chr = 'chr' + chr;
    }
    const externalLocationString = chr + ':' + bufferedMin + '..' + bufferedMax;
    // TODO: handle bufferedMax exceeding chromosome length, though I think it has a good default.
    const tracks = [];
    const trackList = getSpecies(this.props.species).jBrowsetracks.split(',');
    for (const track of trackList) {
        tracks.push( assembly + track );
    }
    return externalJBrowsePrefix +
      '&tracks=' + tracks.join(',') +
      '&loc=' + encodeURIComponent(externalLocationString);
  }

  generateTrackConfig(fmin, fmax, chromosome, species, nameSuffixString, variantFilter, displayType,isoformFilter,htpVariant,allelesSelected) {
    let transcriptTypes = getTranscriptTypes();
    const speciesInfo = getSpecies(species);
    const apolloPrefix = speciesInfo.apolloName;
    if(species === 'NCBITaxon:2697049'){
      const padding = Math.round((fmax-fmin)*0.2);
      fmin = (fmin - padding) > 1 ? fmin - padding : 1;
      fmax = (fmax + padding);
    }
    if (displayType === 'ISOFORM') {
      return {
        'locale': 'global',
        'chromosome': (apolloPrefix==='yeast' || (apolloPrefix==='x_laevis' && !(chromosome.startsWith('Scaffold')))) ? 'chr' +chromosome : chromosome,
        'start': fmin,
        'end': fmax,
        'transcriptTypes': transcriptTypes,
        'htpVariant': htpVariant ? htpVariant : '',
        'tracks': [
          {
            'id': 1,
            'genome': apolloPrefix,
            'type': 'ISOFORM',
            'url': [
              this.trackDataUrl,
              speciesInfo.apolloTrack,
              `.json${nameSuffixString}&ignoreCache=true${speciesInfo.suppressFlatten ? '&flatten=false' : ''}`
            ]
          },
        ]
      };
    } else if (displayType === 'ISOFORM_AND_VARIANT') {
      return {
        'locale': 'global',
        'chromosome': (apolloPrefix==='yeast' || (apolloPrefix==='x_laevis' && !(chromosome.startsWith('Scaffold')))) ? 'chr' +chromosome : chromosome,
        'start': fmin,
        'end': fmax,
        'showVariantLabel': false,
        'variantFilter': variantFilter ? variantFilter : [],
        'isoformFilter': isoformFilter ? isoformFilter : [],
        'initialHighlight' : allelesSelected ? allelesSelected.map( a => a.id) : [],
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
    const {chromosome, fmin, fmax, species, id, primaryId, geneSymbol, displayType, synonyms = [], visibleVariants,isoformFilter,htpVariant,allelesSelected} = this.props;

    // provide unique names
    let nameSuffix = [geneSymbol, ...synonyms, primaryId].filter((x, i, a) => a.indexOf(x) === i).map(x => encodeURI(x));
    if(getSpecies(species).apolloName==='SARS-CoV-2'){
      if(primaryId && primaryId.indexOf(':')>0){
        const baseId = primaryId.split(':')[1];
        nameSuffix.push(baseId);
        // add accession IDs as well
        nameSuffix.push(baseId+'.0');
        nameSuffix.push(baseId+'.1');
        nameSuffix.push(baseId+'.2');
        nameSuffix.push(baseId+'.3');
      }
    }
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
    const trackConfig = this.generateTrackConfig(fmin, fmax, chromosome, species, nameSuffixString, visibleVariants, displayType,isoformFilter,htpVariant,allelesSelected);
    this.gfc = new GenomeFeatureViewer(trackConfig, `#${id}`, 900, undefined);
    console.log('genome feature viewer',this.gfc);
    this.setState({
      helpText: this.gfc.generateLegend()
    });
  }

  render() {
    const {assembly, id, displayType,genomeLocationList,htpVariant} = this.props;
    const genomeLocation = getSingleGenomeLocation(genomeLocationList);

    const coordinates = genomeLocationList.map(location => {
	    //htpVariant contains location of variant info; can use that to set hightlight
      return(
        <span key={location.chromosome+location.start+location.end}>
          <ExternalLink href={this.generateJBrowseLink(location.chromosome,location.start,location.end,htpVariant)}>
            {location.chromosome.toLowerCase().startsWith('chr') || location.chromosome.toLowerCase().startsWith('scaffold') ? location.chromosome : 'Chr' + location.chromosome}:{location.start}...{location.end}
          </ExternalLink> {location.strand} ({numeral((location.end - location.start) / 1000.0).format('0,0.00')} kb)
        </span>
      );
    });

    return (
      <div id='genomeViewer'>
        <AttributeList>
          <AttributeLabel>Genome location</AttributeLabel>
          <AttributeValue>
            <CommaSeparatedList>{coordinates}</CommaSeparatedList>
          </AttributeValue>
          <AttributeLabel>Assembly version</AttributeLabel>
          <AttributeValue>{assembly}
          </AttributeValue>
          <AttributeLabel>Viewer Help
            </AttributeLabel>
          <HelpPopup id='sequence-feature-viewer-subsection-help'>
            <SequenceFeatureViewerSubsectionHelp />
          </HelpPopup>
        </AttributeList>

        <HorizontalScroll width={960}>
          <div>
            <svg id={id} onClick={this.handleClick}>
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
              <span dangerouslySetInnerHTML={{__html: this.state.helpText}}/>
            </HelpPopup>
            <i className="text-muted d-block mt-1">Only variants associated to alleles are shown in the graphics above. See all variants in <ExternalLink href={this.generateJBrowseLink(genomeLocation.chromosome,genomeLocation.start,genomeLocation.end)}>JBrowse</ExternalLink>.</i>
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
  genomeLocationList: PropTypes.array,
  height: PropTypes.string,
  htpVariant: PropTypes.string,
  id: PropTypes.string,
  isoformFilter: PropTypes.array,
  primaryId: PropTypes.string,
  species: PropTypes.string.isRequired,
  strand: PropTypes.string,
  synonyms: PropTypes.array,
  visibleVariants: PropTypes.array,
  width: PropTypes.string,
  onAllelesSelect: PropTypes.func,

};

export default GenomeFeatureWrapper;
