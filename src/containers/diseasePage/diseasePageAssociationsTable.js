import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import {
  fetchAssociations,
  setCurrentPage,
  setPerPageSize,
  setSort,
} from '../../actions/disease';

import {
  selectAssociations,
  selectCurrentPage,
  selectPerPageSize,
  selectSortName,
  selectSortOrder,
  selectTotalAssociations,
  selectTotalPages,
} from '../../selectors/diseaseSelectors';

import ExternalLink from '../../components/externalLink';
import { RemoteDataTable } from '../../components/dataTable';
import { ReferenceCell } from '../../components/disease';
import EvidenceCodesCell from '../../components/disease/evidenceCodesCell';

class DiseasePageAssociationsTable extends Component {
  constructor(props) {
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  componentDidMount() {
    this.resetAndLoadAnnotations();
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props;
    if (id !== prevProps.id) {
      this.resetAndLoadAnnotations();
    }
  }

  resetAndLoadAnnotations() {
    const { dispatch, id } = this.props;
    dispatch(setSort('default', 'asc'));
    dispatch(setPerPageSize(10));
    dispatch(setCurrentPage(1));
    dispatch(fetchAssociations(id));
  }

  handlePageChange(page, size) {
    const { currentPage, dispatch, id, sortOrder, sortName } = this.props;
    if (page != currentPage) {
      dispatch(setCurrentPage(page));
      dispatch(fetchAssociations(id, page, size, sortName, sortOrder));
    }
  }

  handleSizeChange(size) {
    const { dispatch, id, sortName, sortOrder } = this.props;
    dispatch(setPerPageSize(size));
    dispatch(fetchAssociations(id, 1, size, sortName, sortOrder));
  }

  handleSortChange(fieldName, sortOrder) {
    const { currentPage, dispatch, id, perPageSize } = this.props;
    dispatch(setSort(fieldName, sortOrder));
    dispatch(fetchAssociations(id, currentPage, perPageSize, fieldName, sortOrder));
  }

  renderDiseaseName(name, row) {
    return <Link to={'/disease/' + row.diseaseID}>{name}</Link>;
  }

  renderGeneLink(gene) {
    return <Link to={'/gene/' + gene.primaryId}>{gene.symbol}</Link>;
  }

  renderGeneticEntity(featureDocument){

    if(featureDocument){
      return (
       <ExternalLink href={featureDocument.modCrossRefFullUrl}>
         <div dangerouslySetInnerHTML={{__html: featureDocument.symbol}} />
       </ExternalLink>);
    }
    return '';
  }

  renderGeneticEntityType(featureDocument){
    if(featureDocument){
      return <div>{featureDocument.category}</div>;
    }
    return '';
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
        field: 'geneDocument',
        label: 'Gene',
        format: this.renderGeneLink,
        sortable: true,
      },
      {
        field: 'disease_species',
        label: 'Species',
        format: (species) => <i>{species.name}</i>,
        sortable: true,
      },
      {
        field: 'featureDocument',
        label: 'Genetic Entity',
        format: this.renderGeneticEntity,
      },
      {
        field: 'featureDocument',
        label: 'Genetic Entity Type',
        format: this.renderGeneticEntityType,
      },
      {
        field: 'associationType',
        label: 'Association Type',
        format: (type) => type.replace(/_/g, ' '),
      },
      {
        field: 'diseaseName',
        label: 'Disease',
        format: this.renderDiseaseName,
        sortable: true,
      },
      {
        field: 'publications',
        label: 'Evidence Code',
        format: EvidenceCodesCell,
      },
      {
        field: 'source',
        label: 'Source',
        format: (s) => <ExternalLink href={s.diseaseUrl}>{s.name}</ExternalLink>,
        width: '100px',
      },
      {
        field: 'publications',
        label: 'References',
        format: ReferenceCell,
      },
    ];

    return (
      <div>
        <RemoteDataTable
          columns={columns}
          currentPage={this.props.currentPage}
          data={this.props.associations}
          downloadUrl={`/api/disease/${this.props.id}/associations/download`}
          onPageChange={this.handlePageChange}
          onSizeChange={this.handleSizeChange}
          onSortChange={this.handleSortChange}
          perPageSize={this.props.perPageSize}
          sortName={this.props.sortName}
          sortOrder={this.props.sortOrder}
          totalPages={this.props.totalPages}
          totalRows={this.props.totalAssociations}
        />
      </div>
    );
  }
}

DiseasePageAssociationsTable.propTypes = {
  associations: PropTypes.arrayOf(PropTypes.object),
  currentPage: PropTypes.number,
  dispatch: PropTypes.func,
  id: PropTypes.string,
  perPageSize: PropTypes.number,
  sortName: PropTypes.string,
  sortOrder: PropTypes.string,
  totalAssociations: PropTypes.number,
  totalPages: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    associations: selectAssociations(state).toJS(),
    currentPage: selectCurrentPage(state),
    perPageSize: selectPerPageSize(state),
    sortName: selectSortName(state),
    sortOrder: selectSortOrder(state),
    totalAssociations: selectTotalAssociations(state),
    totalPages: selectTotalPages(state),
  };
};

export { DiseasePageAssociationsTable as DiseasePageAssociationsTable };
export default connect(mapStateToProps)(DiseasePageAssociationsTable);
