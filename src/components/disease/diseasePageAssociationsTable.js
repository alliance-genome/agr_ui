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
        field: 'primaryKey',
        label: 'Disease Name',
        sortable: true,
      },
      {
        field: 'diseaseID',
        label: 'DO ID',
        isKey: true,
        sortable: true,
        format: (id) => id + '!!!'
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
        <RemoteDataTable
          columns={columns}
          currentPage={this.props.currentPage}
          data={this.props.associations}
          dispatch={this.props.dispatch}
          id={this.props.id}
          perPageSize={this.props.perPageSize}
          totalAssociations={this.props.totalAssociations}
          totalPages={this.props.totalPages}
        />
      </div>
    );
  }
}

DiseasePageAssociationsTable.propTypes = {
  associations: PropTypes.arrayOf(PropTypes.object),
  currentPage: PropTypes.number,
  disease: PropTypes.object,
  dispatch: PropTypes.func,
  id: PropTypes.string,
  perPageSize: PropTypes.number,
  totalAssociations: PropTypes.number,
  totalPages: PropTypes.number,

};

export default DiseasePageAssociationsTable;
