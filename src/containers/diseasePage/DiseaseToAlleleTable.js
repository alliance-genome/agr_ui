import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  AlleleCell,
  DiseaseNameCell,
  EvidenceCodesCell, FilterSets,
  ReferenceCell,
  RemoteDataTable,
  SpeciesCell
} from '../../components/dataTable';
import {fetchAlleleAssociations} from '../../actions/diseaseActions';
import {selectAlleleAssociations} from '../../selectors/diseaseSelectors';
import AnnotatedEntitiesPopup
  from '../../components/dataTable/AnnotatedEntitiesPopup';

const DiseaseToAlleleTable = ({associations, fetchAssociations, id}) => {
  const columns = [
    {
      dataField: 'allele',
      text: 'Allele',
      formatter: (allele, row) => (
        <React.Fragment>
          <div><AlleleCell allele={allele}/></div>
          <small>
            <AnnotatedEntitiesPopup entities={row.primaryAnnotatedEntities}>
              Based on inferences
            </AnnotatedEntitiesPopup>
          </small>
        </React.Fragment>
      ),
      headerStyle: {width: '185px'},
      filterable: true,
    },
    {
      dataField: 'gene',
      text: 'Species',
      formatter: gene => <SpeciesCell species={gene.species}/>,
      filterable: FilterSets.species,
      headerStyle: {width: '105px'},
      filterName: 'species',
    },
    {
      dataField: 'associationType',
      text: 'Association Type',
      formatter: (type) => type.replace(/_/g, ' '),
      headerStyle: {width: '110px'},
      filterable: FilterSets.associationTypes,
    },
    {
      dataField: 'disease',
      text: 'Disease',
      formatter: DiseaseNameCell,
      headerStyle: {width: '100px'},
      filterable: true,
    },
    {
      dataField: 'evidenceCodes',
      text: 'Evidence',
      formatter: EvidenceCodesCell,
      headerStyle: {width: '100px'},
      filterable: true,
    },
    {
      dataField: 'source',
      text: 'Source',
      formatter: source => source.name,
      headerStyle: {width: '100px'},
      filterable: true,
    },
    {
      dataField: 'publications',
      text: 'References',
      formatter: ReferenceCell,
      headerStyle: {width: '150px'},
      filterable: true,
    }
  ];
  return (
    <RemoteDataTable
      columns={columns}
      data={associations.data}
      downloadUrl={`/api/disease/${id}/alleles/download`}
      keyField='primaryKey'
      loading={associations.loading}
      onUpdate={fetchAssociations}
      totalRows={associations.total}
    />
  );
};

DiseaseToAlleleTable.propTypes = {
  associations: PropTypes.object,
  fetchAssociations: PropTypes.func,
  id: PropTypes.string,
};

const mapStateToProps = state => ({
  associations: selectAlleleAssociations(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchAssociations: (opts) => dispatch(fetchAlleleAssociations(props.id, opts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiseaseToAlleleTable);
