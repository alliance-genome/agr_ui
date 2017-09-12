import React, {Component} from 'react';
import PropTypes from 'prop-types';

import DataSourceLink from '../../components/dataSourceLink';
import PrimaryAttributesList from '../../components/primaryAttributesList';

import style from './style.css';

class DataSourceCard extends Component {
  render() {
    const speciesClass = style[this.props.species.replace(' ', '-')];
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
        {speciesClass && <div className={`${style.speciesIcon} ${speciesClass}`} />}
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
