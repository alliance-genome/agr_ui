import React from 'react';
import PropTypes from 'prop-types';
import {selectPhenotypes} from '../../selectors/alleleSelectors';
import {fetchAllelePhenotypes} from '../../actions/alleleActions';
import {connect} from 'react-redux';
import {ReferenceCell, RemoteDataTable} from '../../components/dataTable';
import hash from 'object-hash';
import AnnotatedEntitiesPopup
  from '../../components/dataTable/AnnotatedEntitiesPopup';

const AlleleToPhenotypeTable = ({alleleId, fetchPhenotypes, phenotypes}) => {
  const columns = [
    {
      dataField: 'phenotype',
      text: 'Phenotype',
      formatter: (term) => <span dangerouslySetInnerHTML={{__html: term}}/>,
      headerStyle: {width: '120px'},
      filterable: true,
      filterName: 'termName',
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
      formatter: source => source && source.name,
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

  const data = phenotypes.data && phenotypes.data.map(record => (
    {
      ...record,
      id: hash(record),
    }
  ));

  return (
    <RemoteDataTable
      columns={columns}
      data={data}
      downloadUrl={`/api/allele/${alleleId}/phenotypes/download`}
      key={alleleId}
      keyField='id'
      loading={phenotypes.loading}
      onUpdate={fetchPhenotypes}
      totalRows={phenotypes.total}
    />
  );
};

AlleleToPhenotypeTable.propTypes = {
  alleleId: PropTypes.string,
  fetchPhenotypes: PropTypes.func,
  phenotypes: PropTypes.object,
};

const mapStateToProps = state => ({
  phenotypes: selectPhenotypes(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchPhenotypes: opts => dispatch(fetchAllelePhenotypes(props.alleleId, opts))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlleleToPhenotypeTable);
