import React from 'react';
import PropTypes from 'prop-types';
import {
  DataTable,
  GeneCellCuration,
  SpeciesCell
} from '../dataTable';
import { getResourceUrl } from '../dataTable/getResourceUrl';
import { getIdentifier, getSingleReferenceUrl } from '../dataTable/utils';
import ExternalLink from '../ExternalLink';
import MITerm from './MITerm';
import style from './genePhysicalInteractionDetailTable.module.scss';
import { htmlToPlainText } from '../../lib/utils';
import useDataTableQuery from '../../hooks/useDataTableQuery';

const GenePhysicalInteractionDetailTable = ({focusGeneDisplayName, focusGeneId}) => {
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
          <span className="text-transform-none" dangerouslySetInnerHTML={{__html: focusGeneDisplayName}} /> molecule type
        </>
      ),
      formatter: (moleculeType, _, rowIndex) => <MITerm {...moleculeType} id={`molecular_interaction-interactorAType-${rowIndex}`} />,
      headerStyle: {width: '6em'},
      headerClasses: style.columnHeaderGroup1,
      classes: style.columnGroup1,
      filterable: true,
      filterName: 'moleculeType',
    },
    {
      dataField: 'geneMolecularInteraction.geneGeneAssociationObject',
      text: 'Interactor gene',
      formatter:  (object) => (
        <React.Fragment>
          <GeneCellCuration curie={getIdentifier(object)} geneSymbol={object.geneSymbol} />
        </React.Fragment>
      ),
      headerStyle: {width: '6em'},
      headerClasses: style.columnHeaderGroup2,
      classes: style.columnGroup2,
      filterable: true,
      filterName: 'interactorGeneSymbol',
    },
    {
      dataField: 'geneMolecularInteraction.geneGeneAssociationObject.taxon',
      text: 'Interactor species',
      formatter: (species) => <SpeciesCell species={species}/>,
      headerStyle: {width: '8em'},
      headerClasses: style.columnHeaderGroup2,
      classes: style.columnGroup2,
      filterable: true,
      filterName: 'interactorSpecies'
    },
    {
      dataField: 'geneMolecularInteraction.interactorBType',
      text: 'Interactor molecule type',
      formatter: (term, _, rowIndex) => <MITerm {...term} id={`molecular_interaction-interactorBType-${rowIndex}`} />,
      headerStyle: {width: '6em'},
      headerClasses: style.columnHeaderGroup2,
      classes: style.columnGroup2,
      filterable: true,
      filterName: 'interactorMoleculeType',
    },
    {
      dataField: 'geneMolecularInteraction.detectionMethod',
      text: 'Detection method',
      formatter: (term, _, rowIndex) => <MITerm {...term} id={`molecular_interaction-detectionMethod-${rowIndex}`} />,
      headerStyle: {width: '12em'},
      headerClasses: style.columnHeaderGroup3,
      classes: style.columnGroup3,
      filterable: true,
      filterName: 'detectionMethod',
    },
    {
      dataField: 'geneMolecularInteraction.crossReferences',
      text: 'Source',
      formatter: (source) => (source ? 
          <ExternalLink href={getResourceUrl({identifier:source[0].referencedCurie.toUpperCase(), type:"gene/interactions"})}>{source[0].displayName}</ExternalLink> : null
      ),
      headerStyle: {width: '16em'},
      headerClasses: style.columnHeaderGroup0,
      classes: style.columnGroup0,
      filterable: true,
      filterName: 'source',
    },
    {
      dataField: 'geneMolecularInteraction.evidence',
      text: 'Reference',
      // eslint-disable-next-line react/prop-types
      formatter: (reference) => {
        return <ExternalLink href={getSingleReferenceUrl(reference[0].referenceID).url} key={reference[0].referenceID} title={reference[0].referenceID}>{reference[0].referenceID}</ExternalLink>;
      },
      headerStyle: {width: '10em'},
      headerClasses: style.columnHeaderGroup3,
      classes: style.columnGroup3,
      filterable: true,
      filterName: 'reference',
    },
  ];

  const sortOptions = [
    {
      value: 'geneMolecularInteraction.interactorAType.name.keyword',
      label: `${htmlToPlainText(focusGeneDisplayName)} molecule type`,
    },
    {
      value: 'geneMolecularInteraction.geneGeneAssociationObject.geneSymbol.displayText.keyword',
      label: 'Interactor gene',
    },
    {
      value: 'geneMolecularInteraction.geneGeneAssociationObject.taxon.name.keyword',
      label: 'Interactor species',
    },
    {
      value: 'geneMolecularInteraction.interactorBType.name.keyword',
      label: 'Interactor molecule type',
    },
    {
      value: 'geneMolecularInteraction.interactorDetectionMethod.name.keyword',
      label: 'Detection method',
    },
  ];

  return (
    <DataTable
      {...tableProps}
      columns={columns}
      downloadUrl={`/api/gene/${focusGeneId}/molecular-interactions/download`}
      keyField='id'
      sortOptions={sortOptions}
    />
  );
};

GenePhysicalInteractionDetailTable.propTypes = {
  focusGeneDisplayName: PropTypes.string,
  focusGeneId: PropTypes.string.isRequired,
};

export default GenePhysicalInteractionDetailTable;
