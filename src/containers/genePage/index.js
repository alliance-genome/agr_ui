import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchGene } from '../../actions/genes';
import { selectGene } from '../../selectors/geneSelectors';

import BasicGeneInfo from './basicGeneInfo';
import GenePageHeader from './genePageHeader';
import { OrthologyTable } from '../../components/orthology';
import DiseaseTable from '../../components/disease';
import GeneOntologyRibbon from '../../components/geneOntologyRibbon';
import Subsection from '../../components/subsection';
import HeadMetaTags from '../../components/headMetaTags';
import TranscriptInlineViewer from './transcriptInlineViewer';

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
      return <span>loading...</span>;
    }

    if (this.props.error) {
      return <div className='alert alert-danger'>{this.props.error}</div>;
    }

    if (!this.props.data) {
      return null;
    }

    let title = 'AGR gene page for ' + this.props.data.species + ' gene: ' + this.props.data.symbol;

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

        <Subsection hasData={typeof genomeLocation.start !== 'undefined' && typeof genomeLocation.end !== 'undefined'} title='Transcript Viewer'>
          <TranscriptInlineViewer
            chromosome={genomeLocation.chromosome}
            fmax={genomeLocation.end}
            fmin={genomeLocation.start}
            geneSymbol={this.props.data.symbol}
            species={this.props.data.species}
          />
        </Subsection>

        <Subsection hasData={(this.props.data.orthology || []).length > 0} title='Orthology'>
          <OrthologyTable data={this.props.data.orthology} />
        </Subsection>

        <Subsection hasData={this.props.data.diseases.length > 0} title='Disease Associations'>
          <DiseaseTable data={this.props.data.diseases} filename={`${this.props.data.symbol}-Disease-Associations-${date}`} />
        </Subsection>

        <Subsection title='Gene Ontology Ribbon'>
          <GeneOntologyRibbon db={this.props.data.dataProvider} id={this.props.data.primaryId} />
        </Subsection>

      </div>
    );
  }
}

GenePage.propTypes = {
  data: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  error: React.PropTypes.object,
  loading: React.PropTypes.bool,
  params: React.PropTypes.object,
};

function mapStateToProps(state) {
  return selectGene(state);
}

export { GenePage as GenePage };
export default connect(mapStateToProps)(GenePage);
