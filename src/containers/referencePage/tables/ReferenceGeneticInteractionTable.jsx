import React from 'react';
import { GeneCellCuration, SpeciesCell } from '../../../components/dataTable';
import AlleleCellCuration from '../../../components/dataTable/AlleleCellCuration.jsx';
import { getIdentifier } from '../../../components/dataTable/utils.jsx';
import DataSourceLinkCuration from '../../../components/dataSourceLinkCuration.jsx';
import MITerm from '../../../components/interaction/MITerm.jsx';
import { CollapsibleList } from '../../../components/collapsibleList';
import createReferenceTable from './createReferenceTable.jsx';

const columns = [
  {
    dataField: 'species',
    text: 'Species',
    headerStyle: { width: '110px' },
    filterable: true,
    filterName: 'species',
    formatter: (species) => species && <SpeciesCell taxon={species} />,
  },
  {
    dataField: 'gene',
    text: 'Gene',
    headerStyle: { width: '110px' },
    filterable: true,
    filterName: 'gene',
    formatter: (gene) => gene && <GeneCellCuration identifier={getIdentifier(gene)} gene={gene} />,
  },
  {
    dataField: 'geneRole',
    text: 'Gene role',
    headerStyle: { width: '130px' },
    filterable: true,
    filterName: 'geneRole',
    formatter: (term, _, rowIndex) =>
      term ? <MITerm {...term} id={`ref-genetic-interaction-geneRole-${rowIndex}`} /> : null,
  },
  {
    dataField: 'geneticPerturbation',
    text: 'Genetic perturbation',
    headerStyle: { width: '150px' },
    filterable: true,
    filterName: 'geneticPerturbation',
    formatter: (perturbation) =>
      perturbation ? <AlleleCellCuration identifier={getIdentifier(perturbation)} allele={perturbation} /> : null,
  },
  {
    dataField: 'interactorGene',
    text: 'Interactor gene',
    headerStyle: { width: '120px' },
    filterable: true,
    filterName: 'interactorGene',
    formatter: (gene) => gene && <GeneCellCuration identifier={getIdentifier(gene)} gene={gene} />,
  },
  {
    dataField: 'interactorSpecies',
    text: 'Interactor species',
    headerStyle: { width: '120px' },
    filterable: true,
    filterName: 'interactorSpecies',
    formatter: (species) => species && <SpeciesCell taxon={species} />,
  },
  {
    dataField: 'interactorRole',
    text: 'Interactor role',
    headerStyle: { width: '130px' },
    filterable: true,
    filterName: 'interactorRole',
    formatter: (term, _, rowIndex) =>
      term ? <MITerm {...term} id={`ref-genetic-interaction-interactorRole-${rowIndex}`} /> : null,
  },
  {
    dataField: 'interactorGeneticPerturbation',
    text: 'Interactor genetic perturbation',
    headerStyle: { width: '180px' },
    filterable: true,
    filterName: 'interactorGeneticPerturbation',
    formatter: (perturbation) =>
      perturbation ? <AlleleCellCuration identifier={getIdentifier(perturbation)} allele={perturbation} /> : null,
  },
  {
    dataField: 'interactionType',
    text: 'Interaction type',
    headerStyle: { width: '140px' },
    filterable: true,
    filterName: 'interactionType',
    formatter: (term, _, rowIndex) =>
      term ? <MITerm {...term} id={`ref-genetic-interaction-interactionType-${rowIndex}`} /> : null,
  },
  {
    dataField: 'phenotypesOrTraits',
    text: 'Phenotype or trait',
    headerStyle: { width: '160px' },
    filterable: true,
    filterName: 'phenotypes',
    formatter: (phenotypesOrTraits) =>
      phenotypesOrTraits && phenotypesOrTraits.length > 0 ? (
        <CollapsibleList>{phenotypesOrTraits}</CollapsibleList>
      ) : null,
  },
  {
    dataField: 'crossReferences',
    text: 'Source',
    headerStyle: { width: '180px' },
    filterable: true,
    filterName: 'source',
    formatter: (crossReferences = []) => (
      <div>
        {crossReferences.map((crossRef = {}) => (
          <div key={crossRef.referencedCurie}>
            <DataSourceLinkCuration reference={crossRef}>{crossRef.displayName}</DataSourceLinkCuration>
          </div>
        ))}
      </div>
    ),
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
      geneRole: ggi.interactorARole,
      geneticPerturbation: ggi.interactorAGeneticPerturbation,
      interactorGene: ggi.geneGeneAssociationObject,
      interactorSpecies: ggi.geneGeneAssociationObject?.taxon,
      interactorRole: ggi.interactorBRole,
      interactorGeneticPerturbation: ggi.interactorBGeneticPerturbation,
      interactionType: ggi.interactionType,
      phenotypesOrTraits: ggi.phenotypesOrTraits,
      crossReferences: ggi.crossReferences,
    };
  },
});

export default ReferenceGeneticInteractionTable;
