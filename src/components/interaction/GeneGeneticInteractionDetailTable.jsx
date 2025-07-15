import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { DataTable, GeneCellCuration, SpeciesCell } from '../dataTable';
import { getResourceUrl } from '../dataTable/getResourceUrl.jsx';
import { getIdentifier, getSingleReferenceUrl } from '../dataTable/utils.jsx';
import SpeciesName from '../SpeciesName.jsx';
import ExternalLink from '../ExternalLink.jsx';
import MITerm from './MITerm.jsx';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import AlleleCellCuration from '../dataTable/AlleleCellCuration.jsx';
import { CollapsibleList } from '../collapsibleList';

const GeneGeneticInteractionDetailTable = ({ focusGeneId, focusGeneDisplayName }) => {
  const tableProps = useDataTableQuery(`/api/gene/${focusGeneId}/genetic-interactions`);

  const columns = useMemo(
    () => [
      {
        dataField: 'geneGeneticInteraction.interactorARole',
        text: `${focusGeneDisplayName} role`,
        helpPopupProps: {
          id: 'gene-page--genetic-interaction-table--role-help',
          children: (
            <span>
              The role (e.g., suppressed gene, epistatic gene) of the focus gene (i.e., this report’s gene) in the
              genetic interaction. There are 7 possible roles: enhanced gene, enhancer gene, epistatic gene, hypostatic
              gene, suppressed gene, suppressor gene, unspecified role.
            </span>
          ),
        },
        headerStyle: {
          width: '150px',
        },
        formatter: (term, _, rowIndex) => <MITerm {...term} id={`genetic_interaction-interactorARole-${rowIndex}`} />,
        filterable: true,
        filterName: 'role',
      },
      {
        dataField: 'geneGeneticInteraction.interactorAGeneticPerturbation',
        text: `${focusGeneDisplayName} genetic perturbation`,
        helpPopupProps: {
          id: 'gene-page--genetic-interaction-table--genetic-perturbation-help',
          children: (
            <span>
              The genetic perturbation (e.g., variant, allele, RNAi-knockdown) of the focus gene involved in the genetic
              interaction.
            </span>
          ),
        },
        headerStyle: {
          width: '150px',
        },
        formatter: (perturbation) =>
          perturbation ? (
            <React.Fragment>
              <AlleleCellCuration identifier={getIdentifier(perturbation)} alleleSymbol={perturbation.alleleSymbol} />
            </React.Fragment>
          ) : null,
        filterable: true,
        filterName: 'geneticPerturbation',
      },
      {
        dataField: 'geneGeneticInteraction.geneGeneAssociationObject',
        text: 'Interactor gene',
        headerStyle: {
          width: '150px',
        },
        formatter: (object) => (
          <React.Fragment>
            <GeneCellCuration curie={getIdentifier(object)} geneSymbol={object.geneSymbol} />
          </React.Fragment>
        ),
        filterable: true,
        filterName: 'interactorGeneSymbol',
      },
      {
        dataField: 'geneGeneticInteraction.geneGeneAssociationObject.taxon',
        text: 'Interactor species',
        headerStyle: {
          width: '200px',
        },
        formatter: (species) => <SpeciesCell species={species} />,
        filterable: true,
        filterType: 'checkbox',
        filterName: 'interactorSpecies',
        filterFormatter: (speciesName) => <SpeciesName>{speciesName}</SpeciesName>,
      },
      {
        dataField: 'geneGeneticInteraction.interactorBRole',
        text: 'Interactor role',
        helpPopupProps: {
          id: 'gene-page--genetic-interaction-table--interactor-role-help',
          children: (
            <span>
              The role (e.g., suppressed gene, epistatic gene) of the interactor gene in the genetic interaction. There
              are 7 possible roles: enhanced gene, enhancer gene, epistatic gene, hypostatic gene, suppressed gene,
              suppressor gene, unspecified role.
            </span>
          ),
        },
        headerStyle: {
          width: '150px',
        },
        formatter: (term, _, rowIndex) => <MITerm {...term} id={`genetic_interaction-interactorBRole-${rowIndex}`} />,
        filterable: true,
        filterName: 'interactorRole',
      },
      {
        dataField: 'geneGeneticInteraction.interactorBGeneticPerturbation',
        text: 'Interactor genetic perturbation',
        helpPopupProps: {
          id: 'gene-page--genetic-interaction-table--interactor-genetic-perturbation-help',
          children: (
            <span>
              The genetic perturbation (e.g., variant, allele, RNAi-knockdown) of the interactor gene involved in the
              genetic interaction.
            </span>
          ),
        },
        headerStyle: {
          width: '150px',
        },
        formatter: (perturbation) =>
          perturbation ? (
            <React.Fragment>
              <AlleleCellCuration identifier={getIdentifier(perturbation)} alleleSymbol={perturbation.alleleSymbol} />
            </React.Fragment>
          ) : null,
        filterable: true,
        filterName: 'interactorGeneticPerturbation',
      },
      {
        dataField: 'geneGeneticInteraction.interactionType',
        text: 'Interaction type',
        helpPopupProps: {
          id: 'gene-page--genetic-interaction-table--interaction-type-help',
          children: (
            <span>
              The type of genetic interaction reported, e.g., suppression, epistasis. Types of genetic interactions and
              their definitions are managed in the{' '}
              <ExternalLink href="https://github.com/HUPO-PSI/psi-mi-CV" target="_blank">
                PSI-MI (molecular interactions) controlled vocabulary
              </ExternalLink>{' '}
              under the root term ‘phenotype_result’ (MI:2383). Definitions of terms (or initial portions for longer
              definitions) are available in a pop-up tooltip when hovering your mouse cursor over the term.
            </span>
          ),
        },
        headerStyle: {
          width: '150px',
        },
        formatter: (term, _, rowIndex) => <MITerm {...term} id={`genetic_interaction-interactionType-${rowIndex}`} />,
        filterable: true,
        filterName: 'interactionType',
      },
      {
        dataField: 'geneGeneticInteraction.phenotypesOrTraits',
        text: 'Phenotype or trait',
        headerStyle: {
          width: '130px',
        },
        formatter: (phenotypesOrTraits) => <CollapsibleList>{phenotypesOrTraits}</CollapsibleList>,
        filterable: true,
        filterName: 'phenotypes',
      },
      {
        dataField: 'geneGeneticInteraction.crossReferences',
        text: 'Source',
        headerStyle: {
          width: '250px',
        },
        formatter: (crossReferences = []) => (
          <div>
            {crossReferences.map(({ referencedCurie, displayName } = {}) => (
              <div key={referencedCurie}>
                <ExternalLink
                  href={getResourceUrl({ identifier: referencedCurie.toUpperCase(), type: 'gene/interactions' })}
                >
                  {displayName}
                </ExternalLink>
              </div>
            ))}
          </div>
        ),
        filterable: true,
        filterName: 'source',
      },
      {
        dataField: 'geneGeneticInteraction.evidence',
        text: 'Reference',
        headerStyle: {
          width: '150px',
        },
        // eslint-disable-next-line react/prop-types
        formatter: (reference) => {
          return (
            <ExternalLink
              href={getSingleReferenceUrl(reference[0].referenceID).url}
              key={reference[0].referenceID}
              title={reference[0].referenceID}
            >
              {reference[0].referenceID}
            </ExternalLink>
          );
        },
        filterable: true,
        filterName: 'reference',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [focusGeneDisplayName, tableProps]
  );

  const sortOptions = useMemo(
    () => [
      {
        value: 'geneGeneticInteraction.geneGeneAssociationObject.geneSymbol.displayText.sort',
        label: 'Interactor gene',
      },
      {
        value: 'geneGeneticInteraction.geneGeneAssociationObject.taxon.name.sort',
        label: 'Interactor species',
      },
    ],
    []
  );

  return (
    <DataTable
      {...tableProps}
      downloadUrl={`/api/gene/${focusGeneId}/genetic-interactions/download`}
      columns={columns}
      sortOptions={sortOptions}
      keyField="id"
    />
  );
};

GeneGeneticInteractionDetailTable.propTypes = {
  focusGeneId: PropTypes.string.isRequired,
  focusGeneDisplayName: PropTypes.string.isRequired,
};

export default GeneGeneticInteractionDetailTable;
