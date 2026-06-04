import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import {
  BasedOnGeneCellCuration,
  DataTable,
  EvidenceCodesCellCuration,
  GeneCellCuration,
  AlleleCellCuration,
  SpeciesCell,
} from '../../../components/dataTable';
import useDataTableQuery from '../../../hooks/useDataTableQuery';
import { getIdentifier } from '../../../components/dataTable/utils.jsx';
import AssociationType from '../../../components/AssociationType.jsx';
import DiseaseLinkCuration from '../../../components/disease/DiseaseLinkCuration.jsx';
import DiseaseQualifiersColumn from '../../../components/dataTable/DiseaseQualifiersColumn.jsx';
import ProvidersCellCuration from '../../../components/dataTable/ProvidersCellCuration.jsx';
import AnnotatedEntitiesPopupCuration from '../../../components/dataTable/AnnotatedEntitiesPopupCuration.jsx';
import { GENE_DETAILS_COLUMNS } from '../../../components/dataTable/constants';

const ReferenceDiseaseTable = ({ id }) => {
  const { data: results, ...tableProps } = useDataTableQuery(`/api/reference/${id}/disease-annotations`);

  const data = (results || []).map((record) => ({
    ...record,
    id: hash(record),
  }));

  const columns = [
    {
      dataField: 'species',
      text: 'Species',
      headerStyle: { width: '100px' },
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
      dataField: 'generatedRelationString',
      text: 'Association',
      headerStyle: { width: '120px' },
      filterable: true,
      filterName: 'associationType',
      formatter: (type) => <AssociationType type={type} />,
    },
    {
      dataField: 'diseaseQualifiers',
      text: 'Disease Qualifier',
      headerStyle: { width: '100px' },
      filterable: true,
      filterName: 'diseaseQualifier',
      formatter: (qualifiers) => <DiseaseQualifiersColumn qualifiers={qualifiers} />,
    },
    {
      dataField: 'object',
      text: 'Disease',
      headerStyle: { width: '180px' },
      filterable: true,
      filterName: 'disease',
      formatter: (disease) => disease && <DiseaseLinkCuration disease={disease} />,
    },
    {
      dataField: 'annotationDetails',
      text: 'Annotation Details',
      headerStyle: { width: '120px' },
      formatter: (_, row) => (
        <small>
          <AnnotatedEntitiesPopupCuration
            entities={row.primaryAnnotations}
            mainRowCurie={row.subject ? getIdentifier(row.subject) : undefined}
            pubModIds={row.pubmedPubModIDs}
            columnNameSet={GENE_DETAILS_COLUMNS}
          >
            View
          </AnnotatedEntitiesPopupCuration>
        </small>
      ),
    },
    {
      dataField: 'evidenceCodes',
      text: 'Evidence',
      headerStyle: { width: '100px' },
      filterable: true,
      filterName: 'evidenceCode',
      formatter: (codes) => <EvidenceCodesCellCuration evidenceCodes={codes} />,
    },
    {
      dataField: 'providers',
      text: 'Source',
      headerStyle: { width: '100px' },
      filterable: true,
      filterName: 'dataProvider',
      formatter: (_, row) => row.primaryAnnotations && <ProvidersCellCuration providers={row.primaryAnnotations} />,
    },
    {
      dataField: 'basedOnGenes',
      text: 'Based On',
      headerStyle: { width: '100px' },
      filterable: true,
      filterName: 'basedOnGene',
      formatter: BasedOnGeneCellCuration,
    },
  ];

  return <DataTable {...tableProps} columns={columns} data={data} keyField="id" />;
};

ReferenceDiseaseTable.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ReferenceDiseaseTable;
