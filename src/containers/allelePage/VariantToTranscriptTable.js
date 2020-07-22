import React from 'react';
import PropTypes from 'prop-types';
// import { selectVariants } from '../../selectors/alleleSelectors';
// import { fetchAlleleVariants } from '../../actions/alleleActions';
import { Link } from 'react-router-dom';
import { RemoteDataTable } from '../../components/dataTable';
import { CollapsibleList } from '../../components/collapsibleList';
import Translation from './Translation';
import VariantEffectDetails from './VariantEffectDetails';
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
      headerStyle: {
        width: 180,
      },
    },
    {
      text: 'Sequence feature type',
      dataField: 'type',
      formatter: ({name}) => name,
      headerStyle: {
        width: 100,
      },
    },
    {
      text: 'Associated gene',
      dataField: 'gene',
      formatter: ({symbol, id}) => <Link to={`/gene/${id}`}>{symbol}</Link>, // eslint-disable-line react/prop-types
      headerStyle: {
        width: 150,
      },
    },
    {
      text: 'Location',
      dataField: 'intronExonLocation',
      headerStyle: {
        width: 80,
      },
    },
    {
      text: 'Molecular consequence',
      dataField: 'consequences',
      headerStyle: {
        // paddingLeft: '1em',
        width: 180,
      },
      attrs: {
        colSpan: 3
      },
      formatter: (consequences = []) => {
        return (
          <div>
            {
              consequences.map(({
                // cDNA
                // cdnaStartPosition,
                // cdnaEndPosition,

                // consequence
                transcriptLevelConsequence = '',

                // protein
                aminoAcidReference = '',
                aminoAcidVariation = '',
                proteinStartPosition,
                proteinEndPosition,

                // codon
                codonReference = '',
                codonVariation = '',
                cdsStartPosition,
                cdsEndPosition,

              }, index) => {
                const transcriptLevelConsequenceTerms = transcriptLevelConsequence.split(',');
                return (
                  <div className={`row ${styles.row}`} key={index}>
                    <div className='col'>
                      <CollapsibleList collapsedSize={1} showBullets>
                        {transcriptLevelConsequenceTerms.map(
                          (consequence) => {
                            return consequence.replace(/_/g, ' ');
                          })
                        }
                      </CollapsibleList>
                    </div>
                    <div className='col-9'>
                      {
                        codonVariation && codonVariation.replace(/-/g, '') ? (
                          <div className="row flex-nowrap">
                            <div className='col'>
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
                            <div className='col-1' style={{textAlign: 'center', alignSelf: 'center'}}>
                              {codonVariation ? '=>' : null}
                            </div>
                            <div className='col'>
                              <Translation aminoAcids={aminoAcidVariation.split('')} codons={codonVariation.split('')} />
                            </div>
                          </div>
                        ) : null
                      }
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
      text: 'Codon and amino acid change',
      dataField: 'consequences_placeholder2',
      formatter: () => null,
      headerStyle: {
        // paddingLeft: '1em',
        textTransform: 'initial',
        width: 540,
      },
    },
  ];

  const ExpandIndicator = ({ expanded }) => (
    <button className="btn btn-link btn-sm" type="button">{expanded ? 'Hide details' : 'Show details'}</button>
  );

  ExpandIndicator.propTypes = {
    expanded: PropTypes.bool,
  };

  const ExpandAllIndicator = ({ isAnyExpands }) => (
    <button className="btn btn-link btn-sm" type="button">{isAnyExpands ? 'Hide all details' : 'Show all details'}</button>
  );

  ExpandAllIndicator.propTypes = {
    isAnyExpands: PropTypes.bool,
  };

  const expandRow = {
    renderer: (row) => {
      const {
        consequences = [],
        ...transcript
      } = row;
      return consequences.map((consequence, index) => (
        <VariantEffectDetails
          consequence={consequence}
          key={`${transcript.id}-${index}`}
          transcript={transcript}
          variant={variant}
        />
      ));
    },
    showExpandColumn: true,
    expandByColumnOnly: true,
    expandHeaderColumnRenderer: ({ isAnyExpands }) => { // eslint-disable-line react/prop-types
      return <ExpandAllIndicator isAnyExpands={isAnyExpands} />;
    },
    expandColumnRenderer: ({ expanded }) => { // eslint-disable-line react/prop-types
      return <ExpandIndicator expanded={expanded} />;
    },
  };

  return (<>
    <RemoteDataTable
      className={styles.variantToTranscriptTable}
      columns={columns}
      data={data}
      // downloadUrl={`/api/allele/${alleleId}/variants/download`}
      expandRow={expandRow}
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
