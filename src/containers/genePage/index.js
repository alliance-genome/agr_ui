import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchGene } from '../../actions/genes';
import { selectGene } from '../../selectors/geneSelectors';

import { DataPage, PageNav, PageData, PageHeader } from '../../components/dataPage';
import BasicGeneInfo from './basicGeneInfo';
import { OrthologyFilteredTable, OrthologyUserGuide, OrthologyBasicInfo } from '../../components/orthology';
import { GenePageDiseaseTable } from '../../components/disease';
import GeneOntologyRibbon from '../../components/geneOntologyRibbon';
import LoadingPage from '../../components/loadingPage';
import NotFound from '../../components/notFound';
import Subsection from '../../components/subsection';
import AlleleTable from '../../components/alleleTable';
import DataProvider from '../../components/dataProvider';
import { GenePhysicalInteractionDetailTable } from '../../components/interaction';

import GenomeFeatureViewer from './genomeFeatureViewer';
import ExpressionLinks from './expressionLinks';

import SpeciesIcon from '../../components/speciesIcon';
import DataSourceLink from '../../components/dataSourceLink';
import PhenotypeTable from './phenotypeTable';
import { ExpressionComparisonRibbon } from '../../components/expression';

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

    const title = `${data.symbol} | ${data.species} gene`;

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
    const INTERACTIONS = 'Interactions';
    const SECTIONS = [
      SUMMARY,
      SEQUENCE_FEATURE_VIEWER,
      FUNCTION,
      ORTHOLOGY,
      PHENOTYPES,
      DISEASE,
      EXPRESSION,
      ALLELES,
      INTERACTIONS,
    ];

    return (
      <DataPage  data={data} title={title}>
        <PageNav entityName={data.symbol}
                 extra={<i>{data.species}</i>}
                 icon={<SpeciesIcon species={data.species} />}
                 link={<DataSourceLink reference={data.crossReferences.gene[0]} />}
                 sections={SECTIONS}
        />
        <PageData>
          <PageHeader entityName={data.symbol} />

          <Subsection hideTitle title={SUMMARY}>
            <BasicGeneInfo gene={data} />
          </Subsection>

          <Subsection hasData={typeof genomeLocation.start !== 'undefined' && typeof genomeLocation.end !== 'undefined'}
                      title={SEQUENCE_FEATURE_VIEWER}
          >
            <GenomeFeatureViewer
              assembly={genomeLocation.assembly}
              biotype={data.soTermName}
              chromosome={genomeLocation.chromosome}
              fmax={genomeLocation.end}
              fmin={genomeLocation.start}
              geneSymbol={data.symbol}
              height='200px'
              id='genome-feature-location-id'
              primaryId={data.primaryId}
              species={data.species}
              strand={genomeLocation.strand}
              synonyms={data.synonyms}
              width='600px'
            />
          </Subsection>

          <Subsection title={FUNCTION}>
            <GeneOntologyRibbon id={data.primaryId} />
          </Subsection>

          <Subsection title={ORTHOLOGY}>
            <OrthologyBasicInfo
              crossReferences={data.crossReferences}
              focusGeneSymbol={data.symbol}
              species={data.species}
            />
            <Subsection hasData={(data.orthology || []).length > 0}>
              <OrthologyFilteredTable data={data.orthology} />
              <OrthologyUserGuide />
            </Subsection>
          </Subsection>

          <Subsection title={PHENOTYPES}>
            <PhenotypeTable geneId={data.primaryId} />
          </Subsection>

          <Subsection hasData={(data.diseases || []).length > 0} title={DISEASE}>
            <GenePageDiseaseTable data={data.diseases}
                                  filename={`${data.symbol}-${data.primaryId}-Disease-Associations-${date}.tsv`}
            />
          </Subsection>

          <Subsection title={EXPRESSION}>
            <ExpressionLinks otherSources={data.crossReferences['gene/other_expression']}
                             primarySources={[]
                               .concat(data.crossReferences['gene/expression'])
                               .concat(data.crossReferences['gene/wild_type_expression'])
                               .concat(data.crossReferences['gene/spell'])
                             }
            />
            <ExpressionComparisonRibbon geneId={data.primaryId} geneSymbol={data.symbol} geneTaxon={data.taxonId} />
          </Subsection>

          <Subsection title={ALLELES}>
            <AlleleTable filename={`${data.symbol}-${data.primaryId}-Alleles-${date}.tsv`}
                         geneDataProvider={data.dataProvider}
                         geneId={data.primaryId}
            />
          </Subsection>
          <Subsection title={INTERACTIONS}>
            <DataProvider url={`/api/gene/${data.primaryId}/interactions`}>
              {({data: interactionData, status}) => (
                interactionData || status === 'ERROR' ? (
                  <GenePhysicalInteractionDetailTable
                    data={[
                      {
                        'primaryKey':'af9a4b79-2b5f-4b12-b3c0-100d7113226a',
                        'joinType':'molecular_interaction',
                        'geneA':{
                          'primaryKey':'MGI:97490',
                          'symbol':'Pax6',
                          'species':{
                            'species':'Mus musculus',
                            'primaryKey':'NCBITaxon:10090',
                            'name':'Mus musculus'
                          }
                        },
                        'geneB':{
                          'primaryKey':'MGI:1197010',
                          'symbol':'Sumo1',
                          'species':{
                            'species':'Mus musculus',
                            'primaryKey':'NCBITaxon:10090',
                            'name':'Mus musculus'
                          }
                        },
                        'crossReference':{
                          'crossRefCompleteUrl':'https://www.ebi.ac.uk/intact/pages/details/details.xhtml?interactionAc=EBI-15893009',
                          'localId':'EBI-15893009',
                          'globalCrossRefId':'intact:EBI-15893009',
                          'prefix':'INTACT',
                          'name':'intact:EBI-15893009',
                          'displayName':'intact:EBI-15893009',
                          'primaryKey':'intact:EBI-15893009',
                          'crossRefType':'interaction'
                        },
                        'publication':{
                          'primaryKey':'PMID:21084637',
                          'pubMedUrl':'https://www.ncbi.nlm.nih.gov/pubmed/21084637'
                        },
                        'sourceDatabase':{
                          'primaryKey':'MI:0465',
                          'label':'dip'
                        },
                        'aggregationDatabase':{
                          'primaryKey':'MI:0670',
                          'label':'imex'
                        },
                        'detectionsMethods':[
                          {
                            'primaryKey':'MI:0006',
                            'label':'anti bait coimmunoprecipitation'
                          }
                        ],
                        'interactionType':{
                          'primaryKey':'MI:0915',
                          'label':'physical association'
                        },
                        'interactionAType':{
                          'primaryKey':'MI:0326',
                          'label':'protein'
                        },
                        'interactionARole':{
                          'primaryKey':'MI:0498',
                          'label':'prey'
                        },
                        'interactionBType':{
                          'primaryKey':'MI:0326',
                          'label':'protein'
                        },
                        'interactionBRole':{
                          'primaryKey':'MI:0496',
                          'label':'bait'
                        }
                      },
                      {
                        'primaryKey':'c220a363-71da-430d-9976-92a2fad84b60',
                        'joinType':'molecular_interaction',
                        'geneA':{
                          'primaryKey':'MGI:97490',
                          'symbol':'Pax6',
                          'species':{
                            'species':'Mus musculus',
                            'primaryKey':'NCBITaxon:10090',
                            'name':'Mus musculus'
                          }
                        },
                        'geneB':{
                          'primaryKey':'MGI:1197010',
                          'symbol':'Sumo1',
                          'species':{
                            'species':'Mus musculus',
                            'primaryKey':'NCBITaxon:10090',
                            'name':'Mus musculus'
                          }
                        },
                        'crossReference':{
                          'crossRefCompleteUrl':'https://www.ebi.ac.uk/intact/pages/details/details.xhtml?interactionAc=EBI-15892975',
                          'localId':'EBI-15892975',
                          'globalCrossRefId':'intact:EBI-15892975',
                          'prefix':'INTACT',
                          'name':'intact:EBI-15892975',
                          'displayName':'intact:EBI-15892975',
                          'primaryKey':'intact:EBI-15892975',
                          'crossRefType':'interaction'
                        },
                        'publication':{
                          'primaryKey':'PMID:21084637',
                          'pubMedUrl':'https://www.ncbi.nlm.nih.gov/pubmed/21084637'
                        },
                        'sourceDatabase':{
                          'primaryKey':'MI:0465',
                          'label':'dip'
                        },
                        'aggregationDatabase':{
                          'primaryKey':'MI:0670',
                          'label':'imex'
                        },
                        'detectionsMethods':[
                          {
                            'primaryKey':'MI:0006',
                            'label':'anti bait coimmunoprecipitation'
                          }
                        ],
                        'interactionType':{
                          'primaryKey':'MI:0915',
                          'label':'physical association'
                        },
                        'interactionAType':{
                          'primaryKey':'MI:0326',
                          'label':'protein'
                        },
                        'interactionARole':{
                          'primaryKey':'MI:0496',
                          'label':'bait'
                        },
                        'interactionBType':{
                          'primaryKey':'MI:0326',
                          'label':'protein'
                        },
                        'interactionBRole':{
                          'primaryKey':'MI:0498',
                          'label':'prey'
                        }
                      },
                      {
                        'primaryKey':'bb90571a-c630-4df6-bfc0-2bf41d33c5ac',
                        'joinType':'molecular_interaction',
                        'geneA':{
                          'primaryKey':'MGI:97490',
                          'symbol':'Pax6',
                          'species':{
                            'species':'Mus musculus',
                            'primaryKey':'NCBITaxon:10090',
                            'name':'Mus musculus'
                          }
                        },
                        'geneB':{
                          'primaryKey':'MGI:1890430',
                          'symbol':'Paxip1',
                          'species':{
                            'species':'Mus musculus',
                            'primaryKey':'NCBITaxon:10090',
                            'name':'Mus musculus'
                          }
                        },
                        'crossReference':{
                          'crossRefCompleteUrl':'https://www.ebi.ac.uk/intact/pages/details/details.xhtml?interactionAc=EBI-1395470',
                          'localId':'EBI-1395470',
                          'globalCrossRefId':'intact:EBI-1395470',
                          'prefix':'INTACT',
                          'name':'intact:EBI-1395470',
                          'displayName':'intact:EBI-1395470',
                          'primaryKey':'intact:EBI-1395470',
                          'crossRefType':'interaction'
                        },
                        'publication':{
                          'primaryKey':'PMID:10908331',
                          'pubMedUrl':'https://www.ncbi.nlm.nih.gov/pubmed/10908331'
                        },
                        'sourceDatabase':{
                          'primaryKey':'MI:0486',
                          'label':'uniprot knowledge base'
                        },
                        'aggregationDatabase':{
                          'primaryKey':'MI:0670',
                          'label':'imex'
                        },
                        'detectionsMethods':[
                          {
                            'primaryKey':'MI:0018',
                            'label':'two hybrid'
                          }
                        ],
                        'interactionType':{
                          'primaryKey':'MI:0915',
                          'label':'physical association'
                        },
                        'interactionAType':{
                          'primaryKey':'MI:0326',
                          'label':'protein'
                        },
                        'interactionARole':{
                          'primaryKey':'MI:0496',
                          'label':'bait'
                        },
                        'interactionBType':{
                          'primaryKey':'MI:0326',
                          'label':'protein'
                        },
                        'interactionBRole':{
                          'primaryKey':'MI:0498',
                          'label':'prey'
                        }
                      },
                      {
                        'primaryKey':'924bec41-e3cc-43c0-b6be-0d9e42c87c9f',
                        'joinType':'molecular_interaction',
                        'geneA':{
                          'primaryKey':'MGI:97490',
                          'symbol':'Pax6',
                          'species':{
                            'species':'Mus musculus',
                            'primaryKey':'NCBITaxon:10090',
                            'name':'Mus musculus'
                          }
                        },
                        'geneB':{
                          'primaryKey':'MGI:88192',
                          'symbol':'Smarca4',
                          'species':{
                            'species':'Mus musculus',
                            'primaryKey':'NCBITaxon:10090',
                            'name':'Mus musculus'
                          }
                        },
                        'crossReference':{
                          'crossRefCompleteUrl':'https://www.ebi.ac.uk/intact/pages/details/details.xhtml?interactionAc=EBI-8509373',
                          'localId':'EBI-8509373',
                          'globalCrossRefId':'intact:EBI-8509373',
                          'prefix':'INTACT',
                          'name':'intact:EBI-8509373',
                          'displayName':'intact:EBI-8509373',
                          'primaryKey':'intact:EBI-8509373',
                          'crossRefType':'interaction'
                        },
                        'publication':{
                          'primaryKey':'PMID:16675956',
                          'pubMedUrl':'https://www.ncbi.nlm.nih.gov/pubmed/16675956'
                        },
                        'sourceDatabase':{
                          'primaryKey':'MI:0471',
                          'label':'mint'
                        },
                        'aggregationDatabase':{
                          'primaryKey':'MI:0670',
                          'label':'imex'
                        },
                        'detectionsMethods':[
                          {
                            'primaryKey':'MI:0006',
                            'label':'anti bait coimmunoprecipitation'
                          }
                        ],
                        'interactionType':{
                          'primaryKey':'MI:0915',
                          'label':'physical association'
                        },
                        'interactionAType':{
                          'primaryKey':'MI:0326',
                          'label':'protein'
                        },
                        'interactionARole':{
                          'primaryKey':'MI:0498',
                          'label':'prey'
                        },
                        'interactionBType':{
                          'primaryKey':'MI:0326',
                          'label':'protein'
                        },
                        'interactionBRole':{
                          'primaryKey':'MI:0496',
                          'label':'bait'
                        }
                      }
                    ]}
                    filename={`${data.symbol}-Interactions-${date}.tsv`}
                    focusGeneDisplayName={data.symbol}
                  />
                ) : status
              )}
            </DataProvider>
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
