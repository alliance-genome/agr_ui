import React from 'react';
import { GeneCellCuration, SpeciesCell } from '../../../components/dataTable';
import createReferenceTable from './createReferenceTable.jsx';

const dataProviderFormatter = (provider, row) => {
  if (!provider) return null;
  const abbr = provider.abbreviation;
  const xref = row.geneExpressionAnnotation?.dataProviderCrossReference?.referencedCurie;
  return <span>{abbr}{xref ? `: ${xref}` : ''}</span>;
};

const columns = [
  {
    dataField: 'species',
    text: 'Species',
    headerStyle: { width: '120px' },
    formatter: (species) => species && <SpeciesCell species={species} />,
  },
  {
    dataField: 'gene',
    text: 'Gene',
    headerStyle: { width: '120px' },
    formatter: (gene) => gene && <GeneCellCuration gene={gene} />,
  },
  { dataField: 'location', text: 'Location', headerStyle: { width: '180px' } },
  { dataField: 'stage', text: 'Stage', headerStyle: { width: '120px' } },
  { dataField: 'assay', text: 'Assay', headerStyle: { width: '140px' } },
  {
    dataField: 'dataProvider',
    text: 'Source',
    headerStyle: { width: '120px' },
    formatter: dataProviderFormatter,
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
      assay: gea.expressionAssayUsed?.name,
      dataProvider: gea.dataProvider,
      annotation: gea,
    };
  },
});

export default ReferenceExpressionTable;
