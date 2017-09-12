/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import { RemoteDataTable } from '../../components/dataTable';
import PropTypes from 'prop-types';

class DiseasePageAssociationsTable extends Component {
  constructor(props) {
    super(props);

    this.sourceLink = {'FB': 'flybase'};
    this.sourceText = 'FB';

    this.state = {
      showCheckbox : false,
      hideExtra: true,
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
        label: 'Disease & subtypes',
        sortable: true,
        format: (id) => ( <a href={ `http://${this.sourceLink}/${id}` }> {id} </a> )
      },
      {
        field: 'do_id',
        label: 'Species',
        isKey: true,
        sortable: true,
      },
      {
        field: 'associatedGene',
        label: 'Associated Gene',
        sortable: true,
        format: (id) => ( <a href={ `http://this.sourceLink/${id}` }> {this.sourceText} </a> )
      },
      {
        field: 'associationType',
        label: 'Association Type',
        sortable: true,
      },
      {
        field: 'source',
        label: 'Sources',
        sortable: true,
        format: (id) => ( <a href={ `http://this.sourceLink/${id}` }> {this.sourceText} </a> )
      },
      {
        field: 'references',
        label: 'References',
        sortable: true,
        format: (id) => ( <a href={ `http://this.sourceLink/${id}` }> {this.sourceText} </a> )
      },
    ];
    return (
      <div>
        <RemoteDataTable columns={columns} url='http://localhost:3000/diseases' />
      </div>
    );
  }
}

DiseasePageAssociationsTable.propTypes = {
// columns: PropTypes.array.isRequired,
  url: PropTypes.string,
};

export default DiseasePageAssociationsTable;
