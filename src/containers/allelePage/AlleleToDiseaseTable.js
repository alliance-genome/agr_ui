import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {selectDiseaseAssociations} from '../../selectors/alleleSelectors';
import {fetchAlleleDisease} from '../../actions/alleleActions';
import {
  ReferenceCell,
  RemoteDataTable
} from '../../components/dataTable';
import AnnotatedEntitiesPopup
  from '../../components/dataTable/AnnotatedEntitiesPopup';
import DiseaseLink from '../../components/disease/DiseaseLink';

const AlleleToDiseaseTable = ({alleleId, diseaseAssociations, dispatchFetchDiseaseAssociations}) => {
  const columns = [
    {
      dataField: 'disease',
      text: 'Disease',
      formatter: disease => <DiseaseLink disease={disease} />,
      headerStyle: {width: '100px'},
      filterable: true,
    },
    {
      dataField: 'primaryAnnotatedEntities',
      text: 'Inferred From',
      formatter: entities => <AnnotatedEntitiesPopup entities={entities}/>,
      headerStyle: {width: '90px'},
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
      filterName: 'reference',
    },
  ];

  return (
    <RemoteDataTable
      columns={columns}
      data={diseaseAssociations.data}
      downloadUrl={`/api/allele/${alleleId}/diseases/download`}
      key={alleleId}
      keyField='primaryKey'
      loading={diseaseAssociations.loading}
      onUpdate={dispatchFetchDiseaseAssociations}
      totalRows={diseaseAssociations.total}
    />
  );
};

AlleleToDiseaseTable.propTypes = {
  alleleId: PropTypes.string,
  diseaseAssociations: PropTypes.object,
  dispatchFetchDiseaseAssociations: PropTypes.func,
};

const mapStateToProps = state => ({
  diseaseAssociations: selectDiseaseAssociations(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  dispatchFetchDiseaseAssociations: opts => dispatch(fetchAlleleDisease(props.alleleId, opts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlleleToDiseaseTable);
