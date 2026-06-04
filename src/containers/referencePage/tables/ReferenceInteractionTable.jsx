import React from 'react';
import { GeneCellCuration, SpeciesCell } from '../../../components/dataTable';
import { getIdentifier } from '../../../components/dataTable/utils.jsx';
import DataSourceLinkCuration from '../../../components/dataSourceLinkCuration.jsx';
import MITerm from '../../../components/interaction/MITerm.jsx';
import MITermURL from '../../../components/interaction/MITermURL.jsx';
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
    dataField: 'moleculeType',
    text: 'Molecule Type',
    headerStyle: { width: '120px' },
    filterable: true,
    filterName: 'moleculeType',
    formatter: (term, _, rowIndex) =>
      term ? <MITerm {...term} id={`ref-molecular-interaction-interactorAType-${rowIndex}`} /> : null,
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
    dataField: 'interactorMoleculeType',
    text: 'Interactor molecule type',
    headerStyle: { width: '140px' },
    filterable: true,
    filterName: 'interactorMoleculeType',
    formatter: (term, _, rowIndex) =>
      term ? <MITerm {...term} id={`ref-molecular-interaction-interactorBType-${rowIndex}`} /> : null,
  },
  {
    dataField: 'detectionMethod',
    text: 'Detection method',
    headerStyle: { width: '160px' },
    filterable: true,
    filterName: 'detectionMethod',
    formatter: (term, _, rowIndex) =>
      term ? <MITerm {...term} id={`ref-molecular-interaction-detectionMethod-${rowIndex}`} /> : null,
  },
  {
    dataField: 'crossReferences',
    text: 'Source',
    headerStyle: { width: '220px' },
    filterable: true,
    filterName: 'source',
    formatter: (crossReferences = [], row) => {
      const gmi = row.geneMolecularInteraction || {};
      return (
        <div>
          {(crossReferences || []).map((crossRef = {}) => (
            <div key={crossRef.referencedCurie}>
              <DataSourceLinkCuration reference={crossRef}>{crossRef.displayName}</DataSourceLinkCuration>
            </div>
          ))}
          {gmi.aggregationDatabase && gmi.interactionSource && gmi.interactionSource.curie !== gmi.aggregationDatabase.curie ? (
            <span>
              <MITermURL {...gmi.interactionSource} />
              <i>
                <span> via </span>
              </i>
              <MITermURL {...gmi.aggregationDatabase} />
            </span>
          ) : null}
        </div>
      );
    },
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
      moleculeType: gmi.interactorAType,
      interactorGene: gmi.geneGeneAssociationObject,
      interactorSpecies: gmi.geneGeneAssociationObject?.taxon,
      interactorMoleculeType: gmi.interactorBType,
      detectionMethod: gmi.detectionMethod,
      crossReferences: gmi.crossReferences,
    };
  },
});

export default ReferenceInteractionTable;
