import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DataTable } from '../../components/dataTable';
import { CollapsibleList } from '../../components/collapsibleList';
import Translation from './Translation.jsx';
import VariantEffectDetails from './VariantEffectDetails.jsx';
import styles from './style.module.scss';
import { DEFAULT_TABLE_STATE } from '../../constants';

const VariantToTranscriptTableNew = ({ variant, variantHgvs }) => {
  const [tableState, setTableState] = useState(DEFAULT_TABLE_STATE);

  const columns = [
    {
      dataField: 'id',
      text: 'id',
      hidden: true,
    },
    {
      dataField: 'name',
      text: 'Sequence feature',
      formatter: (name) => <div>{name}</div>,
      headerStyle: {
        width: 260,
      },
    },
    {
      text: 'Sequence feature type',
      dataField: 'type',
      width: 200,
      formatter: (type) => type && type.name,
      headerStyle: {
        width: 150,
      },
    },
    {
      text: 'Associated gene',
      dataField: 'gene',
      formatter: (gene) => gene && <Link to={`/gene/${gene.id}`}>{gene.symbol}</Link>, // eslint-disable-line react/prop-types
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
        colSpan: 3,
      },
      formatter: (consequences = []) => {
        return (
          <div>
            {consequences.map(
              (
                {
                  // cDNA
                  // cdnaStartPosition,
                  // cdnaEndPosition,

                  // consequence
                  molecularConsequences = [],

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
                },
                index
              ) => {
                return (
                  <div className={`row ${styles.row}`} key={index}>
                    <div className="col">
                      <CollapsibleList collapsedSize={1} showBullets>
                        {molecularConsequences.map((consequence) => {
                          return consequence.replace(/_/g, ' ');
                        })}
                      </CollapsibleList>
                    </div>
                    <div className="col-9">
                      {codonVariation && codonVariation.replace(/-/g, '') ? (
                        <div className="row flex-nowrap">
                          <div className="col">
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
                          <div className="col-1" style={{ textAlign: 'center', alignSelf: 'center' }}>
                            {codonVariation ? '=>' : null}
                          </div>
                          <div className="col">
                            <Translation aminoAcids={aminoAcidVariation.split('')} codons={codonVariation.split('')} />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        );
      },
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
    <button className="btn btn-link btn-sm" type="button">
      {expanded ? 'Hide details' : 'Show details'}
    </button>
  );

  ExpandIndicator.propTypes = {
    expanded: PropTypes.bool,
  };

  const ExpandAllIndicator = ({ isAnyExpands }) => (
    <button className="btn btn-link btn-sm" type="button">
      {isAnyExpands ? 'Hide all details' : 'Show all details'}
    </button>
  );

  ExpandAllIndicator.propTypes = {
    isAnyExpands: PropTypes.bool,
  };

  const expandRow = {
    renderer: (row) => {
      const { consequences = [], _original, ...transcript } = row;
      return consequences.map((consequence, index) => (
        <VariantEffectDetails
          consequence={consequence}
          key={`${transcript.id}-${index}`}
          transcript={transcript}
          variant={{ ..._original, hgvs: variantHgvs }}
        />
      ));
    },
    showExpandColumn: true,
    expandByColumnOnly: true,
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
      // eslint-disable-line react/prop-types
      return <ExpandAllIndicator isAnyExpands={isAnyExpands} />;
    },
    expandColumnRenderer: ({ expanded }) => {
      // eslint-disable-line react/prop-types
      return <ExpandIndicator expanded={expanded} />;
    },
  };

  // Transform variant data to table row format
  // Support both array input and object with predictedVariantConsequences
  const sourceData = Array.isArray(variant) ? variant : variant?.predictedVariantConsequences || [];

  const allData = sourceData.map((item, index) => {
    const transcript = item.variantTranscript || {};
    // Extract gene from transcriptGeneAssociations
    const geneAssoc = transcript.transcriptGeneAssociations?.[0]?.transcriptGeneAssociationObject;
    const gene = geneAssoc
      ? {
          id: geneAssoc.curie,
          symbol: geneAssoc.geneSymbol?.displayText,
        }
      : null;

    return {
      id: transcript.curie || `row-${index}`,
      transcriptId: transcript.curie,
      name: transcript.name,
      type: transcript.transcriptType,
      gene: gene,
      intronExonLocation: item.intronExonLocation,
      consequences: [
        {
          molecularConsequences: (item.vepConsequences || []).map((c) => c.name),
          aminoAcidReference: item.aminoAcidReference || '',
          aminoAcidVariation: item.aminoAcidVariant || '',
          proteinStartPosition: item.calculatedProteinStart,
          proteinEndPosition: item.calculatedProteinEnd,
          codonReference: item.codonReference || '',
          codonVariation: item.codonVariant || '',
          cdsStartPosition: item.calculatedCdsStart,
          cdsEndPosition: item.calculatedCdsEnd,
          cdnaStartPosition: item.calculatedCdnaStart,
          cdnaEndPosition: item.calculatedCdnaEnd,
          impact: item.vepImpact?.name || '',
          hgvsCodingNomenclature: item.hgvsCodingNomenclature,
          hgvsProteinNomenclature: item.hgvsProteinNomenclature,
          siftPrediction: item.siftPrediction || '',
          siftScore: item.siftScore,
          polyphenPrediction: item.polyphenPrediction || '',
          polyphenScore: item.polyphenScore,
        },
      ],
      // Keep original data for expand row
      _original: item,
    };
  });

  // Client-side pagination: slice data based on current page and size
  const { page, sizePerPage } = tableState;
  const startIndex = (page - 1) * sizePerPage;
  const endIndex = startIndex + sizePerPage;
  const paginatedData = allData.slice(startIndex, endIndex);

  return (
    <DataTable
      className={styles.variantToTranscriptTable}
      columns={columns}
      data={paginatedData}
      expandRow={expandRow}
      keyField="id"
      noDataMessage="No variant effect information available"
      setTableState={setTableState}
      tableState={tableState}
      totalRows={allData.length}
    />
  );
};

VariantToTranscriptTableNew.propTypes = {
  variant: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  variantHgvs: PropTypes.string,
};

export default VariantToTranscriptTableNew;
