import React from 'react';
import {
  BasedOnGeneCellCuration,
  EvidenceCodesCellCuration,
  GeneCellCuration,
  SpeciesCell,
} from '../../../components/dataTable';
import AssociationType from '../../../components/AssociationType.jsx';
import DiseaseLinkCuration from '../../../components/disease/DiseaseLinkCuration.jsx';
import DiseaseQualifiersColumn from '../../../components/dataTable/DiseaseQualifiersColumn.jsx';
import ProvidersCellCuration from '../../../components/dataTable/ProvidersCellCuration.jsx';
import { getIdentifier } from '../../../components/dataTable/utils.jsx';
import createReferenceTable from './createReferenceTable.jsx';

const subjectFormatter = (subject) => {
  if (!subject) return null;
  const identifier = getIdentifier(subject);
  if (subject.type === 'Gene') {
    return <GeneCellCuration identifier={identifier} gene={subject} />;
  }
  const label = subject.alleleSymbol?.displayText || subject.name || identifier;
  return <span dangerouslySetInnerHTML={{ __html: label }} />;
};

const columns = [
  {
    dataField: 'species',
    text: 'Species',
    filterable: true,
    filterName: 'species',
    headerStyle: { width: '100px' },
    formatter: (species) => species && <SpeciesCell species={species} />,
  },
  {
    dataField: 'subject',
    text: 'Gene / Allele / Model',
    headerStyle: { width: '150px' },
    formatter: subjectFormatter,
  },
  {
    dataField: 'generatedRelationString',
    text: 'Association',
    filterable: true,
    filterName: 'associationType',
    headerStyle: { width: '120px' },
    formatter: (type) => <AssociationType type={type} />,
  },
  {
    dataField: 'diseaseQualifiers',
    text: 'Disease Qualifier',
    headerStyle: { width: '100px' },
    formatter: (qualifiers) => <DiseaseQualifiersColumn qualifiers={qualifiers} />,
  },
  {
    dataField: 'disease',
    text: 'Disease',
    filterable: true,
    filterName: 'disease',
    headerStyle: { width: '150px' },
    formatter: (disease) => disease && <DiseaseLinkCuration disease={disease} />,
  },
  {
    dataField: 'evidenceCodes',
    text: 'Evidence',
    filterable: true,
    filterName: 'evidenceCode',
    headerStyle: { width: '100px' },
    formatter: (codes) => <EvidenceCodesCellCuration evidenceCodes={codes} />,
  },
  {
    dataField: 'providers',
    text: 'Source',
    filterable: true,
    filterName: 'dataProvider',
    headerStyle: { width: '100px' },
    formatter: (providers) => providers && <ProvidersCellCuration providers={providers} />,
  },
  {
    dataField: 'basedOnGenes',
    text: 'Based On',
    headerStyle: { width: '100px' },
    formatter: BasedOnGeneCellCuration,
  },
];

const ReferenceDiseaseTable = createReferenceTable({
  displayName: 'ReferenceDiseaseTable',
  endpoint: 'disease-annotations',
  columns,
  transform: (record) => ({
    ...record,
    disease: record.object,
    species: record.subject?.taxon,
  }),
});

export default ReferenceDiseaseTable;
