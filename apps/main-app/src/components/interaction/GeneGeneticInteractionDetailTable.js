import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  DataTable,
  GeneCell,
  AlleleCell,
  SpeciesCell,
} from '../dataTable';
import ExternalLink from '../ExternalLink';
import MITerm from './MITerm';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import { CollapsibleList } from '../collapsibleList';

const GeneGeneticInteractionDetailTable = ({
  focusGeneId,
  focusGeneDisplayName,
}) => {
  const tableProps = useDataTableQuery(`/api/gene/${focusGeneId}/interactions?filter.joinType=genetic_interaction`);

  const columns = useMemo(() => (
    [
      {
        dataField: 'interactorARole',
        text: `${focusGeneDisplayName} role`,
        helpPopupProps: {
          id: 'gene-page--genetic-interaction-table--role-help',
          children: <span>The role (e.g., suppressed gene, epistatic gene) of the focus gene (i.e., this report’s gene) in the genetic interaction. There are 7 possible roles: enhanced gene, enhancer gene, epistatic gene, hypostatic gene, suppressed gene, suppressor gene, unspecified role.</span>,
        },
        headerStyle: {
          width: '150px',
        },
        formatter: (term, _, rowIndex) => <MITerm {...term} id={`genetic_interaction-interactorARole-${rowIndex}`} />,
        filterable: true,
        filterName: 'role',
      },
      {
        dataField: 'alleleA',
        text: `${focusGeneDisplayName} genetic perturbation`,
        helpPopupProps: {
          id: 'gene-page--genetic-interaction-table--genetic-perturbation-help',
          children: <span>The genetic perturbation (e.g., variant, allele, RNAi-knockdown) of the focus gene involved in the genetic interaction.</span>,
        },
        headerStyle: {
          width: '150px',
        },
        formatter: (allele) => (allele ? <AlleleCell allele={allele} /> : null),
        filterable: true,
        filterName: 'geneticPerturbation',
      },
      {
        dataField: 'geneB',
        text: 'Interactor gene',
        helpPopupProps: {
          id: 'gene-page--genetic-interaction-table--interactor-gene-help',
          children: <span>The gene which interacts genetically with the focus gene.</span>,
        },
        headerStyle: {
          width: '150px',
        },
        formatter: GeneCell,
        filterable: true,
        filterName: 'interactorGeneSymbol',
      },
      {
        dataField: 'geneB.species',
        text: 'Interactor species',
        helpPopupProps: {
          id: 'gene-page--genetic-interaction-table--interactor-species-help',
          children: <span>The species of the interactor gene.</span>,
        },
        headerStyle: {
          width: '200px',
        },
        formatter: (species) => <SpeciesCell species={species} />,
        filterable: true,
        filterName: 'interactorSpecies',
      },
      {
        dataField: 'interactorBRole',
        text: 'Interactor role',
        helpPopupProps: {
          id: 'gene-page--genetic-interaction-table--interactor-role-help',
          children: <span>The role (e.g., suppressed gene, epistatic gene) of the interactor gene in the genetic interaction. There are 7 possible roles: enhanced gene, enhancer gene, epistatic gene, hypostatic gene, suppressed gene, suppressor gene, unspecified role.</span>,
        },
        headerStyle: {
          width: '150px',
        },
        formatter: (term, _, rowIndex) => <MITerm {...term} id={`genetic_interaction-interactorBRole-${rowIndex}`} />,
        filterable: true,
        filterName: 'interacotorRole',
      },
      {
        dataField: 'alleleB',
        text: 'Interactor genetic perturbation',
        helpPopupProps: {
          id: 'gene-page--genetic-interaction-table--genetic-perturbation-help',
          children: <span>The genetic perturbation (e.g., variant, allele, RNAi-knockdown) of the interactor gene involved in the genetic interaction.</span>,
        },
        headerStyle: {
          width: '150px',
        },
        formatter: (allele) => (allele ? <AlleleCell allele={allele} /> : null),
        filterable: true,
        filterName: 'interactorGeneticPerturbation',
      },
      {
        dataField: 'interactionType',
        text: 'Interaction type',
        helpPopupProps: {
          id: 'gene-page--genetic-interaction-table--interaction-type-help',
          children: <span>The type of genetic interaction reported, e.g., suppression, epistasis. Types of genetic interactions and their definitions are managed in the <ExternalLink href="https://github.com/HUPO-PSI/psi-mi-CV" target="_blank">PSI-MI (molecular interactions) controlled vocabulary</ExternalLink> under the root term ‘phenotype_result’ (MI:2383). Definitions of terms (or initial portions for longer definitions) are available in a pop-up tooltip when hovering your mouse cursor over the term.</span>,
        },
        headerStyle: {
          width: '150px',
        },
        formatter: (term, _, rowIndex) => <MITerm {...term} id={`genetic_interaction-interactionType-${rowIndex}`} />,
        filterable: true,
      },
      {
        dataField: 'phenotypes',
        text: 'Phenotype or trait',
        helpPopupProps: {
          id: 'gene-page--genetic-interaction-table--phenotype-or-trait-help',
          children: <span>The phenotype or trait affected by the genetic interaction, e.g., the phenotype that was suppressed, enhanced, or masked.</span>,
        },
        headerStyle: {
          width: '130px',
        },
        formatter: (phenotypes) => (
          <CollapsibleList>
            {
              (phenotypes || []).map(({phenotypeStatement}) => {
                return <span key={phenotypeStatement}>{phenotypeStatement}</span>;
              })
            }
          </CollapsibleList>
        ),
        filterable: true,
        filterName: 'phenotypes',
      },
      {
        dataField: 'crossReferences',
        text: 'Source',
        headerStyle: {
          width: '250px',
        },
        formatter: (crossReferences = [], {sourceDatabase = {}, aggregationDatabase = {}} = {}) => (
          <div>
            {
              crossReferences && crossReferences.map(({primaryKey, displayName, prefix, crossRefCompleteUrl} = {}) => (
                <div key={primaryKey}>
                  <ExternalLink href={crossRefCompleteUrl}>{prefix}:{displayName}</ExternalLink>
                </div>
              ))
            }
            {
              (!aggregationDatabase || sourceDatabase.label === aggregationDatabase.label) ?
                null :
                <span>
                  <ExternalLink href={sourceDatabase.url}>{sourceDatabase.label}</ExternalLink>
                  <i><span> via </span></i>
                  <ExternalLink href={aggregationDatabase.url}>{aggregationDatabase.label}</ExternalLink>
                </span>
            }
          </div>
        ),
        filterable: true,
        filterName: 'source',
      },
      {
        dataField: 'publication',
        text: 'Reference',
        headerStyle: {
          width: '150px',
        },
        // eslint-disable-next-line react/prop-types
        formatter: ({pubMedUrl, primaryKey} = {}) => <ExternalLink href={pubMedUrl}>{primaryKey}</ExternalLink>,
        filterable: true,
        filterName: 'reference',
      }
    ]
  ), [focusGeneDisplayName, tableProps]);

  const sortOptions = useMemo(() => (
    [
      {
        value: 'interactorGeneSymbol',
        label: 'Interactor gene',
      },
      {
        value: 'interactorSpecies',
        label: 'Interactor species',
      },
    ]
  ), []);

  return (
    <DataTable
      {...tableProps}
      downloadUrl={`/api/gene/${focusGeneId}/interactions/download?filter.joinType=genetic_interaction`}
      columns={columns}
      sortOptions={sortOptions}
      keyField='primaryKey'
    />
  );
};

GeneGeneticInteractionDetailTable.propTypes = {
  focusGeneId: PropTypes.string.isRequired,
  focusGeneDisplayName: PropTypes.string.isRequired,
};

export default GeneGeneticInteractionDetailTable;
