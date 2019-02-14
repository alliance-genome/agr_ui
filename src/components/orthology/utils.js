export function getOrthologSpeciesName(homologGene = {}) {
  return (homologGene.species || {}).name;
}

export function getOrthologSpeciesId(homologGene = {}) {
  return (homologGene.species || {}).taxonId;
}
