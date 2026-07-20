import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DataTable } from '../../components/dataTable';
import { CollapsibleList } from '../../components/collapsibleList';
import Translation from './Translation.jsx';
import VariantEffectDetails from './VariantEffectDetails.jsx';
import styles from './style.module.scss';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import { createChildRowEnabledHelper } from '@agr-tanstack-react-table';
import AllianceInteractiveTable from '@agr-tanstack-react-table/AllianceInteractiveTable.tsx';
import tab from 'bootstrap/js/src/tab.js';
import { DEFAULT_TABLE_STATE } from '../../constants';

//TODO: tanstack table merge conflict resolution continue

const tableHelper = createChildRowEnabledHelper();

const newColumns = [
  tableHelper.display({
    id: 'expandRows',
    header: (props) => (
      <button
        className="btn btn-link btn-sm"
        type="button"
        onClick={(_) => props.table.toggleAllRowsExpanded(!props.table.getIsSomeRowsExpanded())}
      >
        {props.table.getIsSomeRowsExpanded() ? 'Hide all details' : 'Show all details'}
      </button>
    ),
    cell: (props) => (
      <button className="btn btn-link btn-sm" type="button" onClick={props.row.getToggleExpandedHandler()}>
        {props.row.getIsExpanded() ? 'Hide details' : 'Show details'}
      </button>
    ),
  }),
  tableHelper.accessor('name', {
    header: 'Sequence Feature',
    enableColumnFilter: false,
    meta: { width: '260px' },
  }),
  tableHelper.accessor('type.name', {
    header: 'Sequence Feature Type',
    enableColumnFilter: false,
    meta: { width: '150px' },
  }),
  tableHelper.display({
    id: 'gene',
    header: 'Associated Gene',
    cell: (props) =>
      props.row.original.gene && (
        <Link to={`/gene/${props.row.original.gene.id}`}>{props.row.original.gene.symbol}</Link>
      ),
    meta: { width: '150px' },
  }),
  tableHelper.accessor('intronExonLocation', {
    header: 'Location',
    enableColumnFilter: false,
    meta: { width: '80px' },
  }),
  tableHelper.display({
    id: 'consequences.molecularConsequences',
    header: 'Molecular Consequence',
    cell: (props) => {
      const consequences = props.row.original.consequences;
      return (
        <div>
          {consequences.map((consequence, index) => {
            const { molecularConsequences = [] } = consequence;

            return (
              <div className={`row ${styles.row}`} key={index}>
                <div className="col">
                  <CollapsibleList collapsedSize={1} showBullets>
                    {molecularConsequences.map((consequence) => {
                      return consequence.replace(/_/g, ' ');
                    })}
                  </CollapsibleList>
                </div>
              </div>
            );
          })}
        </div>
      );
    },
    meta: { width: '180px' },
  }),
  tableHelper.display({
    id: 'consequences.codonAndAminoAcidChange',
    header: 'Codon And Amino Acid Change',
    cell: (props) => {
      const consequences = props.row.original.consequences;
      return (
        <div>
          {consequences.map((consequence, index) => {
            const {
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
            } = consequence;

            return (
              <div className={`row ${styles.row}`} key={index}>
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
          })}
        </div>
      );
    },
    meta: { width: '540px' },
  }),
];

const VariantToTranscriptTable = ({ variant, variantHgvs, variantType }) => {
  // const { id: variantId } = variant;
  // const tableProps = useDataTableQuery(`/api/variant/${variantId}/transcripts`);

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

  // const expandRow = {
  //   renderer: (row) => {
  //     const { consequences = [], ...transcript } = row;
  //     return consequences.map((consequence, index) => (
  //       <VariantEffectDetails
  //         consequence={consequence}
  //         key={`${transcript.id}-${index}`}
  //         transcript={transcript}
  //         variant={variant}
  //       />
  //     ));
  //   },
  //   showExpandColumn: true,
  //   expandByColumnOnly: true,
  //   expandHeaderColumnRenderer: ({ isAnyExpands }) => {
  //     // eslint-disable-line react/prop-types
  //     return <ExpandAllIndicator isAnyExpands={isAnyExpands} />;
  //   },
  //   expandColumnRenderer: ({ expanded }) => {
  //     // eslint-disable-line react/prop-types
  //     return <ExpandIndicator expanded={expanded} />;
  //   },
  // };

  const expandRow = {
    renderer: (row) => {
      const { consequences = [], _original, ...transcript } = row;
      return consequences.map((consequence, index) => (
        <VariantEffectDetails
          consequence={consequence}
          key={`${transcript.id}-${index}`}
          transcript={transcript}
          variant={{ ..._original, hgvs: variantHgvs, variantType }}
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

  const ExpandedRow = ({ rowData: row }) => {
    const { consequences = [], ...transcript } = row;
    return consequences.map((consequence, index) => (
      <VariantEffectDetails
        consequence={consequence}
        key={`${transcript.id}-${index}`}
        transcript={transcript}
        variant={variant}
      />
    ));
  };

  // Transform variant data to table row format
  // Support both array input and object with predictedVariantConsequences
  const sourceData = Array.isArray(variant) ? variant : variant?.predictedVariantConsequences || [];

  const allData = sourceData.map((item, index) => {
    const transcript = item.variantTranscript || item.transcript || {};
    // Extract gene from transcriptGeneAssociations
    const geneAssoc = transcript.transcriptGeneAssociations?.[0]?.transcriptGeneAssociationObject;
    const gene = geneAssoc
      ? {
        id: geneAssoc.curie || geneAssoc.primaryExternalId,
        symbol: geneAssoc.geneSymbol?.displayText,
      }
      : null;

    return {
      id: transcript.curie || `row-${index}`,
      transcriptId: transcript.transcriptId || transcript.curie,
      name: transcript.name || transcript.curie,
      type: transcript.transcriptType,
      gene: gene,
      intronExonLocation: item.intronExonLocation,
      consequences: [
        {
          molecularConsequences: (item.vepConsequences || []).map((c) => c.name),
          aminoAcidReference: item.aminoAcidReference || '',
          aminoAcidVariation: item.aminoAcidVariant || item.aminoAcidReference || '',
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
    <>
      {/*<DataTable*/}
      {/*  {...tableProps}*/}
      {/*  className={styles.variantToTranscriptTable}*/}
      {/*  columns={columns}*/}
      {/*  expandRow={expandRow}*/}
      {/*  keyField="id"*/}
      {/*  noDataMessage="No variant effect information available"*/}
      {/*/>*/}
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
      <AllianceInteractiveTable
        id="allele-to-variant-table"
        columns={newColumns}
        query={{ baseUrl: `/api/variant/${variantId}/transcripts` }}
        ExpandedRowComponent={ExpandedRow}
        fullWidth
      />
    </>
  );
};

VariantToTranscriptTable.propTypes = {
  variant: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  variantHgvs: PropTypes.string,
  variantType: PropTypes.shape({ name: PropTypes.string }),
};

export default VariantToTranscriptTable;
