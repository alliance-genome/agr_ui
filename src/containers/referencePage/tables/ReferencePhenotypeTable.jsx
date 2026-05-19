import React from 'react';
import { GeneCellCuration, SpeciesCell } from '../../../components/dataTable';
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
    headerStyle: { width: '120px' },
    formatter: (species) => species && <SpeciesCell species={species} />,
  },
  {
    dataField: 'subject',
    text: 'Name (Gene / Allele / AGM)',
    headerStyle: { width: '180px' },
    formatter: subjectFormatter,
  },
  {
    dataField: 'phenotypeStatement',
    text: 'Phenotype Term',
    filterable: true,
    filterName: 'phenotype',
    headerStyle: { width: '300px' },
  },
  {
    dataField: 'category',
    text: 'Type',
    headerStyle: { width: '160px' },
    formatter: (cat) => {
      if (cat === 'gene_phenotype_annotation') return 'Gene';
      if (cat === 'allele_phenotype_annotation') return 'Allele';
      if (cat === 'agm_phenotype_annotation') return 'AGM';
      return cat;
    },
  },
  {
    dataField: 'experimentalConditionsAggregated',
    text: 'Experimental Condition',
    headerStyle: { width: '200px' },
  },
];

const ReferencePhenotypeTable = createReferenceTable({
  displayName: 'ReferencePhenotypeTable',
  endpoint: 'phenotype-annotations',
  columns,
  transform: (record) => ({
    ...record,
    species: record.subject?.taxon,
  }),
});

export default ReferencePhenotypeTable;
