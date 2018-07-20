/* eslint-disable react/no-set-state */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchPhenotypes } from '../../actions/genes';
import { selectPhenotypes } from '../../selectors/geneSelectors';
import { RemoteDataTable, ReferenceCell, GeneticEntityCell } from '../../components/dataTable';

class PhenotypeTable extends React.Component {
  loadPhenotypes(opts) {
    const { dispatch, geneId } = this.props;
    dispatch(fetchPhenotypes(geneId, opts));
  }

  render() {
    const { geneId, phenotypes } = this.props;

    const data = phenotypes.data && phenotypes.data.map(record => {
      return {
        id: record.id,
        phenotype: record.phenotype,
        geneticEntity: record.featureDocument && {
          modCrossRefFullUrl: record.featureDocument.modCrossRefFullUrl,
          symbol: record.featureDocument.symbol,
        },
        geneticEntityType: record.geneticEntity,
        reference: record.publications,
      };
    });

    const columns = [
      {
        field: 'id',
        isKey: true,
        hidden: true,
      },
      {
        field: 'phenotype',
        label: 'Phenotype Term',
        format: (term) => <span dangerouslySetInnerHTML={{__html: term}} />,
        sortable: true,
        filterable: false,
      },
      {
        field: 'geneticEntity',
        label: 'Genetic Entity',
        format: GeneticEntityCell,
        sortable: true,
        filterable: false,
        width: '185px',
      },
      {
        field: 'geneticEntityType',
        label: 'Genetic Entity Type',
        sortable: true,
        filterable: false,
        width: '100px',
      },
      {
        field: 'reference',
        label: 'References',
        format: ReferenceCell,
        sortable: true,
        filterable: false,
        width: '150px',
      },
    ];
    return (
      <RemoteDataTable
        columns={columns}
        data={data}
        downloadUrl={`/api/gene/${geneId}/phenotypes/download`}
        loading={phenotypes.loading}
        onUpdate={this.loadPhenotypes.bind(this)}
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
