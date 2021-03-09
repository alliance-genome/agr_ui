import React from 'react';
import PropTypes from 'prop-types';
import { DataTable } from '../../components/dataTable';
import ExternalLink from '../../components/ExternalLink';
import CollapsibleList from '../../components/collapsibleList/collapsibleList';
import DiseaseLink from '../../components/disease/DiseaseLink';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import AssociationType from '../../components/AssociationType';

const GeneModelsTable = ({id}) => {
  const tableQuery = useDataTableQuery(`/api/gene/${id}/models`);

  const columns = [
    {
      dataField: 'name',
      text: 'Model name',
      formatter: (name, row) => (
        <ExternalLink href={row.url}>
          <span dangerouslySetInnerHTML={{__html: name}} />
        </ExternalLink>
      ),
      filterable: true,
      filterName: 'modelName',
    },
    {
      dataField: 'diseaseModels',
      text: 'Associated Human Diseases',
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
    },
    {
      dataField: 'phenotypes',
      text: 'Associated Phenotypes',
      formatter: phenotypes => phenotypes && (
        <CollapsibleList collapsedSize={2} showBullets>
          {phenotypes.map(phenotype => (
            <span dangerouslySetInnerHTML={{__html: phenotype}} key={phenotype} />
          ))}
        </CollapsibleList>
      ),
      filterable: true,
      filterName: 'phenotype',
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
      columns={columns}
      keyField='id'
    />
  );
};

GeneModelsTable.propTypes = {
  id: PropTypes.string.isRequired,
};

export default GeneModelsTable;
