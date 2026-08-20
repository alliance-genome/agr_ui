import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { AttributeList, AttributeLabel, AttributeValue } from '../../components/attribute';
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

// -- helpers extracted from the class (no `this` needed) --------------------

async function generateJBrowseTrackData(fmin, fmax, chromosome, species, releaseVersion, displayType) {
  const speciesInfo = getSpecies(species);
  const apolloPrefix = speciesInfo.apolloName;

  let chrString = chromosome;
  if (apolloPrefix === 'yeast' && !chromosome.startsWith('chr')) chrString = 'chr' + chromosome;
  if (
    (apolloPrefix === 'x_laevis' || apolloPrefix === 'x_tropicalis') &&
    !chromosome.startsWith('Chr') &&
    !chromosome.toLowerCase().startsWith('sca')
  ) {
    chrString = 'Chr' + chromosome;
  }

  const parsedRegion = parseLocString(`${chrString}:${fmin}..${fmax}`);
  const region = {
    chromosome: parsedRegion.chromosome,
    start: parsedRegion.start,
    end: parsedRegion.end,
  };

  const ncListUrlTemplate =
    speciesInfo.jBrowsenclistbaseurltemplate.replace('{release}', releaseVersion) +
    `tracks/All_Genes/${chrString}/trackData.jsonz`;

  const vcfFilenameMap = {
    MGI: 'mouse-latest.vcf.gz',
    RGD: 'rat-latest.vcf.gz',
    ZFIN: 'zebrafish-latest.vcf.gz',
    FB: 'fly-latest.vcf.gz',
    WB: 'worm-latest.vcf.gz',
    SGD: 'HTPOSTVEPVCF_SGD_latest.vcf.gz',
  };

  const speciesPrefix = species.startsWith('NCBITaxon:10090')
    ? 'MGI'
    : species.startsWith('NCBITaxon:10116')
      ? 'RGD'
      : species.startsWith('NCBITaxon:7955')
        ? 'ZFIN'
        : species.startsWith('NCBITaxon:7227')
          ? 'FB'
          : species.startsWith('NCBITaxon:6239')
            ? 'WB'
            : species.startsWith('NCBITaxon:559292')
              ? 'SGD'
              : null;

  const vcfFilename = vcfFilenameMap[speciesPrefix] || 'variants.vcf.gz';
  const vcfTabixUrl = `https://s3.amazonaws.com/agrjbrowse/VCF/${releaseVersion}/${vcfFilename}`;

  const trackData = await fetchNCListData({ region, urlTemplate: ncListUrlTemplate });

  let variantData = null;
  let vcfError = null;

  if (displayType === 'ISOFORM_AND_VARIANT') {
    const isHuman = species === 'NCBITaxon:9606';
    const isSGD = species === 'NCBITaxon:559292';

    if (releaseVersion && releaseVersion !== 'unknown' && !isHuman && !isSGD) {
      try {
        variantData = await fetchTabixVcfData({ url: vcfTabixUrl, region });
      } catch (error) {
        vcfError = {
          message: error.message || 'Failed to load variant data',
          url: vcfTabixUrl,
          species,
        };
      }
    }
  }

  return { trackData, variantData, region, vcfError };
}

function generateJBrowseLink(species, chr, start, end, htpVariant) {
  const assembly = getSpecies(species).jBrowseName.replace(' ', '_');
  let externalJBrowsePrefix = '/jbrowse2?tracklist=true&assembly=' + assembly;

  if (htpVariant) {
    const pieces = htpVariant.split(':');
    externalJBrowsePrefix = externalJBrowsePrefix + '&highlight=' + pieces[0] + ':' + pieces[1] + '-' + pieces[1];
  }

  const linkLength = end - start;
  let bufferedMin = Math.round(start - (linkLength * LINK_BUFFER) / 2.0);
  bufferedMin = bufferedMin < 0 ? 0 : bufferedMin;
  const bufferedMax = Math.round(end + (linkLength * LINK_BUFFER) / 2.0);
  if (
    (species === 'NCBITaxon:8355' || species === 'NCBITaxon:8364') &&
    !chr.toLowerCase().startsWith('chr') &&
    !chr.toLowerCase().startsWith('sca')
  ) {
    chr = 'Chr' + chr;
  }
  const externalLocationString = chr + ':' + bufferedMin + '..' + bufferedMax;
  const tracks = [];
  const trackList = getSpecies(species).jBrowsetracks.split(',');
  for (const track of trackList) tracks.push(assembly + track);
  return externalJBrowsePrefix + '&tracks=' + tracks.join(',') + '&loc=' + encodeURIComponent(externalLocationString);
}

