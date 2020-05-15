import React from 'react';
import PropTypes from 'prop-types';
// import { selectVariants } from '../../selectors/alleleSelectors';
// import { fetchAlleleVariants } from '../../actions/alleleActions';
import { connect } from 'react-redux';
import { RemoteDataTable } from '../../components/dataTable';
import translationStyles from './translation.scss';

const Translation = ({aminoAcids: aminoAcidsRaw = [], codons = []}) => {
  const [lastAminoAcid] = aminoAcidsRaw.slice(-1);
  const isFrameshift = lastAminoAcid === 'X';
  const aminoAcids = isFrameshift ? aminoAcidsRaw.slice(0, -1) : aminoAcidsRaw;
  return (
    <>
      <div>
        {codons.map((codon, index) => (
          <span className={translationStyles.codon} key={index}>{codon}</span>
        ))}
      </div>
      <div>
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
};

const VariantToTranscriptTable = ({fetchTranscripts, transcripts}) => {
  const { data = [], loading, total} = transcripts;

  const columns = [
    {
      dataField: 'id',
      text: 'id',
      hidden: true,
    },
    {
      dataField: 'name',
      text: 'Sequence feature',
      headerStyle: {width: '100px'},
    },
    {
      text: 'Sequence feature type'
    },
    {
      text: 'Associated gene'
    },
    {
      text: 'Location',
      attrs: {
        colSpan: 3
      },
      dataField: 'consequences',
      headerStyle: {width: '100px'},
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
                    <div className='col-3' style={{textAlign: 'right'}}>
                      <Translation aminoAcids={aminoAcidReference.split('')} codons={codonReference.split('')} />
                    </div>
                    <div className='col-1' style={{textAlign: 'center'}}>
                      {codonChange ? '=>' : null}
                    </div>
                    <div className='col-3'>
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
      headerStyle: {width: '150px'}
    },
    {
      text: 'Codon change',
      headerStyle: {width: '350px'}
    },
    {
      text: 'Pathogenicity'
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
      onUpdate={fetchTranscripts}
      totalRows={total}
    />
  );
};
VariantToTranscriptTable.propTypes = {
  fetchTranscripts: PropTypes.func.isRequired,
  transcripts: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.any,
    total: PropTypes.any,
  }),
};

const mapStateToProps = () => ({
  // variants: selectVariants(state),
  transcripts:
    {
      data: [{'id':'ENSEMBL:ENSDART00000138161','name':'galt-203','consequences':[{'aminoAcidChange':'','aminoAcidVariation':'','aminoAcidReference':'','codonChange':'','codonReference':'','codonVariation':'','transcriptLevelConsequence':'splice_donor_variant'},{'aminoAcidChange':'R/DX','aminoAcidVariation':'R/DX','aminoAcidReference':'R/DX','codonChange':'CGt/GACAt','codonReference':'CGt/GACAt','codonVariation':'CGt/GACAt','transcriptLevelConsequence':'frameshift_variant'},{'aminoAcidChange':'RPW/X','aminoAcidVariation':'RPW/X','aminoAcidReference':'RPW/X','codonChange':'CGTCCATgg/gg','codonReference':'CGTCCATgg/gg','codonVariation':'CGTCCATgg/gg','transcriptLevelConsequence':'frameshift_variant'}]},{'id':'ENSEMBL:ENSDART00000101298','name':'galt-201','consequences':[{'aminoAcidChange':'RPW/X','aminoAcidVariation':'RPW/X','aminoAcidReference':'RPW/X','codonChange':'CGTCCATgg/gg','codonReference':'CGTCCATgg/gg','codonVariation':'CGTCCATgg/gg','transcriptLevelConsequence':'frameshift_variant'},{'aminoAcidChange':'R/DX','aminoAcidVariation':'R/DX','aminoAcidReference':'R/DX','codonChange':'CGt/GACAt','codonReference':'CGt/GACAt','codonVariation':'CGt/GACAt','transcriptLevelConsequence':'frameshift_variant'}]}],
      loading: false,
      total: 2
    },

});

const mapDispatchToProps = () => ({
  //fetchVariants: opts => dispatch(fetchAlleleVariants(props.alleleId, opts))
  fetchTranscripts: () => {}
});

export default connect(mapStateToProps, mapDispatchToProps)(VariantToTranscriptTable);
