import React from 'react';
import { DataPage, PageNav, PageData, PageHeader } from '../../components/dataPage';
import GeneSummary from './GeneSummary.jsx';
import {
  OrthologyFilteredTable,
  HomologyUserGuide,
  OrthologyBasicInfo,
  OrthologyJBrowseLinkPanel,
} from '../../components/orthology';
import ParalogyTable from '../../components/paralogy/paralogyTable.jsx';
import ParalogyUserGuide from '../../components/paralogy/paralogyUserGuide.jsx';
import GoUserGuide from '../../components/geneOntologyRibbon/goUserGuide.jsx';
import PathwayUserGuide from '../../components/pathway/pathwayUserGuide.jsx';
import ModelSectionHelp from '../../components/model/modelSectionHelp.jsx';
import AlleleTableSectionHelp from '../../components/alleleTable/alleleTableSectionHelp.jsx';

import GeneOntologyRibbon from '../../components/geneOntologyRibbon/index.jsx';
import PathwayWidget from '../../components/pathway/pathwayWidget.jsx';
import NotFound from '../../components/notFound.jsx';
import Subsection from '../../components/subsection.jsx';
import {
  GenePhysicalInteractionDetailTable,
  GeneGeneticInteractionDetailTable,
  GeneInteractionCrossReference,
  InteractionUserGuide,
  GeneticInteractionSectionHelp,
} from '../../components/interaction';
import GenomeFeatureWrapper from './genomeFeatureWrapper.jsx';
import SequencePanel from './sequencePanelWrapper.jsx';
import ExpressionLinks from './expressionLinks.jsx';

import SpeciesIcon from '../../components/speciesIcon/index.jsx';
import DataSourceLinkCuration from '../../components/dataSourceLinkCuration.jsx';
import PhenotypeTable from './phenotypeTable.jsx';
import { ExpressionComparisonRibbon, ExpressionUserGuide } from '../../components/expression';
import { DiseaseComparisonRibbon } from '../../components/disease';
import GeneModelsTable from './GeneModelsTable.jsx';
import GeneMetaTags from './GeneMetaTags.jsx';
import PageNavEntity from '../../components/dataPage/PageNavEntity.jsx';
import PageCategoryLabel from '../../components/dataPage/PageCategoryLabel.jsx';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import { useRelease } from '../../hooks/ReleaseContextProvider';
import {
  getSpecies,
  getSpeciesNameCorrected,
  getSingleGenomeLocation,
  getGenomicLocations,
  buildCrossReferenceMap,
} from '../../lib/utils';
import TransgenicAlleleTable from './TransgenicAlleleTable.jsx';
import GeneSymbolCuration from '../../components/GeneSymbolCuration.jsx';
import PhenotypeCrossRefs from './PhenotypeCrossRefs.jsx';
import SpeciesName from '../../components/SpeciesName.jsx';
import SequenceFeatureViewerSectionHelp from '../../components/sequenceFeatureViewer/sequenceFeatureViewerSectionHelp.jsx';
import SequencePanelSectionHelp from '../../components/sequencePanel/sequencePanelSectionHelp.jsx';
import TransgenicAlleleSectionHelp from '../../components/transgenicAlleles/transgenicAllelesSectionHelp.jsx';
import DiseaseSectionHelp from '../../components/disease/diseaseSectionHelp.jsx';
import { AlleleTableWrapper } from './alleleTableWrapper.jsx';
import { useParams } from 'react-router-dom';

const SUMMARY = 'Summary';
const SEQUENCE_FEATURE_VIEWER = 'Sequence Feature Viewer';
const SEQUENCE_DETAILS = 'Sequence Details';
const FUNCTION = 'Function - GO Annotations';
const PATHWAY = 'Pathways';
const ORTHOLOGY = 'Orthology';
const PARALOGY = 'Paralogy';
const DISEASE = 'Disease Associations';
const EXPRESSION = 'Expression';
const ALLELES = 'Alleles and Variants';
const TG_ALLELES = 'Transgenic Alleles';
const PHENOTYPES = 'Phenotypes';
const INTERACTIONS = 'Molecular Interactions';
const GENETIC_INTERACTIONS = 'Genetic Interactions';
const MODELS = 'Models';

