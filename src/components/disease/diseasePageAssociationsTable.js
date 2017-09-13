/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import { RemoteDataTable } from '../../components/dataTable';
import PropTypes from 'prop-types';
import ExternalLink from '../externalLink';

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
    const data = [
        {do_name: 'amyotrophic lateral sclerosis', do_id: 'Homo sapiens', associatedGene: 'TARDBP', associationType: 'is implicated in', source: 'RGD', references: 'PMID:56789'},
        {do_name: 'amyotrophic lateral sclerosis', do_id: 'Rattus norvegicus', associatedGene: 'Tardbp', associationType: 'is implicated in', source: 'RGD', references: 'PMID:23456'},
        {do_name: 'amyotrophic lateral sclerosis', do_id: 'Drosophila melanogaster', associatedGene: 'Sod1', associationType: 'is implicated in', source: 'FB', references: 'PMID:12345'},
        {do_name: 'amyotrophic lateral sclerosis type 10', do_id: 'Mus musculus', associatedGene: 'Ang2', associationType: 'is implicated in', source: 'MGI', references: 'PMID:12345'},
        {do_name: 'amyotrophic lateral sclerosis type 10', do_id: 'Danio rerio', associatedGene: 'angpt2b', associationType: 'is implicated in', source: 'ZFIN', references: 'PMID:34567'},
        //{do_name: 'FTDALS1', do_id: 'Saccharomyces cerevisiae', associatedGene: 'asdf', associationType: 'is implicated in', source: 'SGD', references: {'PMID:45678', 'PMID:99891'}},
    ];
    const columns = [
      {
        field: 'do_name',
        label: 'Disease & subtypes',
        sortable: true,
        format: (id) => ( <a href={`http://${this.sourceLink}/${id}`}> {id} </a> )
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
        format: (id) => ( <ExternalLink href={`http://${this.sourceLink}/${id}`}>asdf</ExternalLink> )
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
        format: (id) => ( <a href={`http://this.sourceLink/${id}`}> {this.sourceText} </a> )
      },
      {
        field: 'references',
        label: 'References',
        sortable: true,
        format: (id) => ( <a href={`http://this.sourceLink/${id}`}> {this.sourceText} </a> )
      },
    ];
    return (
      <div>
        <RemoteDataTable columns={columns} data={data} url='http://dev.alliancegenome.org/api/disease/DOID:9452/associations' />
      </div>
    );
  }
}

DiseasePageAssociationsTable.propTypes = {
  columns: PropTypes.array.isRequired,
  url: PropTypes.string,
};

export default DiseasePageAssociationsTable;
