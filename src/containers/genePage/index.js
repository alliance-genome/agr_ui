import React  from 'react';
import PropTypes from 'prop-types';
import { DataPage, PageNav, PageData, PageHeader } from '../../components/dataPage';
import BasicGeneInfo from './basicGeneInfo';
import { OrthologyFilteredTable, OrthologyUserGuide, OrthologyBasicInfo } from '../../components/orthology';
import GoUserGuide from '../../components/geneOntologyRibbon/goUserGuide';

import GeneOntologyRibbon from '../../components/geneOntologyRibbon';
import NotFound from '../../components/notFound';
import Subsection from '../../components/subsection';
import AlleleTable from './alleleTable';
import { GenePhysicalInteractionDetailTable, GeneInteractionCrossReference, InteractionUserGuide } from '../../components/interaction';
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
import { getSpecies } from '../../lib/utils';

const SUMMARY = 'Summary';
const SEQUENCE_FEATURE_VIEWER = 'Sequence Feature Viewer';
const FUNCTION = 'Function - GO Annotations';
const ORTHOLOGY = 'Orthology';
const DISEASE = 'Disease Associations';
const EXPRESSION = 'Expression';
const ALLELES = 'Alleles and Variants';
const PHENOTYPES = 'Phenotypes';
const INTERACTIONS = 'Molecular Interactions';
const MODELS = 'Models';

const SECTIONS = [
  {name: SUMMARY},
  {name: ORTHOLOGY},
  {name: FUNCTION},
  {name: PHENOTYPES},
  {name: DISEASE},
  {name: ALLELES},
  {name: MODELS},
  {name: SEQUENCE_FEATURE_VIEWER},
  {name: EXPRESSION},
  {name: INTERACTIONS},
];

const GenePage = ({geneId}) => {
  const { isLoading, isError, data } = usePageLoadingQuery(`/api/gene/${geneId}`);

  if (isError) {
    return <NotFound />;
  }

  if (isLoading) {
    return null;
  }

  // todo, add chromosome
  let genomeLocation = {};
  if (data.genomeLocations) {
    if (data.genomeLocations.length === 1) {
      genomeLocation = data.genomeLocations[0];
    }
    else if (data.genomeLocations.length > 1) {
      // TODO: figure out the proper assembly
      for (var i in data.genomeLocations) {
        let tempGenomeLocation = data.genomeLocations[i];
        if (tempGenomeLocation.start && tempGenomeLocation.end) {
          genomeLocation = tempGenomeLocation;
        }
      }
    }
  }

  // TODO: this name should come directly from the API
  if (data.crossReferences['expression-atlas']) {
    data.crossReferences['expression-atlas'].displayName = 'Expression Atlas';
  }

  // manufacture a single cell atlas cross reference since this isn't stored
  // in the database (see AGR-1406)
  let singleCellAtlasXRef;
  if (getSpecies(data.species.taxonId).enableSingleCellExpressionAtlasLink) {
    singleCellAtlasXRef = {
      name: 'Single Cell Expression Atlas',
      url: `https://www.ebi.ac.uk/gxa/sc/search?q=${data.symbol}&species=${data.species.name}`,
    };
  }

  return (
    <DataPage key={data.id}>
      <GeneMetaTags gene={data} />
      <PageNav sections={SECTIONS}>
        <PageNavEntity entityName={data.symbol} icon={<SpeciesIcon inNav scale={0.5} species={data.species.name} />} truncateName>
          <i>{data.species.name}</i>
          <DataSourceLink reference={data.crossReferences.primary} />
        </PageNavEntity>
      </PageNav>
      <PageData>
        <PageCategoryLabel category='gene' />
        <PageHeader entityName={data.symbol} />

        <Subsection hideTitle title={SUMMARY}>
          <BasicGeneInfo gene={data} />
        </Subsection>

        <Subsection help={<OrthologyUserGuide />} title={ORTHOLOGY}>
          <OrthologyBasicInfo pantherCrossReference={data.crossReferences.panther} />
          <OrthologyFilteredTable geneId={data.id} />
        </Subsection>

        <Subsection help={<GoUserGuide />} title={FUNCTION}>
          <GeneOntologyRibbon
            geneId={data.id}
            geneSpecies={data.species}
            geneSymbol={data.symbol}
          />
        </Subsection>

        <Subsection title={PHENOTYPES}>
          <PhenotypeTable geneId={data.id} />
        </Subsection>

        <Subsection title={DISEASE}>
          <DiseaseComparisonRibbon geneId={data.id} geneTaxon={data.species.taxonId} />
        </Subsection>

        <Subsection title={ALLELES}>
          <AlleleTable
            gene={data}
            geneDataProvider={data.dataProvider}
            geneId={data.id}
            geneLocation={genomeLocation}
            geneSymbol={data.symbol}
            species={data.species.name}
          />
        </Subsection>

        <Subsection title={MODELS}>
          <GeneModelsTable id={data.id} />
        </Subsection>

        <Subsection
          hasData={typeof genomeLocation.chromosome!== 'undefined' && typeof genomeLocation.start !== 'undefined' && typeof genomeLocation.end !== 'undefined'}
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
            allExpressionCrossReference={data.crossReferences.expression}
            geneDataProvider={data.dataProvider}
            imagesCrossReference={data.crossReferences.expression_images}
            otherExpressionCrossReferences={[
              data.crossReferences.other_expression,
              singleCellAtlasXRef,
              data.crossReferences['expression-atlas']
            ]}
            spellCrossReference={data.crossReferences.spell}
            wildtypeExpressionCrossReference={data.crossReferences.wild_type_expression}
          />
          <ExpressionComparisonRibbon geneId={data.id} geneTaxon={data.species.taxonId} />
        </Subsection>

        <Subsection help={<InteractionUserGuide />} title={INTERACTIONS}>
          <GeneInteractionCrossReference
            crossReference={data.crossReferences.MODinteractions}
            geneDataProvider={data.dataProvider}
          />
          <GenePhysicalInteractionDetailTable
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
