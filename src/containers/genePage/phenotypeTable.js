import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import hash from 'object-hash';

import { fetchPhenotypes } from '../../actions/geneActions';
import { selectPhenotypes } from '../../selectors/geneSelectors';
import { RemoteDataTable, ReferenceCell } from '../../components/dataTable';
import AnnotatedEntitiesPopup
  from '../../components/dataTable/AnnotatedEntitiesPopup';

const PhenotypeTable = ({geneId, phenotypes, dispatchFetchPhenotypes}) => {
  const data = phenotypes.data && phenotypes.data.map(record => (
    {
      ...record,
      id: hash(record),
    }
  ));

  const columns = [
    {
      dataField: 'phenotype',
      text: 'Phenotype Term',
      formatter: (term) => <span dangerouslySetInnerHTML={{__html: term}}/>,
      headerStyle: {width: '120px'},
      filterable: true,
      filterName: 'termName',
    },
    {
      dataField: 'primaryAnnotatedEntities',
      text: 'Based on Inferences',
      formatter: entities => <AnnotatedEntitiesPopup entities={entities}/>,
      headerStyle: {width: '90px'},
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

  const sortOptions = [
    {
      value: 'geneticEntity',
      label: 'Genetic Entity',
    }
  ];

  return (
    <RemoteDataTable
      columns={columns}
      data={data}
      key={geneId}
      keyField='id'
      loading={phenotypes.loading}
      onUpdate={dispatchFetchPhenotypes}
      sortOptions={sortOptions}
      summaryProps={
        phenotypes.supplementalData ? {
          ...phenotypes.supplementalData.annotationSummary,
          entityType: 'phenotype'
        } : null
      }
      totalRows={phenotypes.total}
    />
  );
};

PhenotypeTable.propTypes = {
  dispatchFetchPhenotypes: PropTypes.func,
  geneId: PropTypes.string.isRequired,
  phenotypes: PropTypes.object,
};

function mapStateToProps (state) {
  return {
    phenotypes: selectPhenotypes(state),
  };
}

const mapDispatchToProps = (dispatch, props) => ({
  dispatchFetchPhenotypes: (opts) => dispatch(fetchPhenotypes(props.geneId, opts))
});

export default connect(mapStateToProps, mapDispatchToProps)(PhenotypeTable);
