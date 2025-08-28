import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import { DataTable, ReferencesCellCuration, GeneCellCuration } from '../../components/dataTable';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import { getIdentifier } from '../../components/dataTable/utils.jsx';
import AnnotatedPhenotypePopupCuration from '../../components/dataTable/AnnotatedPhenotypePopupCuration.jsx';
import { GENE_DETAILS_COLUMNS } from '../../components/dataTable/constants';
import ProvidersCellCuration from '../../components/dataTable/ProvidersCellCuration.jsx';

const PhenotypeTable = ({ geneId, entityType, hideSourceColumn = false }) => {
  const { data: results, ...tableProps } = useDataTableQuery(`/api/${entityType}/${geneId}/phenotypes`);

  const data = results?.map((record) => ({
    ...record,
    id: hash(record),
  }));

  const columns = [
    {
      dataField: 'phenotypeStatement',
      text: 'Phenotype Term',
      formatter: (term) => <span dangerouslySetInnerHTML={{ __html: term }} />,
      headerStyle: { width: '120px' },
      filterable: true,
      filterName: 'termName',
    },
    {
      dataField: 'primaryAnnotations',
      text: 'Annotation details',
      formatter: (subject, row) => (
        <>
          <GeneCellCuration curie={getIdentifier(subject)} geneSymbol={subject.geneSymbol} />
          <small>
            <AnnotatedPhenotypePopupCuration
              entities={row.primaryAnnotations}
              mainRowCurie={getIdentifier(subject)}
              pubModIds={row.pubmedPubModIDs}
              columnNameSet={GENE_DETAILS_COLUMNS}
            >
              View
            </AnnotatedPhenotypePopupCuration>
          </small>
        </>
      ),
      headerStyle: { width: '90px' },
    },
    {
      dataField: 'primaryAnnotations',
      text: 'Source',
      formatter: (primaryAnnotations) => primaryAnnotations && <ProvidersCellCuration providers={primaryAnnotations} />,
      filterable: true,
      headerStyle: { width: '100px' },
      filterName: 'dataProvider',
      hide: hideSourceColumn,
    },
    {
      dataField: 'pubmedPubModIDs',
      text: 'References',
      filterable: true,
      filterName: 'reference',
      headerStyle: { width: '150px' },
      formatter: (pubModIds) => <ReferencesCellCuration pubModIds={pubModIds} />,
    },
  ];

  return (
    <DataTable
      {...tableProps}
      columns={columns}
      data={data}
      downloadUrl={`/api/${entityType}/${geneId}/phenotypes/download`}
      keyField="id"
      summaryProps={
        data && data.supplementalData
          ? {
              ...data.supplementalData.annotationSummary,
              entityType: 'phenotype',
            }
          : null
      }
    />
  );
};

PhenotypeTable.propTypes = {
  geneId: PropTypes.string.isRequired,
  entityType: PropTypes.string.isRequired,
  hideSourceColumn: PropTypes.bool,
};

export default PhenotypeTable;