const SECTIONS = [
  { name: SUMMARY },
  { name: ORTHOLOGY },
  { name: PARALOGY },
  { name: FUNCTION },
  { name: PATHWAY },
  { name: PHENOTYPES },
  { name: DISEASE },
  { name: ALLELES },
  { name: TG_ALLELES },
  { name: MODELS },
  { name: SEQUENCE_FEATURE_VIEWER },
  { name: SEQUENCE_DETAILS },
  { name: EXPRESSION },
  { name: INTERACTIONS },
  { name: GENETIC_INTERACTIONS },
];

const GenePage = () => {
  const { id: geneId } = useParams();
  const { isLoading, isError, data } = usePageLoadingQuery(`/api/gene/${geneId}`);
  const release = useRelease();

  if (isError) {
    return <NotFound />;
  }

  if (isLoading) {
    return null;
  }

  const gene = data.gene;
  const speciesName = getSpeciesNameCorrected(gene.taxon?.name);
  const taxonId = gene.taxon?.curie;
  const geneSymbolText = gene.geneSymbol?.displayText;
  const dataProviderAbbr = gene.dataProvider?.abbreviation;

  // Normalize genome locations
  const genomeLocations = getGenomicLocations(gene);
  const genomeLocation = getSingleGenomeLocation(genomeLocations);

  // Build cross-reference map from flat array
  const crossReferenceMap = buildCrossReferenceMap(gene.crossReferences);

  // manufacture a single cell atlas cross reference since this isn't stored
  // in the database (see AGR-1406)
  let singleCellAtlasXRef;
  if (getSpecies(taxonId).enableSingleCellExpressionAtlasLink) {
    const singleCellUrl = `https://www.ebi.ac.uk/gxa/sc/search?q=${geneSymbolText}&species=${speciesName}`;
    singleCellAtlasXRef = {
      displayName: 'Single Cell Expression Atlas',
      referencedCurie: `SingleCellExpressionAtlas:${geneSymbolText}`,
      crossRefCompleteUrl: singleCellUrl,
      resourceDescriptorPage: {
        name: 'gene/single_cell_expression_atlas',
        urlTemplate: singleCellUrl,
      },
    };
  }

  const geneSpecies = { taxonId: taxonId, name: speciesName };

  const synonymStrings = gene.geneSynonyms?.map(s => s.displayText) || [];

  return (
    <DataPage key={gene.primaryExternalId}>
      <GeneMetaTags gene={gene} />
      <PageNav sections={SECTIONS}>
        <PageNavEntity
          entityName={<GeneSymbolCuration gene={gene} />}
          icon={<SpeciesIcon inNav scale={0.5} species={speciesName} />}
          truncateName
        >
          <SpeciesName>{speciesName}</SpeciesName>
          <DataSourceLinkCuration reference={crossReferenceMap.primary} />
        </PageNavEntity>
      </PageNav>
      <PageData>
        <PageCategoryLabel category="gene" />
        <PageHeader>
          <GeneSymbolCuration gene={gene} />
        </PageHeader>

        <Subsection hideTitle title={SUMMARY}>
          <GeneSummary gene={gene} crossReferenceMap={crossReferenceMap} />
        </Subsection>

        <Subsection help={<HomologyUserGuide />} title={ORTHOLOGY}>
          <OrthologyBasicInfo pantherCrossReference={crossReferenceMap.panther} />
          <OrthologyFilteredTable geneId={gene.primaryExternalId} />
          <OrthologyJBrowseLinkPanel geneLocation={genomeLocation} taxonid={taxonId} />
        </Subsection>

        <Subsection help={<ParalogyUserGuide />} title={PARALOGY}>
          <ParalogyTable geneId={gene.primaryExternalId} />
        </Subsection>

        <Subsection help={<GoUserGuide />} title={FUNCTION}>
          <GeneOntologyRibbon geneId={gene.primaryExternalId} geneSpecies={geneSpecies} geneSymbol={geneSymbolText} />
        </Subsection>

        <Subsection help={<PathwayUserGuide />} title={PATHWAY}>
          <PathwayWidget
            geneId={gene.primaryExternalId}
            geneSpecies={geneSpecies}
            geneSymbol={geneSymbolText}
            xrefs={crossReferenceMap}
          />
        </Subsection>

        <Subsection title={PHENOTYPES}>
          <PhenotypeCrossRefs
            primary={[crossReferenceMap.phenotypes]}
            other={[crossReferenceMap.biogridOrcs, crossReferenceMap.phenotypesImpc]}
          />
          <PhenotypeTable geneId={gene.primaryExternalId} entityType={'gene'} hideSourceColumn={true} />
        </Subsection>

        <Subsection help={<DiseaseSectionHelp />} title={DISEASE}>
          <DiseaseComparisonRibbon geneId={gene.primaryExternalId} geneTaxon={taxonId} />
        </Subsection>

        <Subsection help={<AlleleTableSectionHelp />} title={ALLELES}>
          <AlleleTableWrapper geneId={gene.primaryExternalId} />
        </Subsection>

        <Subsection help={<TransgenicAlleleSectionHelp />} title={TG_ALLELES}>
          <TransgenicAlleleTable geneId={gene.primaryExternalId} />
        </Subsection>

        <Subsection help={<ModelSectionHelp />} title={MODELS}>
          <GeneModelsTable id={gene.primaryExternalId} />
        </Subsection>

        <Subsection
          hasData={
            typeof genomeLocation.chromosome !== 'undefined' &&
            typeof genomeLocation.start !== 'undefined' &&
            typeof genomeLocation.end !== 'undefined'
          }
          help={<SequenceFeatureViewerSectionHelp />}
          title={SEQUENCE_FEATURE_VIEWER}
        >
          {!release.isLoading && (
            <GenomeFeatureWrapper
              assembly={genomeLocation.assembly}
              biotype={gene.geneType?.name}
              chromosome={genomeLocation.chromosome}
              displayType="ISOFORM"
              fmax={genomeLocation.end}
              fmin={genomeLocation.start}
              geneSymbol={geneSymbolText}
              genomeLocationList={genomeLocations}
              height="200px"
              id="genome-feature-location-id"
              primaryId={gene.primaryExternalId}
              species={taxonId}
              strand={genomeLocation.strand}
              synonyms={synonymStrings}
              width="600px"
            />
          )}
        </Subsection>

        <Subsection help={<SequencePanelSectionHelp />} title={SEQUENCE_DETAILS}>
          <SequencePanel
            refseq={genomeLocation.chromosome}
            start={genomeLocation.start}
            end={genomeLocation.end}
            gene={geneSymbolText}
            species={taxonId}
          />
        </Subsection>

        <Subsection help={<ExpressionUserGuide />} title={EXPRESSION}>
          <ExpressionLinks
            allExpressionCrossReference={crossReferenceMap.expression}
            geneDataProvider={dataProviderAbbr}
            imagesCrossReference={crossReferenceMap.expressionImages}
            otherExpressionCrossReferences={[
              crossReferenceMap.otherExpression,
              singleCellAtlasXRef,
              crossReferenceMap.expressionAtlas,
            ]}
            spellCrossReference={crossReferenceMap.spell}
            wildtypeExpressionCrossReference={crossReferenceMap.wildTypeExpression}
          />
          <ExpressionComparisonRibbon geneId={gene.primaryExternalId} geneTaxon={taxonId} />
        </Subsection>

        <Subsection help={<InteractionUserGuide />} title={INTERACTIONS}>
          <GeneInteractionCrossReference
            crossReference={crossReferenceMap.modInteractions}
            geneDataProvider={dataProviderAbbr}
          />
          <GenePhysicalInteractionDetailTable focusGeneDisplayName={geneSymbolText} focusGeneId={gene.primaryExternalId} />
        </Subsection>

        <Subsection help={<GeneticInteractionSectionHelp />} title={GENETIC_INTERACTIONS}>
          <GeneGeneticInteractionDetailTable focusGeneDisplayName={geneSymbolText} focusGeneId={gene.primaryExternalId} />
        </Subsection>
      </PageData>
    </DataPage>
  );
};

GenePage.propTypes = {};

export default GenePage;
