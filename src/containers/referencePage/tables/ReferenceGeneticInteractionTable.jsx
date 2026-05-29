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
  { dataField: 'geneRole', text: 'Gene role', headerStyle: { width: '110px' } },
  { dataField: 'geneticPerturbation', text: 'Genetic perturbation', headerStyle: { width: '150px' } },
  {
    dataField: 'interactorSpecies',
    text: 'Interactor species',
    headerStyle: { width: '120px' },
    formatter: (species) => species && <SpeciesCell taxon={species} />,
  },
  {
    dataField: 'interactorGene',
    text: 'Interactor gene',
    headerStyle: { width: '120px' },
    formatter: (gene) => gene && <GeneCellCuration gene={gene} />,
  },
  { dataField: 'interactorRole', text: 'Interactor role', headerStyle: { width: '120px' } },
  {
    dataField: 'interactorGeneticPerturbation',
    text: 'Interactor genetic perturbation',
    headerStyle: { width: '180px' },
  },
  { dataField: 'interactionType', text: 'Interaction type', headerStyle: { width: '140px' } },
  { dataField: 'phenotypeOrTrait', text: 'Phenotype or trait', headerStyle: { width: '160px' } },
  {
    dataField: 'evidence',
    text: 'Source',
    headerStyle: { width: '140px' },
    formatter: sourceFormatter,
  },
];

const ReferenceGeneticInteractionTable = createReferenceTable({
  displayName: 'ReferenceGeneticInteractionTable',
  endpoint: 'genetic-interactions',
  supportsCrossReferences: true,
  columns,
  transform: (record) => {
    const ggi = record.geneGeneticInteraction || {};
    return {
      ...record,
      gene: ggi.geneAssociationSubject,
      species: ggi.geneAssociationSubject?.taxon,
      geneRole: ggi.interactorARole?.name,
      geneticPerturbation: namesList(ggi.interactorAGeneticPerturbations),
      interactorGene: ggi.geneGeneAssociationObject,
      interactorSpecies: ggi.geneGeneAssociationObject?.taxon,
      interactorRole: ggi.interactorBRole?.name,
      interactorGeneticPerturbation: namesList(ggi.interactorBGeneticPerturbations),
      interactionType: ggi.interactionType?.name,
      phenotypeOrTrait: ggi.phenotypesOrTraits
        ?.map((p) => p.name || p.statement)
        .filter(Boolean)
        .join(', '),
      evidence: ggi.evidence,
    };
  },
});

export default ReferenceGeneticInteractionTable;
