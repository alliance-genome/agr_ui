import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchGene } from '../../actions/genes';
import { selectGene } from '../../selectors/geneSelectors';

import { DataPage, PageNav, PageData, PageHeader } from '../../components/dataPage';
import BasicGeneInfo from './basicGeneInfo';
import { OrthologyFilteredTable, OrthologyUserGuide, OrthologyBasicInfo } from '../../components/orthology';


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
import { DiseaseComparisonRibbon } from '../../components/disease';
import HeadMetaTags from '../../components/headMetaTags';
import { ProteinWidget } from '@gmod/jbrowse-protein-widget';
import SimpleFeature from '@gmod/jbrowse-core/dist/util/simpleFeature';


const data  = { 'protein': { 'name': 'KRAS', 'sequences': { 'aminoAcid': 'MTEYKLVVVGAGGVGKSALTIQLIQNHFVDEYDPTIEDSYRKQVVIDGETCLLDILDTAGQEEYSAMRDQYMRTGEGFLCVFAINNTKSFEDIHHYREQIKRVKDSEDVPMVLVGNKCDLPSRTVDTKQAQDLARSYGIPFIETSAKTRQGVDDAFYTLVREIRKHKEKMSKDGKKKKKKSKTKCVIM', 'translatedDna': 'ATGACTGAATATAAACTTGTGGTAGTTGGAGCTGGTGGCGTAGGCAAGAGTGCCTTGACGATACAGCTAATTCAGAATCATTTTGTGGACGAATATGATCCAACAATAGAGGATTCCTACAGGAAGCAAGTAGTAATTGATGGAGAAACCTGTCTCTTGGATATTCTCGACACAGCAGGTCAAGAGGAGTACAGTGCAATGAGGGACCAGTACATGAGGACTGGGGAGGGCTTTCTTTGTGTATTTGCCATAAATAATACTAAATCATTTGAAGATATTCACCATTATAGAGAACAAATTAAAAGAGTTAAGGACTCTGAAGATGTACCTATGGTCCTAGTAGGAAATAAATGTGATTTGCCTTCTAGAACAGTAGACACAAAACAGGCTCAGGACTTAGCAAGAAGTTATGGAATTCCTTTTATTGAAACATCAGCAAAGACAAGACAGGGTGTTGATGATGCCTTCTATACATTAGTTCGAGAAATTCGAAAACATAAAGAAAAGATGAGCAAAGATGGTAAAAAGAAGAAAAAGAAGTCAAAGACAAAGTGTGTAATTATG' } }, 'domains': [ { 'uniqueId': 'IPR001806_5_164', 'start': 5, 'end': 164, 'refName': 'KRAS', 'type': 'Small_GTPase' }, { 'uniqueId': 'IPR005225_1_159', 'start': 1, 'end': 159, 'refName': 'KRAS', 'type': 'Small_GTP-bd_dom' }, { 'uniqueId': 'IPR020849_1_188', 'start': 1, 'end': 188, 'refName': 'KRAS', 'type': 'Small_GTPase_Ras-type' }, { 'uniqueId': 'IPR027417_3_181', 'start': 3, 'end': 181, 'refName': 'KRAS', 'type': 'P-loop_NTPase' } ], 'variants': [ { 'uniqueId': 'COSM4413602', 'start': 188, 'end': 189, 'refName': 'KRAS', 'score': 1 }, { 'uniqueId': 'COSM1256062', 'start': 185, 'end': 186, 'refName': 'KRAS', 'score': 1 }, { 'uniqueId': 'COSM1562192', 'start': 117, 'end': 118, 'refName': 'KRAS', 'score': 24 }, { 'uniqueId': 'COSM19940', 'start': 117, 'end': 118, 'refName': 'KRAS', 'score': 20 }, { 'uniqueId': 'COSM28519', 'start': 117, 'end': 118, 'refName': 'KRAS', 'score': 35 }, { 'uniqueId': 'COSM4696721', 'start': 117, 'end': 118, 'refName': 'KRAS', 'score': 3 }, { 'uniqueId': 'COSM4696722', 'start': 117, 'end': 118, 'refName': 'KRAS', 'score': 3 }, { 'uniqueId': 'COSM6854421', 'start': 117, 'end': 118, 'refName': 'KRAS', 'score': 3 }, { 'uniqueId': 'COSM5882217', 'start': 116, 'end': 117, 'refName': 'KRAS', 'score': 1 }, { 'uniqueId': 'COSM5882218', 'start': 116, 'end': 117, 'refName': 'KRAS', 'score': 1 }, { 'uniqueId': 'COSM6438035', 'start': 115, 'end': 116, 'refName': 'KRAS', 'score': 1 }, { 'uniqueId': 'COSM6474356', 'start': 114, 'end': 115, 'refName': 'KRAS', 'score': 1 }, { 'uniqueId': 'COSM6474357', 'start': 114, 'end': 115, 'refName': 'KRAS', 'score': 1 }, { 'uniqueId': 'COSM6963380', 'start': 110, 'end': 112, 'refName': 'KRAS', 'score': 1 }, { 'uniqueId': 'COSM6963381', 'start': 110, 'end': 112, 'refName': 'KRAS', 'score': 1 }, { 'uniqueId': 'COSM6921567', 'start': 111, 'end': 112, 'refName': 'KRAS', 'score': 1 }, { 'uniqueId': 'COSM6921568', 'start': 111, 'end': 112, 'refName': 'KRAS', 'score': 1 }, { 'uniqueId': 'COSM7288840', 'start': 111, 'end': 112, 'refName': 'KRAS', 'score': 1 }, { 'uniqueId': 'COSM7288841', 'start': 111, 'end': 112, 'refName': 'KRAS', 'score': 1 }, { 'uniqueId': 'COSM1586382', 'start': 110, 'end': 111, 'refName': 'KRAS', 'score': 1 }, { 'uniqueId': 'COSM938159', 'start': 110, 'end': 111, 'refName': 'KRAS', 'score': 1 }, { 'uniqueId': 'COSM6845113', 'start': 109, 'end': 110, 'refName': 'KRAS', 'score': 1 }, { 'uniqueId': 'COSM6438041', 'start': 108, 'end': 109, 'refName': 'KRAS', 'score': 2 }, { 'uniqueId': 'COSM6438037', 'start': 107, 'end': 108, 'refName': 'KRAS', 'score': 1 }, { 'uniqueId': 'COSM504059', 'start': 101, 'end': 103, 'refName': 'KRAS', 'score': 1 }, { 'uniqueId': 'COSM6986186', 'start': 99, 'end': 100, 'refName': 'KRAS', 'score': 1 }, ] };
const TestGenomeApp = () => {
  const widget = new ProteinWidget(data);
  console.log('widget imported and in theory rendering',widget);
  return (
    <>
      <h1>Demo of manually calling feature renderer with supplied JSON</h1>
      <ExampleFeatureRendering />
      {/*<h1>Demo of manually calling feature renderer with NCList source data</h1>*/}
      {/*<NclistFeatureRendering />*/}
    </>
  );
};

