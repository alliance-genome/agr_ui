import React from 'react';
import { Link } from 'react-router-dom';
import { SpeciesCell } from '../../../components/dataTable';
import createReferenceTable from './createReferenceTable.jsx';

const synonymNames = (allele) => {
  const syns = allele.alleleSynonyms || allele.synonyms || [];
  return syns.map((s) => s.displayText || s.name || s).filter(Boolean);
};

const columns = [
  {
    dataField: 'species',
    text: 'Species',
    headerStyle: { width: '130px' },
    formatter: (species) => species && <SpeciesCell taxon={species} />,
  },
  {
    dataField: 'symbol',
    text: 'Symbol',
    headerStyle: { width: '160px' },
    formatter: (symbol, row) => (
      <Link to={`/allele/${row.curie}`}>
        <span dangerouslySetInnerHTML={{ __html: symbol || row.curie }} />
      </Link>
    ),
  },
  {
    dataField: 'synonyms',
    text: 'Synonyms',
    headerStyle: { width: '200px' },
    formatter: (syns) =>
      syns && syns.length ? <span dangerouslySetInnerHTML={{ __html: syns.join(', ') }} /> : null,
  },
  { dataField: 'mutationType', text: 'Mutation type', headerStyle: { width: '150px' } },
  { dataField: 'molecularConsequence', text: 'Molecular consequence', headerStyle: { width: '180px' } },
  { dataField: 'source', text: 'Source', headerStyle: { width: '100px' } },
];

const ReferenceAlleleTable = createReferenceTable({
  displayName: 'ReferenceAlleleTable',
  endpoint: 'alleles',
  columns,
  transform: (allele) => ({
    species: allele.taxon,
    symbol: allele.alleleSymbol?.displayText,
    synonyms: synonymNames(allele),
    mutationType: allele.alleleMutationTypes
      ?.map((m) => m.mutationTypes?.map((t) => t.name))
      .flat()
      .filter(Boolean)
      .join(', '),
    molecularConsequence: allele.alleleMolecularConsequences
      ?.map((c) => c.molecularConsequence?.name)
      .filter(Boolean)
      .join(', '),
    source:
      allele.dataProvider?.abbreviation ||
      allele.dataProviderCrossReference?.resourceDescriptorPage?.resourceDescriptor?.name,
    curie: allele.primaryExternalId,
  }),
});

export default ReferenceAlleleTable;
