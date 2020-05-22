import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
// import { selectVariants } from '../../selectors/alleleSelectors';
// import { fetchAlleleVariants } from '../../actions/alleleActions';
import { Link } from 'react-router-dom';
import { buildTableQueryString } from '../../lib/utils';
import { RemoteDataTable } from '../../components/dataTable';
import translationStyles from './translation.scss';

const Translation = ({aminoAcids: aminoAcidsRaw = [], codons = [], isReference = false}) => {
  const [lastAminoAcid] = aminoAcidsRaw.slice(-1);
  const isFrameshift = lastAminoAcid === 'X';
  const aminoAcids = isFrameshift ? aminoAcidsRaw.slice(0, -1) : aminoAcidsRaw;
  return (
    <>
      <div>
        {isReference && codons.length ? <a style={{fontFamily: 'monospace'}}>## - ##&nbsp;&nbsp;</a> : null}
        {codons.map((codon, index) => (
          <span className={translationStyles.codon} key={index}>{codon}</span>
        ))}
      </div>
      <div>
        {isReference && aminoAcids.length ? <a style={{fontFamily: 'monospace'}}>## - ##&nbsp;&nbsp;</a> : null}
        {aminoAcids.map((aa, index) => (
          <span className={translationStyles.aminoAcid} key={index}>{aa}</span>
        ))}
        {isFrameshift ? <span className="badge badge-secondary">frameshift</span> : null}
      </div>
    </>
  );
};

Translation.propTypes = {
  aminoAcids: PropTypes.arrayOf(PropTypes.string),
  codons: PropTypes.arrayOf(PropTypes.string),
  isReference: PropTypes.bool,
};

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

const VariantToTranscriptTable = ({variantId}) => {
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
      headerStyle: {width: '160px'},
    },
    {
      text: 'Sequence feature type',
      dataField: 'type',
      formatter: ({name}) => name,
      headerStyle: {width: '120px'}
    },
    {
      text: 'Associated gene',
      dataField: 'gene',
      formatter: ({symbol, id}) => <Link to={`/gene/${id}`}>{symbol}</Link>, // eslint-disable-line react/prop-types
      headerStyle: {width: '150px'}
    },
    {
      text: 'Location',
      attrs: {
        colSpan: 3
      },
      dataField: 'consequences',
      headerStyle: {width: '120px'},
      formatter: (consequences = []) => {
        return (
          <div>
            {
              consequences.map(({
                aminoAcidChange = '',
                codonChange = '',
                transcriptLevelConsequence,
              }, index) => {
                const [codonReference = '', codonVariation = ''] = codonChange.split('/');
                const [aminoAcidReference = '', aminoAcidVariation = ''] = aminoAcidChange.split('/');
                return (
                  <div className={`row no-gutters align-items-center ${translationStyles.row}`} key={index}>
                    <div className='col-2'>N/A</div>
                    <div className='col-3'>{transcriptLevelConsequence}</div>
                    <div className='col-4' style={{textAlign: 'right'}}>
                      <Translation aminoAcids={aminoAcidReference.split('')} codons={codonReference.split('')} isReference />
                    </div>
                    <div className='col-1' style={{textAlign: 'center'}}>
                      {codonChange ? '=>' : null}
                    </div>
                    <div className='col-2'>
                      <Translation aminoAcids={aminoAcidVariation.split('')} codons={codonVariation.split('')} />
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
      dataField: 'x',
      headerStyle: {width: '180px'}
    },
    {
      text: 'Codon change',
      dataField: 'y',
      headerStyle: {width: '420px'}
    },
    {
      text: 'Pathogenicity',
      formatter: () => 'N/A',
      hidden: true
    }
  ];

  return (
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
  );
};
VariantToTranscriptTable.propTypes = {
  variantId: PropTypes.string.isRequired,
};

export default VariantToTranscriptTable;
