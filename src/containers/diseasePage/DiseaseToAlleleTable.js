import React from 'react';
import PropTypes from 'prop-types';
import {
  AlleleCell,
  DataTable,
  EvidenceCodesCell,
  ReferenceCell,
  SpeciesCell
} from '../../components/dataTable';
import AnnotatedEntitiesPopup
  from '../../components/dataTable/AnnotatedEntitiesPopup';
import DiseaseLink from '../../components/disease/DiseaseLink';
import {getDistinctFieldValue} from '../../components/dataTable/utils';
import {compareByFixedOrder} from '../../lib/utils';
import {SPECIES_NAME_ORDER} from '../../constants';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import LoadingSpinner from '../../components/loadingSpinner';

const DiseaseToAlleleTable = ({id}) => {
  const {
    isLoading,
    isFetching,
    resolvedData,
    tableState,
    setTableState
  } = useDataTableQuery(`/api/disease/${id}/alleles`);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const data = resolvedData.results.map(association => ({
    ...association,
    species: association.allele.species,
  }));

  const columns = [
    {
      dataField: 'allele',
      text: 'Allele',
      formatter: (allele, row) => (
        <React.Fragment>
          <div><AlleleCell allele={allele}/></div>
          <small>
            <AnnotatedEntitiesPopup entities={row.primaryAnnotatedEntities}>
              Based on inferences
            </AnnotatedEntitiesPopup>
          </small>
        </React.Fragment>
      ),
      headerStyle: {width: '185px'},
      filterable: true,
      filterName: 'alleleName',
    },
    {
      dataField: 'species',
      text: 'Species',
      formatter: species => <SpeciesCell species={species}/>,
      filterable: getDistinctFieldValue(resolvedData, 'species').sort(compareByFixedOrder(SPECIES_NAME_ORDER)),
      filterLabelClassName: 'species-name',
      headerStyle: {width: '105px'},
    },
    {
      dataField: 'associationType',
      text: 'Association',
      formatter: (type) => type.replace(/_/g, ' '),
      headerStyle: {width: '110px'},
      filterable: getDistinctFieldValue(resolvedData, 'associationType').map(type => type.replace(/_/g, ' ')),
    },
    {
      dataField: 'disease',
      text: 'Disease',
      formatter: disease => <DiseaseLink disease={disease} />,
      headerStyle: {width: '150px'},
      filterable: true,
    },
    {
      dataField: 'evidenceCodes',
      text: 'Evidence',
      formatter: EvidenceCodesCell,
      headerStyle: {width: '100px'},
      filterable: true,
      filterName: 'evidenceCode',
    },
    {
      dataField: 'source',
      text: 'Source',
      formatter: source => source.name,
      headerStyle: {width: '100px'},
      filterable: true,
    },
    {
      dataField: 'publications',
      text: 'References',
      formatter: ReferenceCell,
      headerStyle: {width: '150px'},
      filterable: true,
      filterName: 'reference',
    }
  ];

  const sortOptions = [
    {
      value: 'disease',
      label: 'Disease',
    },
    {
      value: 'allele',
      label: 'Allele',
    },
    {
      value: 'species',
      label: 'Species',
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      downloadUrl={`/api/disease/${id}/alleles/download`}
      key={id}
      keyField='primaryKey'
      loading={isFetching}
      setTableState={setTableState}
      sortOptions={sortOptions}
      tableState={tableState}
      totalRows={resolvedData.total}
    />
  );
};

DiseaseToAlleleTable.propTypes = {
  id: PropTypes.string,
};

export default DiseaseToAlleleTable;
