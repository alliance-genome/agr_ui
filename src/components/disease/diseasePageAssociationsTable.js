/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import { RemoteDataTable } from '../../components/dataTable';
import PropTypes from 'prop-types';

class DiseasePageAssociationsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideExtra: true
    };
    this.handleToggleExtra = this.handleToggleExtra.bind(this);
  }

  handleToggleExtra() {
    this.setState({
      hideExtra: !this.state.hideExtra
    });
  }

  render() {
    const columns = [
      {
        field: 'do_name',
        label: 'Disease Name',
        sortable: true,
      },
      {
        field: 'do_id',
        label: 'DO ID',
        isKey: true,
        sortable: true,
        format: (id) => id + '!'
      },
      {
        field: 'associationType',
        label: 'Association',
        sortable: true,
        hidden: this.state.hideExtra,
      }
    ];
    return (
      <div>
        <div className='checkbox pull-right'>
          <label>
            <input checked={!this.state.hideExtra} onChange={this.handleToggleExtra} type='checkbox' />
            Show addition information
          </label>
        </div>
        <RemoteDataTable columns={columns} />
      </div>
    );
  }
}

DiseasePageAssociationsTable.propTypes = {
//  columns: PropTypes.array.isRequired,
  dispatch: PropTypes.func,
  url: PropTypes.string,

};

export default DiseasePageAssociationsTable;
