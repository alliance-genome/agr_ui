import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  DiseaseNameCell,
  EvidenceCodesCell,
  ReferenceCell,
  RemoteDataTable
} from '../../components/dataTable';
import { fetchDiseaseViaOrthology } from '../../actions/genes';
import { selectDiseaseViaOrthology } from '../../selectors/geneSelectors';
import ExternalLink from '../externalLink';

class GenePageDiseaseTable extends Component {

  loadData(opts) {
    const { dispatch, geneId } = this.props;
    dispatch(fetchDiseaseViaOrthology(geneId, opts));
  }

  render() {
    const { diseases, geneId } = this.props;

    const data = diseases.data && diseases.data.map(annotation => ({
      disease: annotation.disease,
      associationType: annotation.associationType.replace(/_/g, ' '),
      orthologyGene: annotation.orthologyGene,
      orthologyGeneSpecies: annotation.orthologyGene.species.name,
      source: annotation.source,
      evidenceCodes: annotation.evidenceCodes,
      publications: annotation.publications,
    }));

    const columns = [
      {
        field: 'disease',
        label: 'Disease',
        format: DiseaseNameCell,
        isKey: true,
        sortable: true,
        filterable: true,
        width: '150px',
      },
      {
        field: 'associationType',
        label: 'Association',
        sortable: true,
        filterable: true,
        width: '110px',
      },
      {
        field: 'orthologyGene',
        label: 'Ortholog',
        format: ({id, symbol}) => <Link to={`/gene/${id}`}>{symbol}</Link>,
        sortable: true,
        filterable: true,
        width: '110px',
      },
      {
        field: 'orthologyGeneSpecies',
        label: 'Ortholog Species',
        format: (species) => species ? <i>{species}</i> : '',
        sortable: true,
        filterable: true,
        width: '150px',
      },
      {
        field: 'evidenceCodes',
        label: 'Evidence Code',
        format: EvidenceCodesCell,
        sortable: true,
        filterable: true,
        width: '75px',
      },
      {
        field: 'source',
        label: 'Source',
        format: ({name, url}) => <ExternalLink href={url}>{name}</ExternalLink>,
        sortable: true,
        filterable: true,
        width: '75px',
      },
      {
        field: 'publications',
        label: 'References',
        format: ReferenceCell,
        sortable: true,
        filterable: true,
        width: '150px',
      }
    ];

    return (
      <RemoteDataTable
        columns={columns}
        data={data}
        downloadUrl={`/api/gene/${geneId}/diseases-via-orthology/download`}
        loading={diseases.loading}
        onUpdate={this.loadData.bind(this)}
        totalRows={diseases.total}
      />
    );
  }
}

GenePageDiseaseTable.propTypes = {
  diseases: PropTypes.object,
  dispatch: PropTypes.func,
  filename: PropTypes.string,
  geneId: PropTypes.string.isRequired,
};

function mapStateToProps (state) {
  return {
    diseases: selectDiseaseViaOrthology(state),
  };
}

export default connect(mapStateToProps)(GenePageDiseaseTable);

