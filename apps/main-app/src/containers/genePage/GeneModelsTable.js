import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import { DataTable } from '../../components/dataTable';
import ExternalLink from '../../components/ExternalLink';
import CollapsibleList from '../../components/collapsibleList/collapsibleList';
import DiseaseLink from '../../components/disease/DiseaseLink';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import AssociationType from '../../components/AssociationType';
import ExperimentalConditionCell from '../../components/dataTable/ExperimentalConditionCell';

const GeneModelsTable = ({id}) => {
  const tableQuery = useDataTableQuery(`/api/gene/${id}/models`);
  const data = (tableQuery.data || []).map(record => ({
    ...record,
    key: hash(record)
  }));

  const columns = [
    {
      dataField: 'name',
      text: 'Model name',
      helpPopupProps: {
        id: 'gene-page--model-table--model-name-help',
        children: <span>A representation of the population of organisms used in a study. These may include disease models, inbred strains and mutant genotypes.</span>,
      },
      formatter: (name, row) => (
        <ExternalLink href={row.url}>
          <span dangerouslySetInnerHTML={{__html: name}} />
        </ExternalLink>
      ),
      filterable: true,
      filterName: 'modelName',
      headerStyle: {width: '220px'},
    },
    {
      dataField: 'conditions',
      text: 'Experimental condition',
      helpPopupProps: {
        id: 'gene-page--model-table--experimental-condition-help',
        children: <span>Any condition applied that contributes to an organism being a model. (Examples: drugs, diet, environmental temperature)</span>,
      },
      formatter: conditions => <ExperimentalConditionCell conditions={conditions} />,
      headerStyle: {width: '220px'},
    },
    {
      dataField: 'diseaseModels',
      text: 'Associated Human Diseases',
      helpPopupProps: {
        id: 'gene-page--model-table--associated-human-diseases-help',
        children: <span>The Disease Ontology (DO) term for which the organism is a model. The DO is a hierarchical, standardized ontology that integrates vocabularies from MeSH, ICD, NCI’s thesaurus, SNOMED, UMLS, Orphanet, EFO and OMIM. Its hierarchical structure permits a range of detail from high-level, broadly descriptive terms to very low-level, highly specific terms.</span>,
      },
      formatter: diseaseModels => diseaseModels && (
        <CollapsibleList collapsedSize={diseaseModels.length}>
          {diseaseModels.map(diseaseModel => (
            <div key={diseaseModel.associationType + diseaseModel.disease.id}>
              <AssociationType type={diseaseModel.associationType} showOnlyNot />{' '}
              <DiseaseLink disease={diseaseModel.disease} />
            </div>
          ))}
        </CollapsibleList>
      ),
      filterable: true,
      filterName: 'disease',
      headerStyle: {width: '230px'},
    },
    {
      dataField: 'phenotypes',
      text: 'Associated Phenotypes',
      helpPopupProps: {
        id: 'gene-page--model-table--associated-phenotypes-help',
        children: <span>The list of phenotypes observed in the model organism.</span>,
      },
      formatter: phenotypes => phenotypes && (
        <CollapsibleList collapsedSize={2} showBullets>
          {phenotypes.map(phenotype => (
            <span dangerouslySetInnerHTML={{__html: phenotype}} key={phenotype} />
          ))}
        </CollapsibleList>
      ),
      filterable: true,
      filterName: 'phenotype',
      headerStyle: {width: '220px'},
    },
    {
      dataField: 'conditionModifiers',
      text: 'Modifier',
      helpPopupProps: {
        id: 'gene-page--model-table--modifier-help',
        children: <span>A secondary condition that ameliorates or exacerbates the phenotype in the model.</span>,
      },
      formatter: conditions => <ExperimentalConditionCell conditions={conditions} />,
      headerStyle: {width: '220px'},
    },
    {
      dataField: 'source',
      text: 'Source',
      formatter: source => source && source.name,
      headerStyle: {width: '100px'},
      filterable: true,
    },
  ];

  return (
    <DataTable
      {...tableQuery}
      data={data}
      columns={columns}
      keyField='key'
    />
  );
};

GeneModelsTable.propTypes = {
  id: PropTypes.string.isRequired,
};

export default GeneModelsTable;
