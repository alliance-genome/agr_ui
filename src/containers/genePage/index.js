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

class GenePage extends Component {

  componentDidMount() {
    this.props.dispatch(fetchGene(this.props.params.geneId));
  }

  componentDidUpdate(prevProps) {
    if (this.props.params.geneId !== prevProps.params.geneId) {
      this.props.dispatch(fetchGene(this.props.params.geneId));
    }
  }

  render() {
    if (this.props.loading) {
      return <LoadingPage />;
    }

    if (this.props.error) {
      return <NotFound />;
    }

    if (!this.props.data) {
      return null;
    }

    const title = `${this.props.data.symbol} | ${this.props.data.species} gene`;

    // todo, add chromosome
    let genomeLocation = {};
    if(this.props.data.genomeLocations){
      if(this.props.data.genomeLocations.length==1){
        genomeLocation = this.props.data.genomeLocations[0];
      }
      else
      if(this.props.data.genomeLocations.length>1){
        // TODO: figure out the proper assembly
        for(var i in this.props.data.genomeLocations){
          let tempGenomeLocation = this.props.data.genomeLocations[i];
          if(tempGenomeLocation.start && tempGenomeLocation.end){
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
        <GenePageHeader symbol={this.props.data.symbol} />

        <Subsection>
          <BasicGeneInfo geneData={this.props.data} />
        </Subsection>

        <Subsection hasData={typeof genomeLocation.start !== 'undefined' && typeof genomeLocation.end !== 'undefined'} title='Sequence Feature Viewer'>
          <GenomeFeatureViewer
            assembly={genomeLocation.assembly}
            biotype={this.props.data.soTermName}
            chromosome={genomeLocation.chromosome}
            fmax={genomeLocation.end}
            fmin={genomeLocation.start}
            geneSymbol={this.props.data.symbol}
            height='200px'
            id='genome-feature-location-id'
            primaryId={this.props.data.primaryId}
            species={this.props.data.species}
            strand={genomeLocation.strand}
            synonyms={this.props.data.synonyms}
            width='600px'
          />
        </Subsection>

        <Subsection title='Function – GO Annotations'>
          <GeneOntologyRibbon id={this.props.data.primaryId} />
        </Subsection>

        <Subsection title='Orthology'>
          <OrthologyBasicInfo
            crossReferences={this.props.data.crossReferences}
            focusGeneSymbol={this.props.data.symbol}
            species={this.props.data.species}
          />
          <Subsection hasData={(this.props.data.orthology || []).length > 0}>
            <OrthologyFilteredTable data={this.props.data.orthology} />
            <OrthologyUserGuide />
          </Subsection>
        </Subsection>

        <Subsection hasData={(this.props.data.diseases || []) .length > 0} title='Disease Associations'>
          <GenePageDiseaseTable data={this.props.data.diseases} filename={`${this.props.data.symbol}-Disease-Associations-${date}`} />
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

function mapStateToProps(state) {
  return selectGene(state);
}

export { GenePage as GenePage };
export default connect(mapStateToProps)(GenePage);
