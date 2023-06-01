import React  from 'react';
import PropTypes from 'prop-types';
import { DataPage, PageNav, PageData, PageHeader } from '../../components/dataPage';
import BasicGeneInfo from './basicGeneInfo';
import { OrthologyFilteredTable, OrthologyUserGuide, OrthologyBasicInfo } from '../../components/orthology';
import GoUserGuide from '../../components/geneOntologyRibbon/goUserGuide';
import PathwayUserGuide from '../../components/pathway/pathwayUserGuide';

import GeneOntologyRibbon from '../../components/geneOntologyRibbon';
import PathwayWidget from '../../components/pathway/pathwayWidget';
import NotFound from '../../components/notFound';
import Subsection from '../../components/subsection';
import AlleleTable from './alleleTable';
import {
  GenePhysicalInteractionDetailTable,
  GeneGeneticInteractionDetailTable,
  GeneInteractionCrossReference,
  InteractionUserGuide
} from '../../components/interaction';
import GenomeFeatureWrapper from './genomeFeatureWrapper';
import ExpressionLinks from './expressionLinks';

import SpeciesIcon from '../../components/speciesIcon';
import DataSourceLink from '../../components/dataSourceLink';
import PhenotypeTable from './phenotypeTable';
import {
  ExpressionComparisonRibbon,
  ExpressionUserGuide
} from '../../components/expression';
import { DiseaseComparisonRibbon } from '../../components/disease';
import GeneModelsTable from './GeneModelsTable';
import GeneMetaTags from './GeneMetaTags';
import PageNavEntity from '../../components/dataPage/PageNavEntity';
import PageCategoryLabel from '../../components/dataPage/PageCategoryLabel';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import { getSpecies, getSingleGenomeLocation } from '../../lib/utils';
import TransgenicAlleleTable from './TransgenicAlleleTable';
import GeneSymbol from '../../components/GeneSymbol';
import PhenotypeCrossRefs from './PhenotypeCrossRefs';
import SpeciesName from '../../components/SpeciesName';
import SequenceFeatureViewerSectionHelp from '../../components/sequenceFeatureViewer/sequenceFeatureViewerSectionHelp';

const SUMMARY = 'Summary';
const SEQUENCE_FEATURE_VIEWER = 'Sequence Feature Viewer';
const FUNCTION = 'Function - GO Annotations';
const PATHWAY = 'Pathways';
const ORTHOLOGY = 'Orthology';
const DISEASE = 'Disease Associations';
const EXPRESSION = 'Expression';
const ALLELES = 'Alleles and Variants';
const TG_ALLELES = 'Transgenic Alleles';
const PHENOTYPES = 'Phenotypes';
const INTERACTIONS = 'Molecular Interactions';
const GENETIC_INTERACTIONS = 'Genetic Interactions';
const MODELS = 'Models';

const SECTIONS = [
  {name: SUMMARY},
  {name: ORTHOLOGY},
  {name: FUNCTION},
  {name: PATHWAY},
  {name: PHENOTYPES},
  {name: DISEASE},
  {name: ALLELES},
  {name: TG_ALLELES},
  {name: MODELS},
  {name: SEQUENCE_FEATURE_VIEWER},
  {name: EXPRESSION},
  {name: INTERACTIONS},
  {name: GENETIC_INTERACTIONS},
];

