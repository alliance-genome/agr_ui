import React, {Component} from 'react';
import PropTypes from 'prop-types';

import DataSourceCard from './dataSourceCard';
import DataSourceLink from '../../components/dataSourceLink';

class BasicGeneInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geneData: this.props.geneData,
    };
  }

  placeholder() {
    return <i className='text-muted'>Not Available</i>;
  }

  placeholderIfBlank(text) {
    if (text) {
      return text;
    }
    return this.placeholder();
  }

  renderDescription() {
    if (!this.state.geneData.geneSynopsis && !this.state.geneData.geneSynopsisUrl) {
      return this.placeholder();
    }
    return (
      <div>
        {this.state.geneData.geneSynopsis &&
          <p>{this.state.geneData.geneSynopsis}</p>}
        {this.state.geneData.geneSynopsisUrl &&
          <a href={this.state.geneData.geneSynopsisUrl}>{this.state.geneData.geneSynopsisUrl}</a>}
      </div>
    );
  }

  renderCrossReferenceList() {
    let refs = this.state.geneData.crossReferences;
    if (!refs || refs.length < 1) {
      return this.placeholder();
    }
    return refs
      .sort((a, b) => `${a.dataProvider}:${a.id}`.localeCompare(`${b.dataProvider}:${b.id}`))
      .map((ref, idx) => {
        return (
          <div key={`ref-${idx}`}>
            <DataSourceLink reference={ref} />
          </div>
        );
      });
  }

  render() {
    return (
      <div className='row'>
        <div className='col-sm-4 push-sm-8'>
          <DataSourceCard reference={this.state.geneData.modCrossReference} species={this.state.geneData.species} />
        </div>
        <div className='col-sm-8 pull-sm-4'>
          <dl className='row'>
            <dt className='col-sm-3'>Symbol</dt>
            <dd className='col-sm-9' id='symbol-value'>{this.state.geneData.symbol}</dd>

            <dt className='col-sm-3'>Name</dt>
            <dd className='col-sm-9'>{this.placeholderIfBlank(this.state.geneData.name)}</dd>

            <dt className='col-sm-3'>Synonyms</dt>
            <dd className='col-sm-9'>{this.placeholderIfBlank(
                this.state.geneData.synonyms ? this.state.geneData.synonyms.join(', ') : ''
            )}</dd>

            <dt className='col-sm-3'>Biotype</dt>
            <dd className='col-sm-9'>{this.placeholderIfBlank(this.state.geneData.soTermName.replace(/_/g, ' '))}</dd>

            <dt className='col-sm-3'>Description</dt>
            <dd className='col-sm-9'>{this.renderDescription()}</dd>

            <dt className='col-sm-3'>Genomic Resources</dt>
            <dd className='col-sm-9'>{this.renderCrossReferenceList()}</dd>

            <dt className='col-sm-3'>Additional Information</dt>
            <dd className='col-sm-9'><a href={this.state.geneData.geneLiteratureUrl}>Literature</a></dd>
          </dl>
        </div>
      </div>
    );
  }
}

BasicGeneInfo.propTypes = {
  geneData: PropTypes.object
};

export default BasicGeneInfo;
