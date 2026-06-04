import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import {
  DataTable,
  GeneCellCuration,
  AlleleCellCuration,
  SpeciesCell,
} from '../../../components/dataTable';
import useDataTableQuery from '../../../hooks/useDataTableQuery';
import { getIdentifier } from '../../../components/dataTable/utils.jsx';
import AnnotatedPhenotypePopupCuration from '../../../components/dataTable/AnnotatedPhenotypePopupCuration.jsx';
import { GENE_DETAILS_COLUMNS } from '../../../components/dataTable/constants';
import ProvidersCellCuration from '../../../components/dataTable/ProvidersCellCuration.jsx';

const ReferencePhenotypeTable = ({ id }) => {
  const { data: results, ...tableProps } = useDataTableQuery(`/api/reference/${id}/phenotype-annotations`);

  const data = (results || []).map((record) => ({
    ...record,
    id: hash(record),
  }));

  const columns = [
    {
      dataField: 'species',
      text: 'Species',
      headerStyle: { width: '120px' },
      filterable: true,
      filterName: 'species',
      formatter: (_, row) => {
        const taxon = row.subject?.taxon || row.primaryAnnotations?.[0]?.inferredGene?.taxon;
        return taxon && <SpeciesCell taxon={taxon} />;
      },
    },
    {
      dataField: 'gene',
      text: 'Gene',
      headerStyle: { width: '140px' },
      filterable: true,
      filterName: 'gene',
      formatter: (_, row) => {
        const gene = row.primaryAnnotations?.[0]?.inferredGene;
        if (!gene) return null;
        return <GeneCellCuration identifier={getIdentifier(gene)} gene={gene} />;
      },
    },
    {
      dataField: 'allele',
      text: 'Allele',
      headerStyle: { width: '140px' },
      filterable: true,
      filterName: 'allele',
      formatter: (_, row) => {
        const allele = row.primaryAnnotations?.[0]?.inferredAllele;
        if (!allele) return null;
        return <AlleleCellCuration identifier={getIdentifier(allele)} allele={allele} />;
      },
    },
    {
      dataField: 'phenotypeStatement',
      text: 'Phenotype Term',
      headerStyle: { width: '260px' },
      filterable: true,
      filterName: 'phenotype',
      formatter: (term) => term && <span dangerouslySetInnerHTML={{ __html: term }} />,
    },
    {
      dataField: 'annotationDetails',
      text: 'Annotation Details',
      headerStyle: { width: '120px' },
      formatter: (_, row) => (
        <small>
          <AnnotatedPhenotypePopupCuration
            entities={row.primaryAnnotations}
            mainRowCurie={row.subject ? getIdentifier(row.subject) : undefined}
            pubModIds={row.pubmedPubModIDs}
            columnNameSet={GENE_DETAILS_COLUMNS}
          >
            View
          </AnnotatedPhenotypePopupCuration>
        </small>
      ),
    },
    {
      dataField: 'source',
      text: 'Source',
      headerStyle: { width: '100px' },
      filterable: true,
      filterName: 'dataProvider',
      formatter: (_, row) => row.primaryAnnotations && <ProvidersCellCuration providers={row.primaryAnnotations} />,
    },
  ];

  return <DataTable {...tableProps} columns={columns} data={data} keyField="id" />;
};

ReferencePhenotypeTable.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ReferencePhenotypeTable;
