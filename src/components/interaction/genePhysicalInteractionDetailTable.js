import React from 'react';
import PropTypes from 'prop-types';
import {
  DataTable,
  GeneCellCuration,
  SpeciesCell
} from '../dataTable';
import SpeciesName from '../SpeciesName';
import { getResourceUrl } from '../dataTable/getResourceUrl';
import { getIdentifier, getSingleReferenceUrl } from '../dataTable/utils';
import ExternalLink from '../ExternalLink';
import MITerm from './MITerm';
import MITermURL from './MITermURL';
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
      filterName: 'interactorSpecies',
      filterFormatter: speciesName => <SpeciesName>{speciesName}</SpeciesName>,
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
      formatter: (crossReferences = [], {geneMolecularInteraction = {}} = {}) => (
        <div>
          {
            crossReferences.map(({referencedCurie, displayName} = {}) => (
              <div key={referencedCurie}>
                <ExternalLink href={getResourceUrl({identifier:referencedCurie.toUpperCase(), type:"gene/interactions"})}>{displayName}</ExternalLink>
              </div>
            ))
          }
          {
            (!geneMolecularInteraction.aggregationDatabase || geneMolecularInteraction.interactionSource.curie === geneMolecularInteraction.aggregationDatabase.curie) ?
              null :
              <span>
                <MITermURL {...geneMolecularInteraction.interactionSource}/>
                <i><span> via </span></i>
                <MITermURL {...geneMolecularInteraction.aggregationDatabase}/>
              </span>
          }
        </div>
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

  const getSourceUrl = (miTerm) => {
    let url = "";
    let displayName = miTerm.name.toUpperCase();
    if (miTerm.name === 'mbinfo') {
      displayName = 'MBInfo';
    } else if (miTerm.name === 'iid') {
      url = 'https://iid.ophid.utoronto.ca';
    } else if (miTerm.name === 'ntnu') {
      url = 'https://www.ntnu.no/home';
    } else if (miTerm.name === 'molecular connections') {
      displayName = 'Molecular Connections';
      url = 'https://molecularconnections.com';
    } else if (miTerm.name === 'bhf-ucl') {
      url = 'https://www.ebi.ac.uk/GOA/CVI';
    } else if (miTerm.name === 'uniprot knowledge base') {
      displayName = 'UniProtKB';
      url = 'https://www.uniprot.org';
    } else if (miTerm.name === 'hpidb') {
      url = 'https://cales.arizona.edu/hpidb/';
    } else if (miTerm.name === 'intact') {
      displayName = 'IntAct';
      url = "https://www.ebi.ac.uk/intact";
    } else if (miTerm.name === 'mint') {
      url = 'https://mint.bio.uniroma2.it';
    } else if (miTerm.name === 'matrixdb') {
      url = 'https://matrixdb.univ-lyon1.fr'
      displayName = 'MatrixDB';
    } else if (miTerm.name === 'innatedb') {
      displayName = 'InnateDB';
      url = 'https://www.innatedb.ca';
    } else if (miTerm.name === 'mpidb') {
      url = "https://www.ebi.ac.uk/intact";
    } else if (miTerm.name === 'imex') {
      url = "https://www.imexconsortium.org";
    }

    if (url === "") {
      return <span>{displayName}</span>;
    }

    return <ExternalLink href={url}>{displayName}</ExternalLink>
  }
  
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