function generateTrackConfig(
  fmin,
  fmax,
  species,
  variantFilter,
  displayType,
  isoformFilter,
  htpVariant,
  allelesSelected,
  trackData,
  variantData,
  region,
  geneSymbol,
  primaryId
) {
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
    transcriptTypes: getTranscriptTypes(),
    htpVariant: htpVariant ? htpVariant : '',
  };

  if (displayType === 'ISOFORM') {
    return {
      ...baseConfig,
      tracks: [
        {
          type: 'ISOFORM',
          trackData,
          geneBounds: { start: fmin, end: fmax },
          geneSymbol,
          geneId: primaryId,
          speciesTaxonId: species,
        },
      ],
    };
  }

  if (displayType === 'ISOFORM_AND_VARIANT') {
    const safeVariantFilter = Array.isArray(variantFilter) ? variantFilter : [];
    const safeIsoformFilter = Array.isArray(isoformFilter) ? isoformFilter : [];
    const safeAllelesSelected = Array.isArray(allelesSelected) ? allelesSelected : [];

    return {
      ...baseConfig,
      showVariantLabel: false,
      variantFilter: safeVariantFilter,
      isoformFilter: safeIsoformFilter,
      initialHighlight:
        safeAllelesSelected.length > 0
          ? safeAllelesSelected.map((a) => (a && a.id ? a.id : null)).filter((id) => id !== null)
          : [],
      visibleVariants: safeVariantFilter,
      binRatio: 0.01,
      tracks: [
        {
          type: 'ISOFORM_AND_VARIANT',
          trackData,
          variantData,
          geneBounds: { start: fmin, end: fmax },
          geneSymbol,
          geneId: primaryId,
          speciesTaxonId: species,
        },
      ],
    };
  }
}

// -- component --------------------------------------------------------------

