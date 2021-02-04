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

const GeneGeneticInteractionDetailTable = ({
  focusGeneId,
  focusGeneDisplayName,
}) => {
  const tableProps = useDataTableQuery(`/api/gene/${focusGeneId}/interactions`, undefined, {
    filters: {
      joinType: {
        filterVal: 'genetic_interaction',
      },
    },
  });

  const columns = useMemo(() => (
    [
      {
        dataField: 'interactorARole',
        text: `${focusGeneDisplayName} role`,
        headerStyle: {
          width: '150px',
        },
        formatter: (term, _, rowIndex) => <MITerm {...term} id={`genetic_interaction-interactorARole-${rowIndex}`} />,
        filterable: true,
      },
      {
        dataField: 'alleleA',
        text: `${focusGeneDisplayName} genetic perturbation`,
        headerStyle: {
          width: '150px',
        },
        formatter: (allele) => (allele ? <AlleleCell allele={allele} /> : null),
        filterable: true,
      },
      {
        dataField: 'geneB',
        text: 'Interactor gene',
        headerStyle: {
          width: '150px',
        },
        formatter: GeneCell,
        filterable: true,
      },
      {
        dataField: 'geneB.species',
        text: 'Interactor species',
        headerStyle: {
          width: '200px',
        },
        formatter: (species) => <SpeciesCell species={species} />,
        filterable: true,
      },
      {
        dataField: 'interactorBRole',
        text: 'Interactor role',
        headerStyle: {
          width: '150px',
        },
        formatter: (term, _, rowIndex) => <MITerm {...term} id={`genetic_interaction-interactorBRole-${rowIndex}`} />,
        filterable: true,
      },
      {
        dataField: 'alleleB',
        text: 'Interactor genetic perturbation',
        headerStyle: {
          width: '150px',
        },
        formatter: (allele) => (allele ? <AlleleCell allele={allele} /> : null),
        filterable: true,
      },
      {
        dataField: 'interactionType',
        text: 'Interaction type',
        headerStyle: {
          width: '150px',
        },
        formatter: (term, _, rowIndex) => <MITerm {...term} id={`genetic_interaction-interactionType-${rowIndex}`} />,
        filterable: true,
      },
      {
        // dataField: 'phenotypes',
        text: 'Phenotype or trait',
        headerStyle: {
          width: '150px',
        },
        filterable: true,
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
              crossReferences && crossReferences.map(({primaryKey, displayName, prefix, url} = {}) => (
                <div key={primaryKey}>
                  <ExternalLink href={url}>{prefix}:{displayName}</ExternalLink>
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
