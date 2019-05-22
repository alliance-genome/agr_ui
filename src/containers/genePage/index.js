import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchGene } from '../../actions/genes';
import { selectGene } from '../../selectors/geneSelectors';

import { DataPage, PageNav, PageData, PageHeader } from '../../components/dataPage';
import BasicGeneInfo from './basicGeneInfo';
import { OrthologyFilteredTable, OrthologyUserGuide, OrthologyBasicInfo } from '../../components/orthology';
import {
  GenePageDiseaseViaExperimentTable,
  GenePageDiseaseViaOrthologyTable,
} from '../../components/disease';
import GeneOntologyRibbon from '../../components/geneOntologyRibbon';
import LoadingPage from '../../components/loadingPage';
import NotFound from '../../components/notFound';
import Subsection from '../../components/subsection';
import AlleleTable from '../../components/alleleTable';
import { GenePhysicalInteractionDetailTable, GeneInteractionCrossReference } from '../../components/interaction';
import GenomeFeatureWrapper from './genomeFeatureWrapper';
import ExpressionLinks from './expressionLinks';

import SpeciesIcon from '../../components/speciesIcon';
import DataSourceLink from '../../components/dataSourceLink';
import PhenotypeTable from './phenotypeTable';
import { ExpressionComparisonRibbon } from '../../components/expression';
import { DiseaseAnnotationTable } from '../../components/disease';
import HeadMetaTags from '../../components/headMetaTags';

class GenePage extends Component {

  componentDidMount () {
    this.props.dispatch(fetchGene(this.props.match.params.geneId));
  }

  componentDidUpdate (prevProps) {
    if (this.props.match.params.geneId !== prevProps.match.params.geneId) {
      this.props.dispatch(fetchGene(this.props.match.params.geneId));
    }
  }

  render () {
    const {data, error, loading} = this.props;

    if (loading) {
      return <LoadingPage />;
    }

    if (error) {
      return <NotFound />;
    }

    if (!data) {
      return null;
    }

    const title = `${data.symbol} | ${data.species.name} gene`;

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

    let now = new Date();
    let date = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2);

    const SUMMARY = 'Summary';
    const SEQUENCE_FEATURE_VIEWER = 'Sequence Feature Viewer';
    const FUNCTION = 'Function - GO Annotations';
    const ORTHOLOGY = 'Orthology';
    const DISEASE = 'Disease Associations';
    const DISEASE_VIA_EXPERIMENT = 'Disease Associations Via Empirical Data';
    const DISEASE_VIA_ORTHOLOGY = 'Disease Associations Via Orthology';
    const DISEASE_ANNOTATION = 'Disease Annotation';

    const EXPRESSION = 'Expression';
    const ALLELES = 'Alleles';
    const PHENOTYPES = 'Phenotypes';
    const INTERACTIONS = 'Molecular Interactions';
    const SECTIONS = [
      {
        name: SUMMARY,
      },
      {
        name: SEQUENCE_FEATURE_VIEWER,
      },
      {
        name: FUNCTION,
      },
      {
        name: ORTHOLOGY,
      },
      {
        name: PHENOTYPES,
      },
      {
        name: DISEASE,
      },
      {
        name: DISEASE_VIA_EXPERIMENT,
        level: 1,
      },
      {
        name: DISEASE_VIA_ORTHOLOGY,
        level: 1,
      },
      {
        name: DISEASE_ANNOTATION,
        level: 1,
      },
      {
        name: EXPRESSION,
      },
      {
        name: ALLELES,
      },
      {
        name: INTERACTIONS,
      },
    ];

    const keywords = ['gene', data.dataProvider.replace('\n', ' '), data.symbol, ...data.synonyms, data.species.name, data.id];
    const jsonLd = [
      {
        '@context': 'http://schema.org',
        '@type': 'Dataset',
        '@id': data.id,
        name: data.symbol,
        dateCreated: new Date(data.dateProduced),
        datePublished: new Date(data.dateProduced),
        dateModified: new Date(data.dateProduced),
        description: [
          data.automatedGeneSynopsis,
          data.geneSynopsis,
          data.geneSynopsisUrl
        ].filter(a => !!a).join(' '),
        url: 'https://www.alliancegenome.org/gene/' + data.id,
        keywords: keywords.join(' '),
        includedInDataCatalog: 'https://www.alliancegenome.org',
        creator: {
          '@type': 'Organization',
          'name': 'Alliance of Genome Resources'
        },
        version: '2.0',
        license: 'CC BY 4.0',
      },
      // based on this: https://github.com/BioSchemas/specifications/tree/master/Gene/examples
      // bioschemas section
      {
        '@context': [
          {
            'bs': 'http://bioschemas.org/'
          },
          'http://schema.org',
          {
            '@base': 'http://schema.org'
          }
        ],
        '@type': [
          'bs:Gene'
        ],
        identifier: data.id,
        name: data.symbol,
        url: `https://www.alliancegenome.org/gene/${data.id}`,
        dateCreated: new Date(data.dateProduced),
        datePublished: new Date(data.dateProduced),
        dateModified: new Date(data.dateProduced),
        description: data.automatedGeneSynopsis + ' ' + (data.geneSynopsis || data.geneSynopsisUrl || ''),
        // 'sameAs': `https://zfin.org/ZDB-GENE-001103-2`, // TODO: add resolver here
      }
    ];