const GenomeFeatureWrapper = (props) => {
  const {
    allelesSelected,
    assembly,
    chromosome,
    displayType,
    fmax,
    fmin,
    geneSymbol,
    genomeLocationList,
    htpVariant,
    id,
    isoformFilter,
    onAllelesSelect,
    primaryId,
    releaseIsLoading,
    releaseVersion,
    species,
    synonyms = [],
    visibleVariants,
  } = props;

  const [loadState, setLoadState] = useState('loading');
  const [helpText, setHelpText] = useState('');
  const [vcfLoadError, setVcfLoadError] = useState(null);

  const loadRequestIdRef = useRef(0);
  const gfcRef = useRef(null);

  const shouldWaitForReleaseVersion = () => !process.env.REACT_APP_JBROWSE_AGR_RELEASE && releaseIsLoading;

  const loadGenomeFeature = async () => {
    const requestId = ++loadRequestIdRef.current;

    try {
      setLoadState('loading');
      setVcfLoadError(null);

      const effectiveReleaseVersion = process.env.REACT_APP_JBROWSE_AGR_RELEASE || releaseVersion || '8.2.0';

      let nameSuffix = [geneSymbol, ...synonyms, primaryId]
        .filter((x, i, a) => a.indexOf(x) === i)
        .map((x) => encodeURI(x));
      if (getSpecies(species).apolloName === 'SARS-CoV-2') {
        if (primaryId && primaryId.indexOf(':') > 0) {
          const baseId = primaryId.split(':')[1];
          nameSuffix.push(baseId, baseId + '.0', baseId + '.1', baseId + '.2', baseId + '.3');
        }
      }

      const { trackData, variantData, region, vcfError } = await generateJBrowseTrackData(
        fmin,
        fmax,
        chromosome,
        species,
        effectiveReleaseVersion,
        displayType
      );

      if (requestId !== loadRequestIdRef.current) return;

      const trackConfig = generateTrackConfig(
        fmin,
        fmax,
        species,
        visibleVariants,
        displayType,
        isoformFilter,
        htpVariant,
        allelesSelected,
        trackData,
        variantData,
        region,
        geneSymbol,
        primaryId
      );

      gfcRef.current = new GenomeFeatureViewer(trackConfig, `#${id}`, 900, 500);

      if (allelesSelected && allelesSelected.length > 0) {
        const alleleIds = allelesSelected.map((a) => a.id);
        gfcRef.current.setSelectedAlleles(alleleIds, `#${id}`);
      }

      setHelpText(gfcRef.current.generateLegend());
      setLoadState('loaded');
      setVcfLoadError(vcfError);
    } catch (error) {
      if (requestId !== loadRequestIdRef.current) return;
      setLoadState('error');
      setHelpText('Error loading genome data');
      // errorDetails preserved for parity, though never read by render
      // eslint-disable-next-line no-console
      console.debug('genome-feature load error', error?.message);
    }
  };

  // (Re)load when the trigger props change.
  const prevReloadKeysRef = useRef({});
  useEffect(() => {
    if (shouldWaitForReleaseVersion()) return;

    const prev = prevReloadKeysRef.current;
    const shouldReload =
      prev.primaryId !== primaryId ||
      !isEqual(prev.visibleVariants, visibleVariants) ||
      !isEqual(prev.isoformFilter, isoformFilter) ||
      prev.releaseVersion !== releaseVersion ||
      prev.initial === undefined; // first run

    prevReloadKeysRef.current = { primaryId, visibleVariants, isoformFilter, releaseVersion, initial: true };

    if (!shouldReload) return;

    loadGenomeFeature();
    if (gfcRef.current) {
      gfcRef.current?.setSelectedAlleles(allelesSelected !== undefined ? allelesSelected : [], `#${id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryId, visibleVariants, isoformFilter, releaseVersion, releaseIsLoading]);

  // Alleles-only update: don't reload feature, just update viewer selection.
  const prevAllelesSelectedRef = useRef(allelesSelected);
  useEffect(() => {
    if (!isEqual(prevAllelesSelectedRef.current, allelesSelected) && allelesSelected !== undefined) {
      if (gfcRef.current) {
        gfcRef.current.setSelectedAlleles(
          allelesSelected.map((a) => a.id),
          `#${id}`
        );
      }
    }
    prevAllelesSelectedRef.current = allelesSelected;
  }, [allelesSelected, id]);

  // Unmount cleanup
  useEffect(
    () => () => {
      if (gfcRef.current && gfcRef.current.closeModal) gfcRef.current.closeModal();
    },
    []
  );

  const handleClick = (event) => {
    const targetEl = event.target.closest('[id]');
    if (!targetEl) return;
    const eltId = targetEl.id;
    if (!eltId || eltId === id || typeof onAllelesSelect === 'undefined') return;

    const datum = select(targetEl).datum();
    if (!datum || !datum.alleles) return;

    const clickedAlleles = datum.alleles;
    const currentAlleles = allelesSelected.map((a) => a.id);
    const fromViewer = true;

    if (currentAlleles.some((d) => clickedAlleles.includes(d))) {
      clickedAlleles.forEach((element) => {
        const idx = currentAlleles.indexOf(element);
        if (idx !== -1) currentAlleles.splice(idx, 1);
      });
      onAllelesSelect(currentAlleles, fromViewer);
    } else {
      onAllelesSelect(clickedAlleles.concat(currentAlleles), fromViewer);
    }
  };

  const genomeLocation = getSingleGenomeLocation(genomeLocationList);

  const coordinates = genomeLocationList.map((location) => {
    const genomeLength = (location.end - location.start) / 1000.0;
    return (
      <span key={location.chromosome + location.start + location.end}>
        <ExternalLink
          href={generateJBrowseLink(species, location.chromosome, location.start, location.end, htpVariant)}
        >
          {location.chromosome.toLowerCase().startsWith('chr') || location.chromosome.toLowerCase().startsWith('sca')
            ? location.chromosome
            : 'Chr' + location.chromosome}
          :{location.start}...{location.end}
        </ExternalLink>{' '}
        {location.strand} (
        {genomeLength.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kb)
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
        <div onClick={handleClick}>
          <svg id={id}>
            <LoadingSpinner />
          </svg>
        </div>

        {displayType === 'ISOFORM_AND_VARIANT' && (
          <div>
            <span className="mr-1">Variant Types and Consequences</span>
            <HelpPopup id="variant-legend" placement="bottom-start" popperClassName={style.variantLegendPopper}>
              <span dangerouslySetInnerHTML={{ __html: helpText }} />
            </HelpPopup>
            <i className="text-muted d-block mt-1">
              Only variants associated to alleles are shown in the graphics above. See all variants in{' '}
              <ExternalLink
                href={generateJBrowseLink(species, genomeLocation.chromosome, genomeLocation.start, genomeLocation.end)}
              >
                JBrowse
              </ExternalLink>
              .
            </i>
          </div>
        )}
        {loadState === 'error' ? <div className="text-danger">Unable to retrieve data</div> : ''}
        {vcfLoadError && displayType === 'ISOFORM_AND_VARIANT' && (
          <div className="alert alert-warning mt-2" role="alert">
            <strong>Variant data could not be loaded</strong>
            <br />
            <small>
              Please refresh the page to try again. If this error persists, please contact us at{' '}
              <a href="mailto:help@alliancegenome.org">help@alliancegenome.org</a>
            </small>
          </div>
        )}
      </HorizontalScroll>
    </div>
  );
};

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
  releaseIsLoading: PropTypes.bool,
  species: PropTypes.string.isRequired,
  strand: PropTypes.string,
  synonyms: PropTypes.array,
  visibleVariants: PropTypes.array,
  width: PropTypes.string,
  onAllelesSelect: PropTypes.func,
};

// Functional wrapper to provide release version from context
const GenomeFeatureWrapperWithRelease = (props) => {
  const release = useRelease();
  const contextReleaseVersion = release.isLoading
    ? 'unknown'
    : release.isError
      ? undefined
      : release.data.releaseVersion;
  const releaseVersion = process.env.REACT_APP_JBROWSE_AGR_RELEASE || contextReleaseVersion;

  return <GenomeFeatureWrapper {...props} releaseIsLoading={release.isLoading} releaseVersion={releaseVersion} />;
};

export default GenomeFeatureWrapperWithRelease;
