import React from 'react';
import PropTypes from 'prop-types';
import { DataTable, GeneCellCuration, ReferenceList, ReferencesCellCuration, SpeciesCell } from '../dataTable';
import SpeciesName from '../SpeciesName.jsx';
import { getIdentifier } from '../dataTable/utils.jsx';
import DataSourceLinkCuration from '../dataSourceLinkCuration.jsx';
import evidenceReferenceIds from './evidenceReferenceIds.js';
import MITerm from './MITerm.jsx';
import MITermURL from './MITermURL.jsx';
import style from './genePhysicalInteractionDetailTable.module.scss';
import { htmlToPlainText } from '../../lib/utils';
import useDataTableQuery from '../../hooks/useDataTableQuery';

const GenePhysicalInteractionDetailTable = ({ focusGeneDisplayName, focusGeneId }) => {
  const tableProps = useDataTableQuery(`/api/gene/${focusGeneId}/molecular-interactions`);
  const columns = [
    {
      dataField: 'geneMolecularInteraction.interactorAType',
      text: 'Molecule Type',
      // headerNode is not part of the react-bootstrap-table column specification,
      // but it gets picked up in our ColumnHeader component to get around the fact
      // that `text` cannot be a JSX node. this property is only needed if the
      // column header needs custom formatting
      headerNode: (
        <>
          <span className="text-transform-none" dangerouslySetInnerHTML={{ __html: focusGeneDisplayName }} /> molecule
          type
        </>
      ),
      formatter: (moleculeType, _, rowIndex) => (
        <MITerm {...moleculeType} id={`molecular_interaction-interactorAType-${rowIndex}`} />
      ),
      headerStyle: { width: '6em' },
      headerClasses: style.columnHeaderGroup1,
      classes: style.columnGroup1,
      filterable: true,
      filterName: 'moleculeType',
    },
    {
      dataField: 'geneMolecularInteraction.geneGeneAssociationObject',
      text: 'Interactor gene',
      formatter: (object) => (
        <>
          <GeneCellCuration identifier={getIdentifier(object)} gene={object} />
        </>
      ),
      headerStyle: { width: '6em' },
      headerClasses: style.columnHeaderGroup2,
      classes: style.columnGroup2,
      filterable: true,
      filterName: 'interactorGeneSymbol',
    },
    {
      dataField: 'geneMolecularInteraction.geneGeneAssociationObject.taxon',
      text: 'Interactor species',
      formatter: (taxon) => <SpeciesCell taxon={taxon} />,
      headerStyle: { width: '8em' },
      headerClasses: style.columnHeaderGroup2,
      classes: style.columnGroup2,
      filterable: true,
      filterName: 'interactorSpecies',
      filterFormatter: (speciesName) => <SpeciesName>{speciesName}</SpeciesName>,
    },
    {
      dataField: 'geneMolecularInteraction.interactorBType',
      text: 'Interactor molecule type',
      formatter: (term, _, rowIndex) => <MITerm {...term} id={`molecular_interaction-interactorBType-${rowIndex}`} />,
      headerStyle: { width: '6em' },
      headerClasses: style.columnHeaderGroup2,
      classes: style.columnGroup2,
      filterable: true,
      filterName: 'interactorMoleculeType',
    },
    {
      dataField: 'geneMolecularInteraction.detectionMethod',
      text: 'Detection method',
      formatter: (term, _, rowIndex) => <MITerm {...term} id={`molecular_interaction-detectionMethod-${rowIndex}`} />,
      headerStyle: { width: '12em' },
      headerClasses: style.columnHeaderGroup3,
      classes: style.columnGroup3,
      filterable: true,
      filterName: 'detectionMethod',
    },
    {
      dataField: 'geneMolecularInteraction.crossReferences',
      text: 'Source',
      formatter: (crossReferences = [], { geneMolecularInteraction = {} } = {}) => (
        <div>
          {crossReferences.map((crossRef = {}) => (
            <div key={crossRef.referencedCurie}>
              <DataSourceLinkCuration reference={crossRef}>{crossRef.displayName}</DataSourceLinkCuration>
            </div>
          ))}
          {!geneMolecularInteraction.aggregationDatabase ||
          geneMolecularInteraction.interactionSource.curie ===
            geneMolecularInteraction.aggregationDatabase.curie ? null : (
            <span>
              <MITermURL {...geneMolecularInteraction.interactionSource} />
              <i>
                <span> via </span>
              </i>
              <MITermURL {...geneMolecularInteraction.aggregationDatabase} />
            </span>
          )}
        </div>
      ),
      headerStyle: { width: '16em' },
      headerClasses: style.columnHeaderGroup0,
      classes: style.columnGroup0,
      filterable: true,
      filterName: 'source',
    },
    {
      // dummy field: the Reference ID column below owns the real evidence dataField
      dataField: 'referenceCitation',
      isDummyField: true,
      text: 'Reference',
      formatter: (_, row) => <ReferenceList refs={row.geneMolecularInteraction?.evidence} />,
      headerStyle: { width: '11em' },
      headerClasses: style.columnHeaderGroup3,
      classes: style.columnGroup3,
      filterable: true,
      filterName: 'referenceCitation',
    },
    {
      dataField: 'geneMolecularInteraction.evidence',
      text: 'Reference ID',
      formatter: (evidence) => <ReferencesCellCuration pubmedPublications={evidenceReferenceIds(evidence)} />,
      headerStyle: { width: '10em' },
      headerClasses: style.columnHeaderGroup3,
      classes: style.columnGroup3,
      filterable: true,
      filterName: 'reference',
    },
  ];

  const sortOptions = [
    {
      value: 'geneMolecularInteraction.interactorAType.name.sort',
      label: `${htmlToPlainText(focusGeneDisplayName)} molecule type`,
    },
    {
      value: 'geneMolecularInteraction.geneGeneAssociationObject.geneSymbol.displayText.sort',
      label: 'Interactor gene',
    },
    {
      value: 'geneMolecularInteraction.geneGeneAssociationObject.taxon.name.sort',
      label: 'Interactor species',
    },
    {
      value: 'geneMolecularInteraction.interactorBType.name.sort',
      label: 'Interactor molecule type',
    },
    {
      value: 'geneMolecularInteraction.detectionMethod.name.sort',
      label: 'Detection method',
    },
  ];

  return (
    <DataTable
      {...tableProps}
      columns={columns}
      downloadUrl={`/api/gene/${focusGeneId}/molecular-interactions/download`}
      keyField="id"
      sortOptions={sortOptions}
    />
  );
};

GenePhysicalInteractionDetailTable.propTypes = {
  focusGeneDisplayName: PropTypes.string,
  focusGeneId: PropTypes.string.isRequired,
};

export default GenePhysicalInteractionDetailTable;
