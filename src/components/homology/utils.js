export function getOrthologSpeciesName(orthology = {}) {
  const { objectGene = {} } = orthology;
  return (objectGene.taxon || {}).name;
}

export function getOrthologSpeciesId(orthology = {}) {
  const { objectGene = {} } = orthology;
  return (objectGene.taxon || {}).curie;
}

export function getOrthologId(orthology = {}) {
  const { objectGene = {} } = orthology;
  return objectGene.primaryExternalId;
}

export function getOrthologSymbol(orthology = {}) {
  const { objectGene = {} } = orthology;
  return objectGene.geneSymbol.displayText;
}
