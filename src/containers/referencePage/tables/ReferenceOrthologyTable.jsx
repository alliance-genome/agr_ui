import React from 'react';
import { Link } from 'react-router-dom';
import { SpeciesCell } from '../../../components/dataTable';
import createReferenceTable from './createReferenceTable.jsx';

const geneLink = (gene) => {
  if (!gene) return null;
  const id = gene.primaryExternalId;
  const symbol = gene.geneSymbol?.displayText || id;
  return (
    <Link to={`/gene/${id}`}>
      <span dangerouslySetInnerHTML={{ __html: symbol }} />
    </Link>
  );
};

const methodsCell = (predictionMethods) =>
  (predictionMethods || []).map((m) => m.name || m).filter(Boolean).join(', ');

const columns = [
  {
    dataField: 'subjectSpecies',
    text: 'Species',
    headerStyle: { width: '120px' },
    formatter: (species) => species && <SpeciesCell species={species} />,
  },
  {
    dataField: 'subjectGene',
    text: 'Gene',
    headerStyle: { width: '120px' },
    formatter: geneLink,
  },
  {
    dataField: 'objectSpecies',
    text: 'Ortholog species',
    headerStyle: { width: '140px' },
    formatter: (species) => species && <SpeciesCell species={species} />,
  },
  {
    dataField: 'objectGene',
    text: 'Ortholog gene',
    headerStyle: { width: '140px' },
    formatter: geneLink,
  },
  { dataField: 'confidence', text: 'Confidence', headerStyle: { width: '100px' } },
  { dataField: 'methods', text: 'Prediction methods matched', headerStyle: { width: '260px' } },
];

const ReferenceOrthologyTable = createReferenceTable({
  displayName: 'ReferenceOrthologyTable',
  endpoint: 'orthology',
  columns,
  transform: (record) => {
    const g = record.geneToGeneOrthologyGenerated || {};
    return {
      subjectGene: g.subjectGene,
      subjectSpecies: g.subjectGene?.taxon,
      objectGene: g.objectGene,
      objectSpecies: g.objectGene?.taxon,
      confidence: g.confidence?.name,
      methods: methodsCell(g.predictionMethodsMatched),
    };
  },
});

export default ReferenceOrthologyTable;
