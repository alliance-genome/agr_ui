import React from 'react';
import PropTypes from 'prop-types';
// import { selectVariants } from '../../selectors/alleleSelectors';
// import { fetchAlleleVariants } from '../../actions/alleleActions';
import { Link } from 'react-router-dom';
import { RemoteDataTable } from '../../components/dataTable';
import { CollapsibleList } from '../../components/collapsibleList';
import useVariantTranscripts from './useVariantTranscripts';
import styles from './style.scss';

const VariantToTranscriptTable = ({variant}) => {
  const {id: variantId} = variant;
  const { data = [], loading, total, error, fetchData} = useVariantTranscripts(variantId); //useFetchData(`/api/variant/${variantId}/transcripts`);
  if (error) {
    throw error;
  }

  const columns = [
    {
      dataField: 'id',
      text: 'id',
      hidden: true,
    },
    {
      dataField: 'name',
      text: 'Sequence feature',
      formatter: (name) => (
        <div>{name}</div>
      ),
    },
    {
      text: 'Sequence feature type',
      dataField: 'type',
      formatter: ({name}) => name,
    },
    {
      text: 'Associated gene',
      dataField: 'gene',
      formatter: ({symbol, id}) => <Link to={`/gene/${id}`}>{symbol}</Link>, // eslint-disable-line react/prop-types
    },
    {
      text: 'Location in cDNA',
      attrs: {
        colSpan: 2
      },
      dataField: 'consequences',
      headerStyle: {
        textTransform: 'initial',
      },
      formatter: (consequences = []) => {
        return (
          <div>
            {
              consequences.map(({
                // cDNA
                cdnaStartPosition,
                cdnaEndPosition,

                // consequence
                transcriptLevelConsequence = '',

              }, index) => {
                return (
                  <div className={`row ${styles.row}`} key={index}>
                    <div className='col'>
                      {cdnaStartPosition}
                      {cdnaEndPosition !== cdnaStartPosition ? ` - ${cdnaEndPosition}` : null}
                    </div>
                    <div className='col'>
                      <CollapsibleList collapsedSize={1}>
                        {transcriptLevelConsequence.split(',')}
                      </CollapsibleList>
                    </div>
                  </div>
                );
              })
            }
          </div>
        );
      }
    },
    {
      text: 'Molecular consequence',
      dataField: 'consequences_placeholder',
      formatter: () => null,
      headerStyle: {
        paddingLeft: '1em',
      },
    },
  ];

  return (<>
    <RemoteDataTable
      columns={columns}
      data={data}
      // downloadUrl={`/api/allele/${alleleId}/variants/download`}
      keyField='id'
      loading={loading}
      noDataMessage='No variant effect information available'
      onUpdate={fetchData}
      totalRows={total}
    />
  </>);
};
VariantToTranscriptTable.propTypes = {
  variant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.object,
  }).isRequired,
};

export default VariantToTranscriptTable;
