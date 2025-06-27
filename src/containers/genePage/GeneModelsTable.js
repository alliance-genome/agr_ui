import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import { DataTable } from '../../components/dataTable';
import CollapsibleList from '../../components/collapsibleList/collapsibleList';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import AssociationType from '../../components/AssociationType';
import ExperimentalConditionCell from '../../components/dataTable/ExperimentalConditionCell';
import ExperimentalConditionCellCuration from "../../components/dataTable/ExperimentalConditionCellCuration";
import DiseaseLinkCuration from "../../components/disease/DiseaseLinkCuration";
import ModelCellCuration from "../../components/dataTable/ModelCellCuration";

const GeneModelsTable = ({id}) => {
  const tableQuery = useDataTableQuery(`/api/gene/${id}/models`);
  const data = (tableQuery.data || []).map(record => ({
    ...record,
    key: hash(record)
  }));

  const columns = [
    {
      dataField: 'model',
      text: 'Model name',
      helpPopupProps: {
        id: 'gene-page--model-table--model-name-help',
        children: <span>The genotype--the combination of alleles and strain background--and for fish may include Sequence Targeting Reagents.</span>,
      },
      formatter: model => <ModelCellCuration model={model}/>,
      filterable: true,
      filterName: 'modelName',
      headerStyle: {width: '220px'},
    },
    {
      dataField: 'conditionRelations',
      text: 'Experimental condition',
      formatter: conditions => <ExperimentalConditionCellCuration conditions={conditions} />,
      headerStyle: {width: '220px'},
      filterName: "experimentalCondition",
      filterable: true,
    },
    {
      dataField: 'diseaseTerms',
      text: 'Associated Human Diseases',
      helpPopupProps: {
        id: 'gene-page--model-table--associated-human-diseases-help',
        children: <span>The Disease Ontology (DO) term for which the organism is a model. The DO is a hierarchical, standardized ontology that integrates vocabularies from MeSH, ICD, NCI’s thesaurus, SNOMED, UMLS, Orphanet, EFO and OMIM. Its hierarchical structure permits a range of detail from high-level, broadly descriptive terms to very low-level, highly specific terms.</span>,
      },
      formatter: diseaseTerms => diseaseTerms && (
        <CollapsibleList collapsedSize={diseaseTerms.length}>
          {diseaseTerms.map(diseaseModel => (
            <div key={diseaseModel.associationType + diseaseModel.curie}>
              <AssociationType type={diseaseModel.associationType} showOnlyNot />{' '}
              <DiseaseLinkCuration disease={diseaseModel} />
            </div>
          ))}
        </CollapsibleList>
      ),
      filterable: true,
      filterName: 'disease',
      headerStyle: {width: '230px'},
    },
    {
      dataField: 'associatedPhenotype',
      text: 'Associated Phenotypes',
      formatter: associatedPhenotype => associatedPhenotype && (
        <CollapsibleList collapsedSize={2} showBullets>
          {associatedPhenotype.map(phenotype => (
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
      formatter: conditions => <ExperimentalConditionCellCuration conditions={conditions} />,
      headerStyle: {width: '220px'},
    },
    {
      dataField: 'dataProvider',
      text: 'Source',
      formatter: dataProvider => dataProvider ,
      headerStyle: {width: '100px'},
      filterName: 'source',
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