    return (
      <DataPage>
        <HeadMetaTags jsonLd={jsonLd} title={title} />
        <PageNav
          entityName={data.symbol}
          extra={<i>{data.species.name}</i>}
          icon={<SpeciesIcon scale={0.5} species={data.species.name} />}
          link={<DataSourceLink reference={data.crossReferences.primary} />}
          sections={SECTIONS}
        />
        <PageData>
          <PageHeader entityName={data.symbol} />

          <Subsection hideTitle title={SUMMARY}>
            <BasicGeneInfo gene={data} />
          </Subsection>

          <Subsection
            hasData={typeof genomeLocation.start !== 'undefined' && typeof genomeLocation.end !== 'undefined'}
            title={SEQUENCE_FEATURE_VIEWER}
          >
            <GenomeFeatureWrapper
              assembly={genomeLocation.assembly}
              biotype={data.soTermName}
              chromosome={genomeLocation.chromosome}
              fmax={genomeLocation.end}
              fmin={genomeLocation.start}
              geneSymbol={data.symbol}
              height='200px'
              id='genome-feature-location-id'
              primaryId={data.id}
              species={data.species.name}
              strand={genomeLocation.strand}
              synonyms={data.synonyms}
              width='600px'
            />
          </Subsection>

          <Subsection title={FUNCTION}>
            <GeneOntologyRibbon id={data.id} />
          </Subsection>

          <Subsection help={<OrthologyUserGuide />} title={ORTHOLOGY}>
            <OrthologyBasicInfo pantherCrossReference={data.crossReferences.panther} />
            <Subsection>
              <OrthologyFilteredTable geneId={data.id} />
            </Subsection>
          </Subsection>

          <Subsection title={PHENOTYPES}>
            <PhenotypeTable geneId={data.id} />
          </Subsection>

          <Subsection isMeta title={DISEASE}>
            <Subsection level={1} title={DISEASE_VIA_EXPERIMENT}>
              <GenePageDiseaseViaExperimentTable
                filename={`${data.symbol}-${data.primaryId}-DiseaseAssociationsViaEmpiricalData-${date}.tsv`}
                geneId={data.id}
              />
            </Subsection>
            <Subsection level={1} title={DISEASE_VIA_ORTHOLOGY}>
              <GenePageDiseaseViaOrthologyTable
                filename={`${data.symbol}-${data.primaryId}-DiseaseAssociationsViaOrthology-${date}.tsv`}
                geneId={data.id}
              />
            </Subsection>
            <Subsection level={1} title={DISEASE_ANNOTATION}>
              <DiseaseAnnotationTable geneId={data.id} geneSymbol={data.symbol} />
            </Subsection>
          </Subsection>

          <Subsection title={EXPRESSION}>
            <ExpressionLinks
              allExpressionCrossReference={data.crossReferences.expression}
              geneDataProvider={data.dataProvider}
              otherExpressionCrossReferences={[data.crossReferences.other_expression]}
              spellCrossReference={data.crossReferences.spell}
              wildtypeExpressionCrossReference={data.crossReferences.wild_type_expression}
            />
            <ExpressionComparisonRibbon geneId={data.id} geneSymbol={data.symbol} geneTaxon={data.species.taxonId} />
          </Subsection>

          <Subsection title={ALLELES}>
            <AlleleTable
              geneDataProvider={data.dataProvider}
              geneId={data.id}
            />
          </Subsection>

          <Subsection title={INTERACTIONS}>
            <GeneInteractionCrossReference
              crossReference={data.crossReferences.MODinteractions}
              geneDataProvider={data.dataProvider}
            />
            <GenePhysicalInteractionDetailTable
              filename={`${data.symbol}-${data.id}-Interactions-${date}.tsv`}
              focusGeneDisplayName={data.symbol}
              focusGeneId={data.id}
            />
          </Subsection>
        </PageData>
      </DataPage>
    );
  }
}

GenePage.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

function mapStateToProps (state) {
  return selectGene(state);
}

export { GenePage as GenePage };
export default connect(mapStateToProps)(GenePage);
