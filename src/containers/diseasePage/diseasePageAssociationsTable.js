/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

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
  constructor(props) {
    super(props);

    this.state = {
      limit: 10,
      page: 1,
      sort: {
        name: 'default',
        order: 'asc',
      },
      filters: []
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  componentDidMount() {
    this._loadAssociations();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id || !isEqual(this.state, prevState)) {
      this._loadAssociations();
    }
  }

  _loadAssociations() {
    const { dispatch, id } = this.props;
    dispatch(fetchAssociations(id, this.state));
  }

  handleFilterChange(filter) {
    this.setState({filters: Object.keys(filter).map(key => ({name: key, value: filter[key].value}))});
  }

  handlePageChange(page) {
    this.setState({page});
  }

  handleSizeChange(limit) {
    this.setState({limit});
  }

  handleSortChange(name, order) {
    this.setState({sort: {name, order}});
  }

  render() {
    const { associations, id } = this.props;
    const { limit, page, sort } = this.state;

    const columns = [
      {
        field: 'doId',
        label: 'DO ID',
        isKey: true,
        hidden: true,
      },
      {
        field: 'geneName',
        label: 'Gene',
        format: (gene) => <Link to={'/gene/' + gene.primaryId}>{gene.symbol}</Link>,
        sortable: true,
        filterable: true,
        width: '90px',
      },
      {
        field: 'species',
        label: 'Species',
        format: (species) => <i>{species}</i>,
        sortable: true,
        filterable: true,
        width: '105px',
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
        width: '105px',
      },
      {
        field: 'associationType',
        label: 'Association Type',
        format: (type) => type.replace(/_/g, ' '),
        sortable: true,
        filterable: true,
        width: '110px',
      },
      {
        field: 'disease',
        label: 'Disease',
        format: DiseaseNameCell,
        sortable: true,
        filterable: true,
        width: '120px',
      },
      {
        field: 'evidenceCode',
        label: 'Evidence Code',
        format: EvidenceCodesCell,
        sortable: true,
        filterable: true,
        width: '75px',
      },
      {
        field: 'source',
        label: 'Source',
        format: (s) => <ExternalLink href={s.diseaseUrl}>{s.name}</ExternalLink>,
        sortable: true,
        filterable: true,
        width: '75px',
      },
      {
        field: 'reference',
        label: 'References',
        format: ReferenceCell,
        sortable: true,
        filterable: true,
        width: '150px',
      },
    ];

    const data = associations.data && associations.data.map(association => ({
      doId: association.diseaseID,
      geneName: association.geneDocument,
      species: association.disease_species.name,
      geneticEntity: association.featureDocument && {
        modCrossRefFullUrl: association.featureDocument.modCrossRefFullUrl,
        symbol: association.featureDocument.symbol,
      },
      geneticEntityType: association.featureDocument && association.featureDocument.category,
      associationType: association.associationType,
      disease: association.diseaseName,
      evidenceCode: association.publications,
      source: association.source,
      reference: association.publications,
    }));

    return (
      <div>
        <RemoteDataTable
          columns={columns}
          currentPage={page}
          data={data}
          downloadUrl={`/api/disease/${id}/associations/download`}
          onFilterChange={this.handleFilterChange}
          onPageChange={this.handlePageChange}
          onSizeChange={this.handleSizeChange}
          onSortChange={this.handleSortChange}
          perPageSize={limit}
          sortName={sort.name}
          sortOrder={sort.order}
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
