import React from 'react';
import PropTypes from 'prop-types';
import { DataTable } from '../../components/dataTable';
import ExternalLink from '../../components/externalLink';
import CollapsibleList from '../../components/collapsibleList/collapsibleList';
import DiseaseLink from '../../components/disease/DiseaseLink';
import useDataTableQuery from '../../hooks/useDataTableQuery';

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
      dataField: 'diseases',
      text: 'Associated Human Diseases',
      formatter: diseases => diseases && (
        <CollapsibleList collapsedSize={diseases.length}>
          {diseases.map(disease => <DiseaseLink disease={disease} key={disease.id} />)}
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
