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
        dataField: 'id',
        text: 'id',
        hidden: true,
      },
      {
        dataField: 'geneName',
        text: 'Gene',
        formatter: (gene) => <Link to={'/gene/' + gene.id}>{gene.symbol}</Link>,
        filterable: false,
        headerStyle: {width: '90px'},
      },
      {
        dataField: 'species',
        text: 'Species',
        formatter: (species) => <i>{species}</i>,
        filterable: false,
        headerStyle: {width: '105px'},
      },
      {
        dataField: 'geneticEntity',
        text: 'Genetic Entity',
        formatter: GeneticEntityCell,
        filterable: false,
        headerStyle: {width: '185px'},
      },
      {
        dataField: 'geneticEntityType',
        text: 'Genetic Entity Type',
        filterable: false,
        headerStyle: {width: '105px'},
      },
      {
        dataField: 'associationType',
        text: 'Association Type',
        formatter: (type) => type.replace(/_/g, ' '),
        filterable: false,
        headerStyle: {width: '110px'},
      },
      {
        dataField: 'disease',
        text: 'Disease',
        formatter: DiseaseNameCell,
        filterable: false,
        headerStyle: {width: '175px'},
      },
      {
        dataField: 'evidenceCode',
        text: 'Evidence Code',
        formatter: EvidenceCodesCell,
        filterable: false,
        headerStyle: {width: '75px'},
      },
      {
        dataField: 'source',
        text: 'Source',
        formatter: ({name, url}) => <ExternalLink href={url}>{name}</ExternalLink>,
        filterable: false,
        headerStyle: {width: '75px'},
      },
      {
        dataField: 'reference',
        text: 'References',
        formatter: ReferenceCell,
        filterable: false,
        headerStyle: {width: '150px'},
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
      source: association.source,
      reference: association.publications,
    }));

    return (
      <div>
        <RemoteDataTable
          columns={columns}
          data={data}
          downloadUrl={`/api/disease/${id}/associations/download`}
          keyField='id'
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
