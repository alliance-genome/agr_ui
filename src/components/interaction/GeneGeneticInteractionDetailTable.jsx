import React, { useId, useMemo } from 'react';
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
import AllianceInteractiveTable from '@agr-tanstack-react-table/AllianceInteractiveTable.tsx';
import { createChildRowEnabledHelper } from '@agr-tanstack-react-table/helpers/index.ts';

const tableHelper = createChildRowEnabledHelper();

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
            <>
              <AlleleCellCuration identifier={getIdentifier(perturbation)} allele={perturbation} />
            </>
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
          <>
            <GeneCellCuration identifier={getIdentifier(object)} gene={object} />
          </>
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
            <>
              <AlleleCellCuration identifier={getIdentifier(perturbation)} allele={perturbation} />
            </>
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

  const newColumns = useMemo(
    () => [
      tableHelper.accessor('geneGeneticInteraction.interactorARole', {
        header: `${focusGeneDisplayName} Role`,
        cell: ({ row, cell }) => {
          const id = useId();
          return <MITerm {...cell.getValue()} id={`genetic_interaction-interactorARole-${id}-${row.index}`} />;
        },
        meta: {
          headerTooltip: (
            <span>
              The role (e.g., suppressed gene, epistatic gene) of the focus gene (i.e., this report’s gene) in the
              genetic interaction. There are 7 possible roles: enhanced gene, enhancer gene, epistatic gene, hypostatic
              gene, suppressed gene, suppressor gene, unspecified role.
            </span>
          ),
          width: '150px',
          filterKey: 'role',
        },
      }),
      tableHelper.accessor('geneGeneticInteraction.interactorAGeneticPerturbation', {
        header: `${focusGeneDisplayName} Genetic Perturbation`,
        cell: ({ cell }) => <AlleleCellCuration allele={cell.getValue()} />,
        meta: {
          width: '150px',
          headerTooltip: (
            <span>
              The genetic perturbation (e.g., variant, allele, RNAi-knockdown) of the focus gene involved in the genetic
              interaction.
            </span>
          ),
          filterKey: 'geneticPerturbation',
        },
      }),
      tableHelper.accessor('geneGeneticInteraction.geneGeneAssociationObject', {
        header: `Interactor Gene`,
        cell: ({ cell }) => <GeneCellCuration gene={cell.getValue()} />,
        enableSorting: true,
        meta: {
          width: '150px',
          sortKey: 'geneGeneticInteraction.geneGeneAssociationObject.geneSymbol.displayText.sort',
          filterKey: 'interactorGeneSymbol',
        },
      }),
      tableHelper.accessor('geneGeneticInteraction.geneGeneAssociationObject.taxon', {
        header: `Interactor Species`,
        cell: ({ cell }) => <SpeciesCell species={cell.getValue()} />,
        enableSorting: true,
        meta: {
          width: '200px',
          sortKey: 'geneGeneticInteraction.geneGeneAssociationObject.taxon.name.sort',
          filterKey: 'interactorSpecies',
        },
      }),
      tableHelper.accessor('geneGeneticInteraction.interactorBRole', {
        header: `Interactor Role`,
        cell: ({ row, cell }) => {
          const id = useId();
          return <MITerm {...cell.getValue()} id={`genetic_interaction-interactorBRole-${id}-${row.index}`} />;
        },
        meta: {
          width: '150px',
          headerTooltip: (
            <span>
              The role (e.g., suppressed gene, epistatic gene) of the interactor gene in the genetic interaction. There
              are 7 possible roles: enhanced gene, enhancer gene, epistatic gene, hypostatic gene, suppressed gene,
              suppressor gene, unspecified role.
            </span>
          ),
          filterKey: 'interactorRole',
        },
      }),
      tableHelper.accessor('geneGeneticInteraction.interactorBGeneticPerturbation', {
        header: `Interactor Genetic Perturbation`,
        cell: ({ cell }) => <AlleleCellCuration allele={cell.getValue()} />,
        meta: {
          width: '150px',
          headerTooltip: (
            <span>
              The genetic perturbation (e.g., variant, allele, RNAi-knockdown) of the interactor gene involved in the
              genetic interaction.
            </span>
          ),
          filterKey: 'interactorGeneticPerturbation',
        },
      }),
      tableHelper.accessor('geneGeneticInteraction.interactionType', {
        header: `Interaction Type`,
        cell: ({ row, cell }) => {
          const id = useId();
          return <MITerm {...cell.getValue()} id={`genetic_interaction-interactionType-${id}-${row.index}`} />;
        },
        meta: {
          width: '150px',
          headerTooltip: (
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
          filterKey: 'interactionType',
        },
      }),
      tableHelper.accessor('geneGeneticInteraction.phenotypesOrTraits', {
        header: `Phenotype Or Trait`,
        cell: ({ cell }) => <CollapsibleList>{cell.getValue()}</CollapsibleList>,
        meta: { width: '130px', filterKey: 'phenotypes' },
      }),
      tableHelper.accessor('geneGeneticInteraction.crossReferences', {
        header: `Source`,
        cell: ({ cell }) => (
          <div>
            {(cell.getValue() || []).map(({ referencedCurie, displayName } = {}) => (
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
        meta: { width: '250px', filterKey: 'source' },
      }),
      tableHelper.accessor('geneGeneticInteraction.evidence', {
        header: `Reference`,
        cell: ({ cell }) => {
          const referenceId = cell.getValue()[0].referenceID;
          return (
            <ExternalLink href={getSingleReferenceUrl(referenceId).url} key={referenceId} title={referenceId}>
              {referenceId}
            </ExternalLink>
          );
        },
        meta: { width: '150px', filterKey: 'reference' },
      }),
    ],
    [focusGeneDisplayName]
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
    <>
      <DataTable
        {...tableProps}
        downloadUrl={`/api/gene/${focusGeneId}/genetic-interactions/download`}
        columns={columns}
        sortOptions={sortOptions}
        keyField="id"
      />
      <AllianceInteractiveTable
        id="allele-to-variant-table"
        columns={newColumns}
        query={{ baseUrl: `/api/gene/${focusGeneId}/genetic-interactions` }}
        download={{
          url: `/api/gene/${focusGeneId}/genetic-interactions/download`,
        }}
        fullWidth
        sortable
      />
    </>
  );
};

GeneGeneticInteractionDetailTable.propTypes = {
  focusGeneId: PropTypes.string.isRequired,
  focusGeneDisplayName: PropTypes.string.isRequired,
};

export default GeneGeneticInteractionDetailTable;
