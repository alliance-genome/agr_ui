/* eslint-disable react/no-set-state */

import React, { Component } from 'react';
import { Link } from 'react-router';

import ReferenceCell from './referenceCell';

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

  renderDiseaseName(name, row) {
    return <Link to={'/disease/' + row.diseaseID}>{name}</Link>;
  }

  renderGeneLink(gene) {
    return <Link to={'/gene/' + gene.primaryId}>{gene.symbol}</Link>;
  }

  render() {

    const columns = [
      {
        field: 'diseaseID',
        label: 'DO ID',
        isKey: true,
        hidden: true,
      },
      {
        field: 'diseaseName',
        label: 'Disease & Subtypes',
        format: this.renderDiseaseName,
        sortable: true,
      },
      {
        field: 'disease_species',
        label: 'Species',
        format: (species) => <i>{species.name}</i>,
        sortable: true,
      },
      {
        field: 'geneDocument',
        label: 'Associated Gene',
        format: this.renderGeneLink,
        sortable: true,
      },
      {
        field: 'associationType',
        label: 'Association Type',
        format: (type) => type.replace(/_/g, ' '),
      },
      {
        field: 'source',
        label: 'Source',
        width: '100px',
      },
      {
        field: 'publications',
        label: 'References',
        format: ReferenceCell,
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
          sortName={this.props.sortName}
          sortOrder={this.props.sortOrder}
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
  sortName: PropTypes.string,
  sortOrder: PropTypes.string,
  totalAssociations: PropTypes.number,
  totalPages: PropTypes.number,
};

export default DiseasePageAssociationsTable;
