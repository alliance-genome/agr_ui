import React, {Component} from 'react';
import PropTypes from 'prop-types';

import DataSourceLink from '../../components/dataSourceLink';
import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';
import SpeciesIcon from '../../components/speciesIcon';

import style from './style.scss';

class DataSourceCard extends Component {
  render() {
    const { species, reference } = this.props;
    const listClass = 'col-12';
    const labelClass = 'col-lg-3';
    const valueClass = 'col-lg-9';
    return (
      <div className='card'>
        <div className={style.iconContainer}>
          <SpeciesIcon species={species} />
        </div>
        <div className='card-body'>
          <AttributeList bsClassName={listClass}>
            <AttributeLabel bsClassName={labelClass}>Species</AttributeLabel>
            <AttributeValue bsClassName={valueClass}><i>{species}</i></AttributeValue>

            <AttributeLabel bsClassName={labelClass}>Source</AttributeLabel>
            <AttributeValue bsClassName={valueClass}>
              <DataSourceLink reference={reference} />
            </AttributeValue>
          </AttributeList>
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
