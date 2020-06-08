import React from 'react';
import PropTypes from 'prop-types';
import { selectVariants } from '../../selectors/alleleSelectors';
import { fetchAlleleVariants } from '../../actions/alleleActions';
import { connect } from 'react-redux';
import { RemoteDataTable } from '../../components/dataTable';
import { VariantJBrowseLink } from '../../components/variant';
import Sequence from './Sequence';

const AlleleToVariantTable = ({allele = {}, alleleId, fetchVariants, variants}) => {
  const { data:dataRaw = [], loading, total} = variants;
  const [ variant1 = {} ] = dataRaw;
  const { location: locationVariant1 = {} } = variant1;
  const gene = allele.gene || {};
  const { genomeLocations: geneLocations } = gene;
  const [geneLocation] = geneLocations || [];

  const data = dataRaw.map((variant) => ({
    ...variant,
    geneLocation,
    species: allele.species
  }));

  const columns = [
    {
      dataField: 'displayName',
      text: 'Variant name',
      formatter: (name, {location, type = {}, geneLocation = {}, species = {}}) => (
        <VariantJBrowseLink
          geneLocation={geneLocation}
          location={location}
          species={species.name}
          type={type.name}
        >
          <span className="text-break">{name}</span>
        </VariantJBrowseLink>
      ),
      headerStyle: {width: '220px'},
    },
    {
      dataField: 'type',
      text: 'Variant type',
      formatter: ({name = ''} = {}) => name.replace(/_/g, ' '),
      headerStyle: {width: '100px'},
    },
    {
      dataField: 'location',
      text: 'Location',
      headerFormatter: () => (
        <React.Fragment>
          Chromosome:position
          <br/>
          <span className="text-muted">(Assembly: {locationVariant1.assembly})</span>
        </React.Fragment>
      ),
      formatter: ({chromosome = '', start = '', end = ''} = {}) => {
        return (start !== end) ? `${chromosome}:${start}-${end}` : `${chromosome}:${start}`;
      },
      headerStyle: {width: '160px'},
    },
    {
      dataField: 'nucleotideChange',
      text: 'Nucleotide change',
      formatter: (nucleotideChange) => {
        return <Sequence sequence={nucleotideChange || ''} />;
      },
      headerStyle: {width: '160px'},
    },
    {
      dataField: 'consequence',
      text: 'Most severe consequence',
      formatter: term => term && term.replace(/_/g, ' '),
      headerStyle: {width: '150px'},
    },
  ];

  return (
    <>
      <RemoteDataTable
        columns={columns}
        data={data}
        downloadUrl={`/api/allele/${alleleId}/variants/download`}
        key={alleleId}
        keyField='id'
        loading={loading}
        noDataMessage='No mapped variant information available'
        onUpdate={fetchVariants}
        totalRows={total}
      />
    </>
  );
};
AlleleToVariantTable.propTypes = {
  allele: PropTypes.shape({
    gene: PropTypes.shape({
      genomeLocations: PropTypes.any,
    }),
    species: PropTypes.shape({
      name: PropTypes.string,
    })
  }),
  alleleId: PropTypes.any,
  fetchVariants: PropTypes.func.isRequired,
  variants: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
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
