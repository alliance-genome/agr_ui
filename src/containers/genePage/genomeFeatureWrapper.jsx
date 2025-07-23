import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AttributeList, AttributeLabel, AttributeValue } from '../../components/attribute';
import numeral from 'numeral';
import ExternalLink from '../../components/ExternalLink.jsx';
import { GenomeFeatureViewer, fetchNCListData, fetchTabixVcfData, parseLocString } from 'genomefeatures';
import { getTranscriptTypes } from '../../lib/genomeFeatureTypes';
import LoadingSpinner from '../../components/loadingSpinner.jsx';
import HorizontalScroll from '../../components/horizontalScroll.jsx';
import HelpPopup from '../../components/helpPopup.jsx';
import isEqual from 'lodash.isequal';
import CommaSeparatedList from '../../components/commaSeparatedList.jsx';
import { select } from 'd3-selection';

import style from './style.module.scss';
import { getSpecies, getSingleGenomeLocation } from '../../lib/utils';

import SequenceFeatureViewerSubsectionHelp from '../../components/sequenceFeatureViewer/sequenceFeatureViewerSubsectionHelp.jsx';
import { useRelease } from '../../hooks/ReleaseContextProvider';

const LINK_BUFFER = 1.2;

//is this needed?
// const helpSequenceViewer = 'The Allele/Variant Sequence Viewer shows the positions of allele-associated variants, where this data exists, in the context of the transcripts for the gene. Since the viewer is showing the genomic positions, alleles where the genomic location of the alteration is not known currently will not be displayed in the viewer. Polymorphisms determined by whole genome or whole exon sequencing are also not shown in this view due to the overwhelming number of these variants. To view these, use the link to the Alliance JBrowse below the viewer.';

class GenomeFeatureWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadState: 'loading',
      helpText: '',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { id } = event.target;
    if (!id || id === `${this.props.id}` || typeof this.props.onAllelesSelect === 'undefined') {
      return;
    }
    let clickedAlleles = select(`#${this.props.id}`).select(`#${id}`).data()[0].alleles;
    let currentAlleles = this.props.allelesSelected.map((a) => a.id);
    //If one or more clicked alleles are currently selected.
    if (currentAlleles.filter((d) => clickedAlleles.includes(d)).length > 0) {
      clickedAlleles.forEach(function (element) {
        let index = currentAlleles.indexOf(element);
        if (index !== -1) {
          currentAlleles.splice(index, 1);
        }
      });
      this.props.onAllelesSelect(currentAlleles);
    } else {
      this.props.onAllelesSelect(clickedAlleles.concat(currentAlleles));
    }
  }

  componentDidMount() {
    this.loadGenomeFeature();
  }

  componentDidUpdate(prevProps) {
    if (this.props.primaryId !== prevProps.primaryId) {
      this.loadGenomeFeature();
      this.gfc.setSelectedAlleles(
        this.props.allelesSelected !== undefined ? this.props.allelesSelected : [],
        `#${this.props.id}`
      );
    } else if (
      !isEqual(prevProps.allelesSelected, this.props.allelesSelected) &&
      this.props.allelesSelected !== undefined
    ) {
      this.gfc.setSelectedAlleles(
        this.props.allelesSelected.map((a) => a.id),
        `#${this.props.id}`
      );
    } else if (!isEqual(prevProps.visibleVariants, this.props.visibleVariants)) {
      this.loadGenomeFeature();
    }
  }

  componentWillUnmount() {
    this.gfc.closeModal();
  }

  async generateJBrowseTrackData(fmin, fmax, chromosome, species, releaseVersion) {
    const speciesInfo = getSpecies(species);
    const apolloPrefix = speciesInfo.apolloName;

    // Construct chromosome string with species-specific formatting
    let chrString = chromosome;
    if (apolloPrefix === 'yeast' || (apolloPrefix === 'x_laevis' && !chromosome.startsWith('Scaffold'))) {
      chrString = 'chr' + chromosome;
    }
    if ((apolloPrefix === 'x_laevis' || apolloPrefix === 'x_tropicalis') && !chromosome.startsWith('Sca')) {
      chrString = 'Chr' + chromosome;
    }

    // Create location string and parse it using GMOD format
    const locString = `${chrString}:${fmin}..${fmax}`;
    const parsedRegion = parseLocString(locString);

    // Convert to the format expected by NCList/VCF fetchers
    const region = {
      chromosome: parsedRegion.chromosome,
      start: parsedRegion.start,
      end: parsedRegion.end,
    };

    // Build JBrowse URLs using release version
    const ncListUrlTemplate =
      speciesInfo.jBrowsenclistbaseurltemplate.replace('{release}', releaseVersion) +
      `tracks/All_Genes/${chrString}/trackData.jsonz`;
    const vcfTabixUrl = speciesInfo.jBrowseVcfUrlTemplate.replace('{release}', releaseVersion) + 'variants.vcf.gz';

    try {
      // Fetch track data from JBrowse NCList files
      const trackData = await fetchNCListData({
        region,
        urlTemplate: ncListUrlTemplate,
      });

      // Fetch variant data from VCF tabix files (if available)
      let variantData = null;
      try {
        variantData = await fetchTabixVcfData({
          url: vcfTabixUrl,
          region,
        });
      } catch (vcfError) {
        // VCF data may not be available for all species/regions
        console.warn('VCF data not available:', vcfError);
      }

      return { trackData, variantData, region };
    } catch (error) {
      console.error('Error fetching JBrowse data:', error);
      throw error;
    }
  }

  generateJBrowseLink(chr, start, end, htpVariant) {
    //const geneSymbolUrl = '&lookupSymbol=' + this.props.geneSymbol;
    //  maybe will use this ^^^ haven't decided
    const assembly = getSpecies(this.props.species).jBrowseName.replace(' ', '_');
    var externalJBrowsePrefix = '/jbrowse2?tracklist=true&assembly=' + assembly;

    //  htpVariant is a loc string of the format 'chr:start' for a variant
    if (htpVariant) {
      const pieces = htpVariant.split(':');
      externalJBrowsePrefix = externalJBrowsePrefix + '&highlight=' + pieces[0] + ':' + pieces[1] + '-' + pieces[1];
    }

    const linkLength = end - start;
    let bufferedMin = Math.round(start - (linkLength * LINK_BUFFER) / 2.0);
    bufferedMin = bufferedMin < 0 ? 0 : bufferedMin;
    const bufferedMax = Math.round(end + (linkLength * LINK_BUFFER) / 2.0);
    if (
      (this.props.species === 'NCBITaxon:8355' || this.props.species === 'NCBITaxon:7955) &&
      !chr.toLowerCase().startsWith('chr') &&
      !chr.toLowerCase().startsWith('sca')
    ) {
      chr = 'Chr' + chr;
    }
    const externalLocationString = chr + ':' + bufferedMin + '..' + bufferedMax;
    // TODO: handle bufferedMax exceeding chromosome length, though I think it has a good default.
    const tracks = [];
    const trackList = getSpecies(this.props.species).jBrowsetracks.split(',');
    for (const track of trackList) {
      tracks.push(assembly + track);
    }
    return externalJBrowsePrefix + '&tracks=' + tracks.join(',') + '&loc=' + encodeURIComponent(externalLocationString);
  }

  generateTrackConfig(
    fmin,
    fmax,
    chromosome,
    species,
    nameSuffixString,
    variantFilter,
    displayType,
    isoformFilter,
    htpVariant,
    allelesSelected,
    trackData,
    variantData,
    region
  ) {
    let transcriptTypes = getTranscriptTypes();
    const speciesInfo = getSpecies(species);
    const apolloPrefix = speciesInfo.apolloName;

    if (species === 'NCBITaxon:2697049') {
      const padding = Math.round((fmax - fmin) * 0.2);
      fmin = fmin - padding > 1 ? fmin - padding : 1;
      fmax = fmax + padding;
    }

    const baseConfig = {
      region,
      genome: apolloPrefix,
      transcriptTypes: transcriptTypes,
      htpVariant: htpVariant ? htpVariant : '',
    };

    if (displayType === 'ISOFORM') {
      return {
        ...baseConfig,
        tracks: [
          {
            type: 'ISOFORM',
            trackData,
          },
        ],
      };
    } else if (displayType === 'ISOFORM_AND_VARIANT') {
      return {
        ...baseConfig,
        showVariantLabel: false,
        variantFilter: variantFilter ? variantFilter : [],
        isoformFilter: isoformFilter ? isoformFilter : [],
        initialHighlight: allelesSelected ? allelesSelected.map((a) => a.id) : [],
        visibleVariants: undefined,
        binRatio: 0.01,
        tracks: [
          {
            type: 'ISOFORM_EMBEDDED_VARIANT',
            trackData,
            variantData,
          },
        ],
      };
    } else {
      // eslint-disable-next-line no-console
      console.error('Undefined displayType', displayType);
    }
  }

  async loadGenomeFeature() {
    const {
      chromosome,
      fmin,
      fmax,
      species,
      id,
      primaryId,
      geneSymbol,
      displayType,
      synonyms = [],
      visibleVariants,
      isoformFilter,
      htpVariant,
      allelesSelected,
    } = this.props;

    try {
      this.setState({ loadState: 'loading' });

      // Get release version from context or environment
      const releaseVersion = process.env.REACT_APP_JBROWSE_AGR_RELEASE || this.props.releaseVersion || '8.2.0';

      // provide unique names
      let nameSuffix = [geneSymbol, ...synonyms, primaryId]
        .filter((x, i, a) => a.indexOf(x) === i)
        .map((x) => encodeURI(x));
      if (getSpecies(species).apolloName === 'SARS-CoV-2') {
        if (primaryId && primaryId.indexOf(':') > 0) {
          const baseId = primaryId.split(':')[1];
          nameSuffix.push(baseId);
          // add accession IDs as well
          nameSuffix.push(baseId + '.0');
          nameSuffix.push(baseId + '.1');
          nameSuffix.push(baseId + '.2');
          nameSuffix.push(baseId + '.3');
        }
      }
      let nameSuffixString = nameSuffix.length === 0 ? '' : nameSuffix.join('&name=');
      if (nameSuffixString.length > 0) {
        nameSuffixString = `?name=${nameSuffixString}`;
      }

      // Fetch JBrowse data
      const { trackData, variantData, region } = await this.generateJBrowseTrackData(
        fmin,
        fmax,
        chromosome,
        species,
        releaseVersion
      );

      // Generate track configuration with fetched data
      const trackConfig = this.generateTrackConfig(
        fmin,
        fmax,
        chromosome,
        species,
        nameSuffixString,
        visibleVariants,
        displayType,
        isoformFilter,
        htpVariant,
        allelesSelected,
        trackData,
        variantData,
        region
      );

      this.gfc = new GenomeFeatureViewer(trackConfig, `#${id}`, 900, undefined);

      this.setState({
        helpText: this.gfc.generateLegend(),
        loadState: 'loaded',
      });
    } catch (error) {
      console.error('Error loading genome feature:', error);
      this.setState({
        loadState: 'error',
        helpText: 'Error loading genome data',
      });
    }
  }

  render() {
    const { assembly, id, displayType, genomeLocationList, htpVariant } = this.props;
    const genomeLocation = getSingleGenomeLocation(genomeLocationList);

    const coordinates = genomeLocationList.map((location) => {
      //htpVariant contains location of variant info; can use that to set hightlight
      return (
        <span key={location.chromosome + location.start + location.end}>
          <ExternalLink href={this.generateJBrowseLink(location.chromosome, location.start, location.end, htpVariant)}>
            {location.chromosome.toLowerCase().startsWith('chr') ||
            location.chromosome.toLowerCase().startsWith('sca')
              ? location.chromosome
              : 'Chr' + location.chromosome}
            :{location.start}...{location.end}
          </ExternalLink>{' '}
          {location.strand} ({numeral((location.end - location.start) / 1000.0).format('0,0.00')} kb)
        </span>
      );
    });

    return (
      <div id="genomeViewer">
        <AttributeList>
          <AttributeLabel>Genome location</AttributeLabel>
          <AttributeValue>
            <CommaSeparatedList>{coordinates}</CommaSeparatedList>
          </AttributeValue>
          <AttributeLabel>Assembly version</AttributeLabel>
          <AttributeValue>{assembly}</AttributeValue>
          <AttributeLabel>Viewer Help</AttributeLabel>
          <HelpPopup id="sequence-feature-viewer-subsection-help">
            <SequenceFeatureViewerSubsectionHelp />
          </HelpPopup>
        </AttributeList>
        <HorizontalScroll width={960}>
          <div>
            <svg id={id} onClick={this.handleClick}>
              <LoadingSpinner />
            </svg>
          </div>

          {displayType === 'ISOFORM_AND_VARIANT' && (
            <div>
              <span className="mr-1">Variant Types and Consequences</span>
              <HelpPopup id="variant-legend" placement="bottom-start" popperClassName={style.variantLegendPopper}>
                <span dangerouslySetInnerHTML={{ __html: this.state.helpText }} />
              </HelpPopup>
              <i className="text-muted d-block mt-1">
                Only variants associated to alleles are shown in the graphics above. See all variants in{' '}
                <ExternalLink
                  href={this.generateJBrowseLink(genomeLocation.chromosome, genomeLocation.start, genomeLocation.end)}
                >
                  JBrowse
                </ExternalLink>
                .
              </i>
            </div>
          )}
          {this.state.loadState === 'error' ? <div className="text-danger">Unable to retrieve data</div> : ''}
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
  releaseVersion: PropTypes.string,
  species: PropTypes.string.isRequired,
  strand: PropTypes.string,
  synonyms: PropTypes.array,
  visibleVariants: PropTypes.array,
  width: PropTypes.string,
  onAllelesSelect: PropTypes.func,
};

// Functional wrapper to provide release version from context
const GenomeFeatureWrapperWithRelease = (props) => {
  const useGetReleaseVersion = () => {
    const release = useRelease();

    if (!release.isLoading && !release.isError) {
      return release.data.releaseVersion;
    } else {
      return 'unknown';
    }
  };

  const contextReleaseVersion = useGetReleaseVersion();
  const releaseVersion = process.env.REACT_APP_JBROWSE_AGR_RELEASE || contextReleaseVersion;

  return <GenomeFeatureWrapper {...props} releaseVersion={releaseVersion} />;
};

export default GenomeFeatureWrapperWithRelease;
