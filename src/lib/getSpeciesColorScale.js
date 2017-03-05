import d3 from 'd3';

const SPECIES = [
  'Homo sapiens',
  'Mus musculus',
  'Danio rerio',
  'Drosophila melanogaster',
  'Saccharomyces cerevisiae',
  'Caenorhabditis elegans',
  'Rattus norvegicus'
];

export default function getSpeciesColorScale() {
  return d3.scale.category10()
    .domain(SPECIES);
}
