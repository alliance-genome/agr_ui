import React from 'react';
import { GeneCellCuration, SpeciesCell } from '../../../components/dataTable';
import createReferenceTable from './createReferenceTable.jsx';
import { namesList, sourceFormatter } from './utils.jsx';

const columns = [
  {
    dataField: 'species',
    text: 'Species',
    headerStyle: { width: '110px' },
    formatter: (species) => species && <SpeciesCell taxon={species} />,
  },
  {
    dataField: 'gene',
    text: 'Gene',
    headerStyle: { width: '110px' },
    formatter: (gene) => gene && <GeneCellCuration gene={gene} />,
  },
  { dataField: 'moleculeType', text: 'Molecule Type', headerStyle: { width: '120px' } },
  {
    dataField: 'interactorSpecies',
    text: 'Interactor Species',
    headerStyle: { width: '120px' },
    formatter: (species) => species && <SpeciesCell taxon={species} />,
  },
  {
    dataField: 'interactorGene',
    text: 'Interactor Gene',
    headerStyle: { width: '120px' },
    formatter: (gene) => gene && <GeneCellCuration gene={gene} />,
  },
  { dataField: 'detectionMethod', text: 'Detection Method', headerStyle: { width: '160px' } },
  {
    dataField: 'evidence',
    text: 'Source',
    headerStyle: { width: '150px' },
    formatter: sourceFormatter,
  },
];

const ReferenceInteractionTable = createReferenceTable({
  displayName: 'ReferenceInteractionTable',
  endpoint: 'molecular-interactions',
  supportsCrossReferences: true,
  columns,
  transform: (record) => {
    const gmi = record.geneMolecularInteraction || {};
    return {
      ...record,
      gene: gmi.geneAssociationSubject,
      species: gmi.geneAssociationSubject?.taxon,
      interactorGene: gmi.geneGeneAssociationObject,
      interactorSpecies: gmi.geneGeneAssociationObject?.taxon,
      moleculeType: namesList(gmi.interactorAType),
      interactorMoleculeType: namesList(gmi.interactorBType),
      detectionMethod: namesList(gmi.detectionMethod),
      evidence: gmi.evidence,
    };
  },
});

export default ReferenceInteractionTable;
