import React from 'react';
import PropTypes from 'prop-types';
import { selectVariants } from '../../selectors/alleleSelectors';
import { fetchAlleleVariants } from '../../actions/alleleActions';
import { connect } from 'react-redux';
import { RemoteDataTable } from '../../components/dataTable';

const AlleleToVariantTable = ({alleleId, fetchVariants, variants}) => {
  const { data, loading, total} = variants;
  const columns = [
    {
      dataField: 'displayName',
      text: 'Variant name',
      formatter: (name) => name,
      headerStyle: {width: '200px'},
    },
    {
      dataField: 'type',
      text: 'Variant type',
      formatter: ({name} = {}) => name,
      headerStyle: {width: '120px'},
    },
    {
      dataField: 'location',
      text: 'Chromosome:position',
      formatter: ({chromosome = '', start = '', end = ''} = {}) => {
        return (start !== end) ? `${chromosome}:${start}-${end}` : `${chromosome}:${start}`;
      },
      headerStyle: {width: '160px'},
    },
    {
      dataField: 'genomicVariantSequence',
      text: 'Nucleotide change',
      formatter: (genomicVariantSequence, row) =>
        genomicVariantSequence ?
          `${row.genomicReferenceSequence}>${genomicVariantSequence}` :
          null,
      headerStyle: {width: '200px'},
    },
    {
      dataField: 'consequence',
      text: 'Most severe consequence',
      formatter: (term) => term,
      headerStyle: {width: '120px'},
    },
  ];

  return (
    <RemoteDataTable
      columns={columns}
      data={data}
      downloadUrl={`/api/allele/${alleleId}/variants/download`}
      key={alleleId}
      keyField='id'
      loading={loading}
      onUpdate={fetchVariants}
      totalRows={total}
    />
  );
};
AlleleToVariantTable.propTypes = {
  alleleId: PropTypes.any,
  fetchVariants: PropTypes.func.isRequired,
  variants: PropTypes.shape({
    data: PropTypes.any,
    loading: PropTypes.any,
    total: PropTypes.any,
  }),
};

const mapStateToProps = state => ({
  variants: selectVariants(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchVariants: opts => dispatch(fetchAlleleVariants(props.alleleId, opts))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlleleToVariantTable);
