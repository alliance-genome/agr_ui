import {scaleLinear} from 'd3-scale';

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
  return scaleLinear().category10()
    .domain(SPECIES);
}
