import React from 'react';
import { Link } from 'react-router-dom';
import { SpeciesCell } from '../../../components/dataTable';
import createReferenceTable from './createReferenceTable.jsx';

const formatLocation = (gene) => {
  const assoc = gene.geneGenomicLocationAssociations?.[0];
  if (!assoc) return null;
  const loc = assoc.geneGenomicLocationAssociationObject || assoc;
  const chrom = loc.chromosome || loc.chromosomeAccession;
  const start = loc.start ?? loc.startPosition;
  const end = loc.end ?? loc.endPosition;
  if (!chrom) return null;
  if (start && end) return `${chrom}:${start}-${end}`;
  return chrom;
};

const columns = [
  {
    dataField: 'species',
    text: 'Species',
    headerStyle: { width: '130px' },
    formatter: (species) => species && <SpeciesCell species={species} />,
  },
  {
    dataField: 'symbol',
    text: 'Symbol',
    headerStyle: { width: '120px' },
    formatter: (symbol, row) => (
      <Link to={`/gene/${row.curie}`}>
        <span dangerouslySetInnerHTML={{ __html: symbol || row.curie }} />
      </Link>
    ),
  },
  {
    dataField: 'name',
    text: 'Name',
    headerStyle: { width: '220px' },
    formatter: (n) => n && <span dangerouslySetInnerHTML={{ __html: n }} />,
  },
  { dataField: 'biotype', text: 'Biotype', headerStyle: { width: '120px' } },
  { dataField: 'location', text: 'Genome location', headerStyle: { width: '160px' } },
];

const ReferenceGeneTable = createReferenceTable({
  displayName: 'ReferenceGeneTable',
  endpoint: 'genes',
  columns,
  transform: (gene) => ({
    species: gene.taxon,
    symbol: gene.geneSymbol?.displayText,
    name: gene.geneFullName?.displayText,
    biotype: gene.geneType?.name,
    location: formatLocation(gene),
    curie: gene.primaryExternalId,
  }),
});

export default ReferenceGeneTable;
