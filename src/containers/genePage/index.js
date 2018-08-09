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

import GenomeFeatureViewer from './genomeFeatureViewer';
import ExpressionLinks from './expressionLinks';

import SpeciesIcon from '../../components/speciesIcon';
import DataSourceLink from '../../components/dataSourceLink';
import PhenotypeTable from './phenotypeTable';

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
    const SECTIONS = [SUMMARY, SEQUENCE_FEATURE_VIEWER, FUNCTION, ORTHOLOGY, PHENOTYPES, DISEASE, EXPRESSION, ALLELES];

    return (
      <DataPage title={title}>
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
            <GeneOntologyRibbon id={data.primaryId} slim='agr' />
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

          <Subsection hasData={(data.phenotypes || []).length > 0} title={PHENOTYPES}>
            <PhenotypeTable geneId={data.primaryId} />
          </Subsection>

          <Subsection hasData={(data.diseases || []).length > 0} title={DISEASE}>
            <GenePageDiseaseTable data={data.diseases}
                                  filename={`${data.symbol}-Disease-Associations-${date}.tsv`}
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
          </Subsection>

          <Subsection title={ALLELES}>
            <AlleleTable filename={`${data.symbol}-Alleles-${date}.tsv`}
                         geneDataProvider={data.dataProvider}
                         geneId={data.primaryId}
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
