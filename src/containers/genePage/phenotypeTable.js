/* eslint-disable react/no-set-state */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import hash from 'object-hash';

import { fetchPhenotypes } from '../../actions/geneActions';
import { selectPhenotypes } from '../../selectors/geneSelectors';
import { RemoteDataTable, ReferenceCell, GeneticEntityCell, FilterSets } from '../../components/dataTable';

class PhenotypeTable extends React.Component {
  loadPhenotypes(opts) {
    const { dispatch, geneId } = this.props;
    dispatch(fetchPhenotypes(geneId, opts));
  }

  render() {
    const { geneId, phenotypes } = this.props;

    const data = phenotypes.data && phenotypes.data.map(record => {
      return {
        id: hash(record),
        termName: record.phenotype,
        geneticEntity: record.geneticEntity,
        geneticEntityType: record.geneticEntity && record.geneticEntity.type,
        reference: record.publications,
      };
    });

    const columns = [
      {
        dataField: 'id',
        text: 'id',
        hidden: true,
      },
      {
        dataField: 'termName',
        text: 'Phenotype Term',
        formatter: (term) => <span dangerouslySetInnerHTML={{__html: term}} />,
        headerStyle: {width: '120px'},
        filterable: true,
      },
      {
        dataField: 'geneticEntity',
        text: 'Genetic Entity',
        formatter: entity => entity ? entity.type === 'gene' ? null : GeneticEntityCell(entity) : null,
        headerStyle: {width: '185px'},
        filterable: true,
      },
      {
        dataField: 'geneticEntityType',
        text: 'Genetic Entity Type',
        headerStyle: {width: '110px'},
        filterable: FilterSets.geneticEntityTypes,
      },
      {
        dataField: 'reference',
        text: 'References',
        formatter: ReferenceCell,
        headerStyle: {width: '150px'},
        filterable: true,
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
