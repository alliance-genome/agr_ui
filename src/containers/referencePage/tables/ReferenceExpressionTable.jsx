import React from 'react';
import { GeneCellCuration, SpeciesCell } from '../../../components/dataTable';
import { getIdentifier } from '../../../components/dataTable/utils.jsx';
import DataSourceLinkCuration from '../../../components/dataSourceLinkCuration.jsx';
import createReferenceTable from './createReferenceTable.jsx';

const columns = [
  {
    dataField: 'species',
    text: 'Species',
    headerStyle: { width: '120px' },
    formatter: (species) => species && <SpeciesCell taxon={species} />,
  },
  {
    dataField: 'gene',
    text: 'Gene',
    headerStyle: { width: '120px' },
    formatter: (gene) => gene && <GeneCellCuration identifier={getIdentifier(gene)} gene={gene} />,
  },
  { dataField: 'location', text: 'Location', headerStyle: { width: '180px' } },
  {
    dataField: 'stage',
    text: 'Stage',
    headerStyle: { width: '120px' },
    formatter: (stage) => (stage === 'N/A' ? '' : stage),
  },
  {
    dataField: 'assay',
    text: 'Assay',
    headerStyle: { width: '140px' },
    formatter: (assayCell) => {
      if (!assayCell) return null;
      const assayName = assayCell.name;
      return <span title={assayName}>{assayName}</span>;
    },
  },
  {
    dataField: 'source',
    text: 'Source',
    headerStyle: { width: '200px' },
    formatter: (crossReferences = []) => (
      <div>
        {(crossReferences || []).map((crossRef = {}) => {
          if (!crossRef.referencedCurie || !crossRef.displayName) return null;
          return (
            <div key={crossRef.referencedCurie}>
              <DataSourceLinkCuration reference={crossRef}>{crossRef.displayName}</DataSourceLinkCuration>
            </div>
          );
        })}
      </div>
    ),
  },
];

const ReferenceExpressionTable = createReferenceTable({
  displayName: 'ReferenceExpressionTable',
  endpoint: 'expression-annotations',
  supportsCrossReferences: true,
  columns,
  transform: (record) => {
    const gea = record.geneExpressionAnnotation || {};
    return {
      ...record,
      gene: gea.expressionAnnotationSubject,
      species: gea.expressionAnnotationSubject?.taxon,
      location: gea.whereExpressedStatement,
      stage: gea.whenExpressedStageName,
      assay: gea.expressionAssayUsed,
      source: gea.crossReferences,
    };
  },
});

export default ReferenceExpressionTable;