const GenePage = ({geneId}) => {
  const { isLoading, isError, data } = usePageLoadingQuery(`/api/gene/${geneId}`);

  if (isError) {
    return <NotFound />;
  }

  if (isLoading) {
    return null;
  }

  const genomeLocation = getSingleGenomeLocation(data.genomeLocations);

  // TODO: this name should come directly from the API
  if (data.crossReferenceMap['expression-atlas']) {
    data.crossReferenceMap['expression-atlas'].displayName = 'Expression Atlas';
  }

  // manufacture a single cell atlas cross reference since this isn't stored
  // in the database (see AGR-1406)
  let singleCellAtlasXRef;
  if (getSpecies(data.species.taxonId).enableSingleCellExpressionAtlasLink) {
    singleCellAtlasXRef = {
      name: 'Single Cell Expression Atlas',
      crossRefCompleteUrl: `https://www.ebi.ac.uk/gxa/sc/search?q=${data.symbol}&species=${data.species.name}`,
    };
  }

  return (
    <DataPage key={data.id}>
      <GeneMetaTags gene={data} />
      <PageNav sections={SECTIONS}>
        <PageNavEntity
          entityName={<GeneSymbol gene={data} />}
          icon={<SpeciesIcon inNav scale={0.5} species={data.species.name} />}
          truncateName
        >
          <SpeciesName>{data.species.name}</SpeciesName>
          <DataSourceLink reference={data.crossReferenceMap.primary} />
        </PageNavEntity>
      </PageNav>
      <PageData>
        <PageCategoryLabel category='gene' />
        <PageHeader><GeneSymbol gene={data} /></PageHeader>

        <Subsection hideTitle title={SUMMARY}>
          <BasicGeneInfo gene={data} />
        </Subsection>

        <Subsection help={<OrthologyUserGuide />} title={ORTHOLOGY}>
          <OrthologyBasicInfo pantherCrossReference={data.crossReferenceMap.panther} />
          <OrthologyFilteredTable geneId={data.id} />
        </Subsection>

        <Subsection help={<GoUserGuide />} title={FUNCTION}>
          <GeneOntologyRibbon
            geneId={data.id}
            geneSpecies={data.species}
            geneSymbol={data.symbol}
          />
        </Subsection>

        <Subsection help={<PathwayUserGuide />} title={PATHWAY}>
          <PathwayWidget
            geneId={data.id}
            geneSpecies={data.species}
            geneSymbol={data.symbol}
            xrefs={data.crossReferenceMap}
          />
        </Subsection>

        <Subsection title={PHENOTYPES}>
          <PhenotypeCrossRefs
            primary={[
              data.crossReferenceMap.phenotypes
            ]}
            other={[
              data.crossReferenceMap.biogrid_orcs,
              data.crossReferenceMap.phenotypes_impc
            ]}
          />
          <PhenotypeTable geneId={data.id} />
        </Subsection>

        <Subsection title={DISEASE}>
          <DiseaseComparisonRibbon geneId={data.id} geneTaxon={data.species.taxonId} />
        </Subsection>

        <Subsection title={ALLELES}>
          <AlleleTable
            geneId={data.id}
          />
        </Subsection>

        <Subsection title={TG_ALLELES}>
          <TransgenicAlleleTable geneId={data.id} />
        </Subsection>

        <Subsection title={MODELS}>
          <GeneModelsTable id={data.id} />
        </Subsection>

        <Subsection
          hasData={typeof genomeLocation.chromosome!== 'undefined' && typeof genomeLocation.start !== 'undefined' && typeof genomeLocation.end !== 'undefined'}
          help={<SequenceFeatureViewerSectionHelp />}
          title={SEQUENCE_FEATURE_VIEWER}
        >
          <GenomeFeatureWrapper
            assembly={genomeLocation.assembly}
            biotype={data.soTermName}
            chromosome={genomeLocation.chromosome}
            displayType='ISOFORM'
            fmax={genomeLocation.end}
            fmin={genomeLocation.start}
            geneSymbol={data.symbol}
            genomeLocationList={data.genomeLocations}
            height='200px'
            id='genome-feature-location-id'
            primaryId={data.id}
            species={data.species.taxonId}
            strand={genomeLocation.strand}
            synonyms={data.synonyms}
            width='600px'
          />
        </Subsection>

        <Subsection help={<ExpressionUserGuide />} title={EXPRESSION}>
          <ExpressionLinks
            allExpressionCrossReference={data.crossReferenceMap.expression}
            geneDataProvider={data.dataProvider}
            imagesCrossReference={data.crossReferenceMap.expression_images}
            otherExpressionCrossReferences={[
              data.crossReferenceMap.other_expression,
              singleCellAtlasXRef,
              data.crossReferenceMap['expression-atlas']
            ]}
            spellCrossReference={data.crossReferenceMap.spell}
            wildtypeExpressionCrossReference={data.crossReferenceMap.wild_type_expression}
          />
          <ExpressionComparisonRibbon geneId={data.id} geneTaxon={data.species.taxonId} />
        </Subsection>

        <Subsection help={<InteractionUserGuide />} title={INTERACTIONS}>
          <GeneInteractionCrossReference
            crossReference={data.crossReferenceMap.MODinteractions}
            geneDataProvider={data.dataProvider}
          />
          <GenePhysicalInteractionDetailTable
            focusGeneDisplayName={data.symbol}
            focusGeneId={data.id}
          />
        </Subsection>
        <Subsection title={GENETIC_INTERACTIONS}>
          <GeneGeneticInteractionDetailTable
            focusGeneDisplayName={data.symbol}
            focusGeneId={data.id}
          />
        </Subsection>
      </PageData>
    </DataPage>
  );
};

GenePage.propTypes = {
  geneId: PropTypes.string.isRequired,
};

export default GenePage;
