import { getSingleGenomeLocation } from '../../lib/utils';

export default function getVariantGenomeLocation(variant) {
  const { gene, location: variantLocation } = variant;
  const { genomeLocations } = gene || {};

  return genomeLocations && genomeLocations.length ?
    getSingleGenomeLocation(genomeLocations) :
    variantLocation ? {
      // in case not overlapping a gene
      ...variantLocation,
      start: Math.max(1, variantLocation.start - 500),
      end: variantLocation.end + 500,
    } : {};
}