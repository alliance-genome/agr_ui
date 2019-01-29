/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchAssociations } from '../../actions/disease';
import { selectAssociations } from '../../selectors/diseaseSelectors';

import ExternalLink from '../../components/externalLink';
import {
  RemoteDataTable,
  DiseaseNameCell,
  ReferenceCell,
  GeneticEntityCell,
  EvidenceCodesCell
} from '../../components/dataTable';

class DiseasePageAssociationsTable extends Component {
  loadAssociations(opts) {
    const { dispatch, id } = this.props;
    dispatch(fetchAssociations(id, opts));
  }

  render() {
    const { associations, id } = this.props;

    const columns = [
      {
        field: 'id',
        isKey: true,
        hidden: true,
      },
      {
        field: 'geneName',
        label: 'Gene',
        format: (gene) => <Link to={'/gene/' + gene.id}>{gene.symbol}</Link>,
        sortable: true,
        filterable: false,
        width: '90px',
      },
      {
        field: 'species',
        label: 'Species',
        format: (species) => <i>{species}</i>,
        sortable: true,
        filterable: false,
        width: '105px',
      },
      {
        field: 'geneticEntity',
        label: 'Genetic Entity',
        format: GeneticEntityCell,
        sortable: false,
        filterable: false,
        width: '185px',
      },
      {
        field: 'geneticEntityType',
        label: 'Genetic Entity Type',
        sortable: false,
        filterable: false,
        width: '105px',
      },
      {
        field: 'associationType',
        label: 'Association Type',
        format: (type) => type.replace(/_/g, ' '),
        sortable: false,
        filterable: false,
        width: '110px',
      },
      {
        field: 'disease',
        label: 'Disease',
        format: DiseaseNameCell,
        sortable: true,
        filterable: false,
        width: '175px',
      },
      {
        field: 'evidenceCode',
        label: 'Evidence Code',
        format: EvidenceCodesCell,
        sortable: false,
        filterable: false,
        width: '75px',
      },
      {
        field: 'source',
        label: 'Source',
        format: (s) => <ExternalLink href={s.diseaseUrl}>{s.name}</ExternalLink>,
        sortable: false,
        filterable: false,
        width: '75px',
      },
      {
        field: 'reference',
        label: 'References',
        format: ReferenceCell,
        sortable: false,
        filterable: false,
        width: '150px',
      },
    ];

    const data = associations.data && associations.data.map(association => ({
      id: `${association.disease.id}-${association.gene.id}-${association.associationType}`,
      geneName: association.gene,
      species: association.gene.species.name,
      geneticEntity: association.allele,
      geneticEntityType: association.geneticEntityType,
      associationType: association.associationType,
      disease: association.disease,
      evidenceCode: association.evidenceCodes,
      source: '', //association.source,
      reference: association.publications,
    }));

    return (
      <div>
        <RemoteDataTable
          columns={columns}
          data={data}
          downloadUrl={`/api/disease/${id}/associations/download`}
          loading={associations.loading}
          onUpdate={this.loadAssociations.bind(this)}
          totalRows={associations.total}
        />
      </div>
    );
  }
}

DiseasePageAssociationsTable.propTypes = {
  associations: PropTypes.object,
  dispatch: PropTypes.func,
  id: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    associations: selectAssociations(state),
  };
};

export { DiseasePageAssociationsTable as DiseasePageAssociationsTable };
export default connect(mapStateToProps)(DiseasePageAssociationsTable);
