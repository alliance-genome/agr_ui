/* eslint-disable react/no-set-state */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import hash from 'object-hash';

import { fetchPhenotypes } from '../../actions/genes';
import { selectPhenotypes } from '../../selectors/geneSelectors';
import { RemoteDataTable, ReferenceCell } from '../../components/dataTable';
import AnnotatedEntitiesPopup
  from '../../components/dataTable/AnnotatedEntitiesPopup';

class PhenotypeTable extends React.Component {
  loadPhenotypes(opts) {
    const { dispatch, geneId } = this.props;
    dispatch(fetchPhenotypes(geneId, opts));
  }

  render() {
    const { geneId, phenotypes } = this.props;

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
        formatter: (term) => <span dangerouslySetInnerHTML={{__html: term}} />,
        headerStyle: {width: '120px'},
        filterable: true,
        filterName: 'termName',
      },
      {
        dataField: 'primaryAnnotatedEntities',
        text: 'Based on Inferences',
        formatter: entities => <AnnotatedEntitiesPopup entities={entities} />,
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
        downloadUrl={`/api/gene/${geneId}/phenotypes/download`}
        keyField='id'
        loading={phenotypes.loading}
        onUpdate={this.loadPhenotypes.bind(this)}
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
  }
}

PhenotypeTable.propTypes = {
  dispatch: PropTypes.func,
  geneId: PropTypes.string.isRequired,
  phenotypes: PropTypes.object,
};

function mapStateToProps (state) {
  return {
    phenotypes: selectPhenotypes(state),
  };
}

export default connect(mapStateToProps)(PhenotypeTable);
