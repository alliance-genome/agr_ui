import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  DiseaseNameCell,
  GeneticEntityCell,
  EvidenceCodesCell,
  ReferenceCell,
  RemoteDataTable
} from '../../components/dataTable';
import { selectDiseaseViaEmpirical } from '../../selectors/geneSelectors';
import { fetchDiseaseViaEmpirical } from '../../actions/genes';
import ExternalLink from '../externalLink';

class GenePageDiseaseTable extends Component {

  loadData(opts) {
    const { dispatch, geneId } = this.props;
    dispatch(fetchDiseaseViaEmpirical(geneId, opts));
  }

  render() {
    const { diseases, geneId } = this.props;

    const data = diseases.data && diseases.data.map(annotation => ({
      disease: annotation.disease,
      geneticEntity: annotation.allele,
      associationType: annotation.associationType.replace(/_/g, ' '),
      geneticEntityType: annotation.geneticEntityType,
      source: annotation.source,
      evidenceCodes: annotation.evidenceCodes,
      publications: annotation.publications,
    }));

    const refsText = (refs) => {
      return refs.map(ref => ref.pubMedId || ref.pubModId || '').join(', ');
    };

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
        field: 'geneticEntity',
        label: 'Genetic Entity',
        format: GeneticEntityCell,
        sortable: true,
        filterable: true,
        width: '185px',
      },
      {
        field: 'geneticEntityType',
        label: 'Genetic Entity Type',
        sortable: true,
        filterable: true,
        width: '110px',
      },
      {
        field: 'associationType',
        label: 'Association',
        sortable: true,
        filterable: true,
        width: '110px',
      },
      {
        field: 'evidenceCodes',
        label: 'Evidence Code',
        format: EvidenceCodesCell,
        asText: EvidenceCodesCell,
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
        asText: refsText,
        sortable: true,
        filterable: true,
        width: '150px',
      }
    ];

    return (
      <RemoteDataTable
        columns={columns}
        data={data}
        downloadUrl={`/api/gene/${geneId}/diseases-by-experiment/download`}
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
    diseases: selectDiseaseViaEmpirical(state),
  };
}

export default connect(mapStateToProps)(GenePageDiseaseTable);
