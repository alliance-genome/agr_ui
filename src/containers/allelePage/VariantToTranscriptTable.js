import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
// import { selectVariants } from '../../selectors/alleleSelectors';
// import { fetchAlleleVariants } from '../../actions/alleleActions';
import { Link } from 'react-router-dom';
import { buildTableQueryString } from '../../lib/utils';
import { RemoteDataTable } from '../../components/dataTable';
import Translation from './Translation';
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
      formatter: (name, {id}) => (
        <div>
          <div>{name}</div>
          <div>[{id}]</div>
        </div>
      ),
      headerStyle: {width: '260px'},
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
      text: 'Location in cDNA',
      attrs: {
        colSpan: 3
      },
      dataField: 'consequences',
      headerStyle: {
        width: '120px',
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

                // protein
                aminoAcidChange = '',
                proteinStartPosition,
                proteinEndPosition,

                // codon
                codonChange = '',
                cdsStartPosition,
                cdsEndPosition,

                // consequence
                transcriptLevelConsequence,

                //hgvs
                hgvsCodingNomenclature,
                hgvsProteinNomenclature,
                hgvsVEPGeneNomenclature,
              }, index) => {
                const [codonReference = '', codonVariation = ''] = codonChange.split('/');
                const [aminoAcidReference = '', aminoAcidVariation = ''] = aminoAcidChange.split('/');
                return (
                  <div className={`row no-gutters align-items-center ${styles.row}`} key={index}>
                    <div className='col-2'>
                      {cdnaStartPosition}
                      {cdnaEndPosition !== cdnaStartPosition ? ` - ${cdnaEndPosition}` : null}
                    </div>
                    <div className='col-2'>{transcriptLevelConsequence}</div>
                    <div className='col-4' style={{textAlign: 'right'}}>
                      <Translation
                        aminoAcids={aminoAcidReference.split('')}
                        cdsEndPosition={cdsEndPosition}
                        cdsStartPosition={cdsStartPosition}
                        codons={codonReference.split('')}
                        isReference
                        proteinEndPosition={proteinEndPosition}
                        proteinStartPosition={proteinStartPosition}
                      />
                    </div>
                    <div className='col-1' style={{textAlign: 'center'}}>
                      {codonChange ? '=>' : null}
                    </div>
                    <div className='col-2'>
                      <Translation aminoAcids={aminoAcidVariation.split('')} codons={codonVariation.split('')} />
                    </div>
                    <div className='col-1'>
                      {hgvsProteinNomenclature}
                      <br />
                      {hgvsCodingNomenclature}
                      <br />
                      {hgvsVEPGeneNomenclature}
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
      headerStyle: {width: '180px'}
    },
    {
      text: 'Codon change',
      headerStyle: {width: '420px'}
    },
    {
      text: 'HGVS',
      headerStyle: {width: '120px'}
    },
    {
      text: 'Pathogenicity',
      formatter: () => 'N/A',
      hidden: true
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
