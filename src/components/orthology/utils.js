export function getOrthologSpeciesName(ortholog = {}) {
  const {
    homologGene = {}
  } = ortholog;
  return (homologGene.species || {}).name;
}

export function getOrthologSpeciesId(ortholog = {}) {
  const {
    homologGene = {}
  } = ortholog;
  return (homologGene.species || {}).taxonId;
}

export function getOrthologId(ortholog = {}) {
  const {
    homologGene = {}
  } = ortholog;
  return homologGene.id;
}

export function getOrthologSymbol(ortholog = {}) {
  const {
    homologGene = {}
  } = ortholog;
  return homologGene.symbol;
}
