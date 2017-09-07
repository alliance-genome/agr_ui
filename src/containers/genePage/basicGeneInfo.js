import React, {Component} from 'react';
import PropTypes from 'prop-types';

import DataSourceCard from './dataSourceCard';
import DataSourceLink from '../../components/dataSourceLink';
import PrimaryAttributesList from '../../components/primaryAttributesList';

class BasicGeneInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geneData: this.props.geneData,
    };
  }

  renderDescription(_, data) {
    if (!data.geneSynopsis && !data.geneSynopsisUrl) {
      return '';
    }
    return (
      <div>
        {data.geneSynopsis && <p>{data.geneSynopsis}</p>}
        {data.geneSynopsisUrl &&
          <a href={data.geneSynopsisUrl}>{data.geneSynopsisUrl}</a>}
      </div>
    );
  }

  renderCrossReferenceList(_, data) {
    let refs = data.crossReferences;
    if (!refs || refs.length < 1) {
      return '';
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
    const attrs = [
      {
        field: 'symbol'
      },
      {
        field: 'name'
      },
      {
        field: 'synonyms',
        format: s => s ? s.join(', ') : ''
      },
      {
        field: 'soTermName',
        format: s => s.replace(/_/g, ' '),
        name: 'Biotype',
      },
      {
        format: this.renderDescription,
        name: 'Description',
      },
      {
        format: this.renderCrossReferenceList,
        name: 'Genomic Resources',
      },
      {
        field: 'geneLiteratureUrl',
        format: s => <a href={s}>Literature</a>,
        name: 'Additional Information'
      },
    ];
    return (
      <div className='row'>
        <div className='col-sm-4 push-sm-8'>
          <DataSourceCard reference={this.state.geneData.modCrossReference} species={this.state.geneData.species} />
        </div>
        <div className='col-sm-8 pull-sm-4'>
          <PrimaryAttributesList attributes={attrs} data={this.state.geneData} />
        </div>
      </div>
    );
  }
}

BasicGeneInfo.propTypes = {
  geneData: PropTypes.object
};

export default BasicGeneInfo;
