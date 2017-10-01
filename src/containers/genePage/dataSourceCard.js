import React, {Component} from 'react';
import PropTypes from 'prop-types';

import DataSourceLink from '../../components/dataSourceLink';
import PrimaryAttributesList from '../../components/primaryAttributesList';
import SpeciesIcon from '../../components/speciesIcon';

import style from './style.css';

class DataSourceCard extends Component {
  render() {
    const attrs = [
      {
        field: 'species',
        format: s => <i>{s}</i>,
      },
      {
        field: 'reference',
        format: r => <DataSourceLink reference={r} />,
        name: 'Primary Source',
      }
    ];

    return (
      <div className='card'>
        <div className={style.iconContainer}>
          <SpeciesIcon species={this.props.species} />
        </div>
        <div className='card-block'>
          <PrimaryAttributesList attributes={attrs} data={this.props} termWidth='5' />
        </div>
      </div>
    );
  }
}

DataSourceCard.propTypes = {
  reference: PropTypes.object.isRequired,
  species: PropTypes.string.isRequired,
};

export default DataSourceCard;
