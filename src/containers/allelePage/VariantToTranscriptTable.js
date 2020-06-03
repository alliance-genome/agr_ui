import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
// import { selectVariants } from '../../selectors/alleleSelectors';
// import { fetchAlleleVariants } from '../../actions/alleleActions';
import { Link } from 'react-router-dom';
import { buildTableQueryString } from '../../lib/utils';
import { RemoteDataTable } from '../../components/dataTable';
import VariantEffectDetails from './VariantEffectDetails';
import styles from './style.scss';

function useFetchData(url) {
  const [data, setData] = useState({
    data: [],
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback( async (opts) => {
    try {
      const response = await fetch(`${url}?${buildTableQueryString(opts)}`);
      const body = await response.json();
      if (response.ok) {
        const {results, ...others} = body;
        setLoading(false);
        setData({
          ...others,
          data: results,
        });
      } else {
        throw new Error(body);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, [url, setData, setLoading, setError]);

  return {
    ...data,
    loading,
    error,
    fetchData,
  };
}

const VariantToTranscriptTable = ({variant}) => {
  const {id: variantId} = variant;
  const { data = [], loading, total, error, fetchData} = useFetchData(`/api/variant/${variantId}/transcripts`);
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
      headerStyle: {width: '200px'},
    },
    {
      text: 'Sequence feature type',
      dataField: 'type',
      formatter: ({name}) => name,
      headerStyle: {width: '200px'}
    },
    {
      text: 'Associated gene',
      dataField: 'gene',
      formatter: ({symbol, id}) => <Link to={`/gene/${id}`}>{symbol}</Link>, // eslint-disable-line react/prop-types
      headerStyle: {width: '150px'}
    },
    {
      text: 'Location in cDNA',
      attrs: {
        colSpan: 2
      },
      dataField: 'consequences',
      headerStyle: {
        width: '200px',
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
                transcriptLevelConsequence,

              }, index) => {
                return (
                  <div className={`row no-gutters align-items-center ${styles.row}`} key={index}>
                    <div className='col'>
                      {cdnaStartPosition}
                      {cdnaEndPosition !== cdnaStartPosition ? ` - ${cdnaEndPosition}` : null}
                    </div>
                    <div className='col'>{transcriptLevelConsequence}</div>
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
      headerStyle: {width: '200px'}
    },
    {
      text: 'Pathogenicity',
      hidden: true,
    }
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
    {
      data.map(({
        consequences = [],
        ...transcript
      }) => (
        consequences.map((consequence) => (
          <VariantEffectDetails
            consequence={consequence}
            key={`${transcript.id}-${consequence.hgvsCodingNomenclature}`}
            transcript={transcript}
            variant={variant}
          />
        ))
      ))
    }
  </>);
};
VariantToTranscriptTable.propTypes = {
  variant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.object,
  }).isRequired,
};

export default VariantToTranscriptTable;
