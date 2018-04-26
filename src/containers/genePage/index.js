import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchGene } from '../../actions/genes';
import { selectGene } from '../../selectors/geneSelectors';

import BasicGeneInfo from './basicGeneInfo';
import GenePageHeader from './genePageHeader';
import { OrthologyFilteredTable, OrthologyUserGuide, OrthologyBasicInfo } from '../../components/orthology';
import { GenePageDiseaseTable } from '../../components/disease';
import GeneOntologyRibbon from '../../components/geneOntologyRibbon';
import LoadingPage from '../../components/loadingPage';
import NotFound from '../../components/notFound';
import Subsection from '../../components/subsection';
import HeadMetaTags from '../../components/headMetaTags';

import GenomeFeatureViewer from './genomeFeatureViewer';
import ExpressionLinks from './expressionLinks';

class GenePage extends Component {

  componentDidMount () {
    this.props.dispatch(fetchGene(this.props.params.geneId));
  }

  componentDidUpdate (prevProps) {
    if (this.props.params.geneId !== prevProps.params.geneId) {
      this.props.dispatch(fetchGene(this.props.params.geneId));
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

    return (
      <div className='container'>
        <HeadMetaTags title={title} />
        <GenePageHeader symbol={data.symbol} />

        <Subsection>
          <BasicGeneInfo geneData={data} />
        </Subsection>

        <Subsection hasData={typeof genomeLocation.start !== 'undefined' && typeof genomeLocation.end !== 'undefined'}
                    title='Sequence Feature Viewer'
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

        <Subsection title='Function – GO Annotations'>
          <GeneOntologyRibbon id={data.primaryId} slim='agr' />
        </Subsection>

        <Subsection title='Orthology'>
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

        <Subsection hasData={(this.props.data.diseases || []).length > 0} title='Disease Associations'>
          <GenePageDiseaseTable data={this.props.data.diseases} filename={`${this.props.data.symbol}-Disease-Associations-${date}.tsv`} />
        </Subsection>

        <Subsection title='Expression'>
          <ExpressionLinks allExpressionLink={data.crossReferences['gene/expression']}
                           otherExpressionLinks={data.crossReferences['gene/other_expression']}
                           wildTypeExpressionLink={data.crossReferences['gene/wild_type_expression']}
          />
        </Subsection>
      </div>
    );
  }
}

GenePage.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
  params: PropTypes.object,
};

function mapStateToProps (state) {
  return selectGene(state);
}

export { GenePage as GenePage };
export default connect(mapStateToProps)(GenePage);
