import React from 'react';
import { Link } from 'react-router-dom';
import { SpeciesCell } from '../../../components/dataTable';
import createReferenceTable from './createReferenceTable.jsx';

const formatLocation = (gene) => {
  const assoc = gene.geneGenomicLocationAssociations?.[0];
  if (!assoc) return null;
  const loc = assoc.geneGenomicLocationAssociationObject || {};
  const chrom = loc.name || loc.chromosome || loc.chromosomeAccession;
  const start = assoc.start ?? assoc.startPosition;
  const end = assoc.end ?? assoc.endPosition;
  if (!chrom) return null;
  if (start && end) return `${chrom}:${start}-${end}`;
  return chrom;
};

const columns = [
  {
    dataField: 'speciesName',
    text: 'Species',
    headerStyle: { width: '130px' },
    filterable: true,
    formatter: (_, row) => row.species && <SpeciesCell taxon={row.species} />,
  },
  {
    dataField: 'symbol',
    text: 'Symbol',
    headerStyle: { width: '120px' },
    filterable: true,
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
    filterable: true,
    formatter: (n) => n && <span dangerouslySetInnerHTML={{ __html: n }} />,
  },
  { dataField: 'biotype', text: 'Biotype', headerStyle: { width: '120px' }, filterable: true },
  { dataField: 'location', text: 'Genome location', headerStyle: { width: '160px' }, filterable: true },
];

const ReferenceGeneTable = createReferenceTable({
  displayName: 'ReferenceGeneTable',
  endpoint: 'genes',
  columns,
  transform: (gene) => ({
    species: gene.taxon,
    speciesName: gene.taxon?.name,
    symbol: gene.geneSymbol?.displayText,
    name: gene.geneFullName?.displayText,
    biotype: gene.geneType?.name,
    location: formatLocation(gene),
    curie: gene.primaryExternalId,
  }),
});

export default ReferenceGeneTable;