// const FeatureRendering = ({ features, region, width, height }) => (
//   <Rendering
//     width={width}
//     height={height}
//     region={region}
//     layout={new GranularRectLayout({ pitchX: 1, pitchY: 1 })}
//     features={features}
//     config={SvgRendererConfigSchema.create({})}
//     bpPerPx={(region.end - region.start) / width}
//   />
// )
//
function ExampleFeatureRendering() {
  // const region = {
  //   refName: 'chr1',
  //   start: 1,
  //   end: 100,
  // };
  const feat1 = new SimpleFeature({
    id: 'feat1',
    data: {
      refName: 'chr1',
      name: 'BRCA1',
      start: 5,
      end: 90,
    },
  });
  const feat2 = new SimpleFeature({
    id: 'feat2',
    data: {
      refName: 'chr1',
      name: 'BRCA2',
      start: 30,
      end: 95,
    },
  });

  console.log([feat1, feat2]);

  return (
    <div>asdfasdfadsf</div>
  );
}

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

    // TODO: this name should come directly from the API
    if (data.crossReferences['expression-atlas']) {
      data.crossReferences['expression-atlas'].name = 'Expression Atlas';
    }

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
            <TestGenomeApp/>

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

          <Subsection title={DISEASE}>
            <DiseaseComparisonRibbon geneId={data.id} geneSymbol={data.symbol} geneTaxon={data.species.taxonId} />
          </Subsection>

          <Subsection title={EXPRESSION}>
            <ExpressionLinks
              allExpressionCrossReference={data.crossReferences.expression}
              geneDataProvider={data.dataProvider}
              otherExpressionCrossReferences={[data.crossReferences.other_expression, data.crossReferences['expression-atlas']]}
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
