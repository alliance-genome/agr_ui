import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import { DataTable, ReferencesCellCuration, ReferenceList } from '../../components/dataTable';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import AnnotatedPhenotypePopupCuration from '../../components/dataTable/AnnotatedPhenotypePopupCuration.jsx';
import { GENE_DETAILS_COLUMNS } from '../../components/dataTable/constants';
import ProvidersCellCuration from '../../components/dataTable/ProvidersCellCuration.jsx';

const PhenotypeTable = ({ geneId, entityType, hideSourceColumn = false }) => {
  const { data: results, ...tableProps } = useDataTableQuery(`/api/${entityType}/${geneId}/phenotypes`);

  const citationFilter = tableProps.tableState?.filters?.referenceCitation?.filterVal;

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
      // every row's subject is the page's own gene or allele, so only the popup link belongs here
      formatter: (_, row) => (
        <small>
          <AnnotatedPhenotypePopupCuration
            entities={row.primaryAnnotations}
            pubmedPublications={row.pubmedPublications}
            columnNameSet={GENE_DETAILS_COLUMNS}
          >
            View
          </AnnotatedPhenotypePopupCuration>
        </small>
      ),
      headerStyle: { width: '90px' },
    },
    {
      dataField: 'primaryAnnotationsSource',
      text: 'Source',
      formatter: (_, row) => row.primaryAnnotations && <ProvidersCellCuration providers={row.primaryAnnotations} />,
      filterable: true,
      headerStyle: { width: '100px' },
      filterName: 'dataProvider',
      hide: hideSourceColumn,
    },
    {
      dataField: 'references',
      text: 'Reference',
      headerStyle: { width: '180px' },
      formatter: (references) => <ReferenceList refs={references} filterTerm={citationFilter} />,
      filterable: true,
      filterName: 'referenceCitation',
    },
    {
      dataField: 'pubmedPublications',
      text: 'Reference ID',
      filterable: true,
      filterName: 'reference',
      headerStyle: { width: '150px' },
      formatter: (pubmedPublications) => <ReferencesCellCuration pubmedPublications={pubmedPublications} />,
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
