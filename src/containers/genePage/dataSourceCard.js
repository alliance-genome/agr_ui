import React, {Component} from 'react';

import DataSourceLink from '../../components/dataSourceLink';

import style from './style.css';

class DataSourceCard extends Component {
  render() {
    const speciesClass = style[this.props.species.replace(' ', '-')];

    return (
      <div className='card'>
        {speciesClass && <div className={`${style.speciesIcon} ${speciesClass}`} />}
        <div className='card-block'>
          <dl className='row'>
            <dt className='col-sm-5'>Species</dt>
            <dd className='col-sm-7'><i>{this.props.species}</i></dd>
            <dt className='col-sm-5'>Primary Source</dt>
            <dd className='col-sm-7'>
              <DataSourceLink reference={this.props.reference} />
            </dd>
          </dl>
        </div>
      </div>
    );
  }
}

DataSourceCard.propTypes = {
  reference: React.PropTypes.object.isRequired,
  species: React.PropTypes.string.isRequired,
};

export default DataSourceCard;
