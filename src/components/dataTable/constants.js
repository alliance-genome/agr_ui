export const MODEL_DETAILS_COLUMNS = new Set([
  'Name',
  'Type',
  'Genetic Sex',
  'Notes',
  'Annotation Type',
  'Evidence Codes',
  'Source',
  'Reference',
  'References',
]);

export const GENE_DETAILS_COLUMNS = new Set([
  'Name',
  'Type',
  'Association',
  'Additional Implicated Genes',
  'Experimental Condition',
  'Genetic Modifiers',
  'Strain Background',
  'Genetic Sex',
  'Notes',
  'Annotation Type',
  'Evidence Codes',
  'Source',
  'Reference',
  'References',
]);

export const ALLELE_DETAILS_COLUMNS = new Set([
  'Name',
  'Type',
  'Association',
  'Experimental Condition',
  'Additional Implicated Alleles',
  'Genetic Modifiers',
  'Genetic Sex',
  'Notes',
  'Annotation Type',
  'Evidence Codes',
  'Source',
  'Reference',
  'References',
]);

// Reference pages already scope every annotation to a single reference, so their popups
// omit the local 'Reference' citation column that would otherwise repeat on every row.
export const REFERENCE_PAGE_DETAILS_COLUMNS = new Set(
  [...GENE_DETAILS_COLUMNS].filter((column) => column !== 'Reference')
);
