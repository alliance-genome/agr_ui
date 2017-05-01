import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchData from '../../lib/fetchData';
import { fetchGene, fetchGeneSuccess, fetchGeneFailure } from '../../actions/genes';
import { selectGene } from '../../selectors/geneSelectors';

import BasicGeneInfo from './basicGeneInfo';
import GenePageHeader from './genePageHeader';
import { OrthologyTable, mockOrthologData } from '../../components/orthology';
import DiseaseTable from '../../components/disease';
import Subsection from '../../components/subsection';
import HeadMetaTags from '../../components/headMetaTags';
import TranscriptInlineViewer from './transcriptInlineViewer';

class GenePage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchGene());
    fetchData(`/api/gene/${this.props.params.geneId}`)
      .then(data => this.props.dispatch(fetchGeneSuccess(data)))
      .catch(error => this.props.dispatch(fetchGeneFailure(error)));
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
    let genomeLocation ;
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

    return (
      <div className='container'>
        <HeadMetaTags title={title} />
        <GenePageHeader symbol={this.props.data.symbol} />

        <Subsection>
          <BasicGeneInfo geneData={this.props.data} />
        </Subsection>


        <Subsection title='Transcript Viewer'>
          {genomeLocation && genomeLocation.start && genomeLocation.end
            ?
            <TranscriptInlineViewer
              chromosome={genomeLocation.chromosome}
              fmax={genomeLocation.end}
              fmin={genomeLocation.start}
              geneSymbol={this.props.data.symbol}
              species={this.props.data.species}
            />
            :
            <div className="alert alert-warning">Genome Location Data Unavailable</div>
          }
        </Subsection>

        <br />

        {/*<Subsection title='Transcript Viewer'>*/}
          {/*{genomeLocation*/}
            {/*?*/}
            {/*<TranscriptViewer geneSymbol={this.props.data.symbol} species={this.props.data.species} fmin={genomeLocation.fmin } fmax={genomeLocation.fmax} chromosome={genomeLocation.chromosome}/>*/}
            {/*:*/}
            {/*<div className="alert alert-warning">Genome Location Data Unavailable</div>*/}
          {/*}*/}
        {/*</Subsection>*/}

        <Subsection hardcoded title='Orthology'>
          <OrthologyTable data={mockOrthologData} />
        </Subsection>

        <Subsection hardcoded title='Disease Associations'>
          <DiseaseTable />
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
