import React  from 'react';
import PropTypes from 'prop-types';
import { DataPage, PageNav, PageData, PageHeader } from '../../components/dataPage';
import BasicGeneInfo from './basicGeneInfo.jsx';
import {
  OrthologyFilteredTable,
  HomologyUserGuide,
  OrthologyBasicInfo,
  OrthologyJBrowseLinkPanel
} from '../../components/orthology';
import ParalogyTable from '../../components/paralogy/paralogyTable.jsx'
import ParalogyUserGuide from '../../components/paralogy/paralogyUserGuide.jsx'
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
  GeneticInteractionSectionHelp
} from '../../components/interaction';
import GenomeFeatureWrapper from './genomeFeatureWrapper.jsx';
import SequencePanel from './sequencePanelWrapper.jsx';
import ExpressionLinks from './expressionLinks.jsx';

import SpeciesIcon from '../../components/speciesIcon/index.jsx';
import DataSourceLink from '../../components/dataSourceLink.jsx';
import PhenotypeTable from './phenotypeTable.jsx';
import {
  ExpressionComparisonRibbon,
  ExpressionUserGuide
} from '../../components/expression';
import { DiseaseComparisonRibbon } from '../../components/disease';
import GeneModelsTable from './GeneModelsTable.jsx';
import GeneMetaTags from './GeneMetaTags.jsx';
import PageNavEntity from '../../components/dataPage/PageNavEntity.jsx';
import PageCategoryLabel from '../../components/dataPage/PageCategoryLabel.jsx';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import { getSpecies, getSingleGenomeLocation } from '../../lib/utils';
import TransgenicAlleleTable from './TransgenicAlleleTable.jsx';
import GeneSymbol from '../../components/GeneSymbol.jsx';
import PhenotypeCrossRefs from './PhenotypeCrossRefs.jsx';
import SpeciesName from '../../components/SpeciesName.jsx';
import SequenceFeatureViewerSectionHelp from '../../components/sequenceFeatureViewer/sequenceFeatureViewerSectionHelp.jsx';
import SequencePanelSectionHelp from '../../components/sequencePanel/sequencePanelSectionHelp.jsx';
import TransgenicAlleleSectionHelp from '../../components/transgenicAlleles/transgenicAllelesSectionHelp.jsx';
import DiseaseSectionHelp from '../../components/disease/diseaseSectionHelp.jsx';
import { AlleleTableWrapper } from './alleleTableWrapper.jsx';

const SUMMARY = 'Summary';
const SEQUENCE_FEATURE_VIEWER = 'Sequence Feature Viewer';
const SEQUENCE_DETAILS = 'Sequence Details';
const FUNCTION = 'Function - GO Annotations';
const PATHWAY = 'Pathways';
const ORTHOLOGY = 'Orthology';
const PARALOGY = 'Paralogy'
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
  {name: PARALOGY},
  {name: FUNCTION},
  {name: PATHWAY},
  {name: PHENOTYPES},
  {name: DISEASE},
  {name: ALLELES},
  {name: TG_ALLELES},
  {name: MODELS},
  {name: SEQUENCE_FEATURE_VIEWER},
  {name: SEQUENCE_DETAILS},
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

        <Subsection help={<HomologyUserGuide />} title={ORTHOLOGY}>
          <OrthologyBasicInfo pantherCrossReference={data.crossReferenceMap.panther} />
          <OrthologyFilteredTable geneId={data.id} />
          <OrthologyJBrowseLinkPanel
            geneLocation={genomeLocation}
            taxonid={data.species.taxonId}
          />
        </Subsection>

        <Subsection help={<ParalogyUserGuide />} title={PARALOGY}>
          <ParalogyTable geneId={data.id} />
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
          <PhenotypeTable geneId={data.id} entityType={'gene'} hideSourceColumn={true} />
        </Subsection>

        <Subsection help={<DiseaseSectionHelp />}title={DISEASE}>
          <DiseaseComparisonRibbon geneId={data.id} geneTaxon={data.species.taxonId} />
        </Subsection>

        <Subsection help={<AlleleTableSectionHelp />} title={ALLELES}>
          <AlleleTableWrapper geneId={data.id}/>
        </Subsection>

        <Subsection help={<TransgenicAlleleSectionHelp />}title={TG_ALLELES}>
          <TransgenicAlleleTable geneId={data.id} />
        </Subsection>

        <Subsection help={<ModelSectionHelp />} title={MODELS}>
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

        <Subsection
          help={<SequencePanelSectionHelp />}
          title={SEQUENCE_DETAILS}
        >
	  <SequencePanel
            refseq={genomeLocation.chromosome}
            start={genomeLocation.start}
            end={genomeLocation.end}
            gene={data.symbol}
            species={data.species.taxonId}
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

        <Subsection help={<GeneticInteractionSectionHelp />} title={GENETIC_INTERACTIONS}>
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
