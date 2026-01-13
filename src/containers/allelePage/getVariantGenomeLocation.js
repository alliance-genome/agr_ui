import { getSingleGenomeLocation } from '../../lib/utils';

export default function getVariantGenomeLocation(variantData) {
  // Support new API data structure
  const nestedVariant = variantData?.variant;
  const variantSubject = nestedVariant?.variantAssociationSubject;
  const variantLocationObj =
    variantSubject?.variantGenomicLocationAssociationObject ||
    nestedVariant?.variantGenomicLocationAssociationObject;

  // Build location from new structure if available
  if (variantLocationObj && nestedVariant?.start != null) {
    const start = nestedVariant.start;
    const end = nestedVariant.end;
    return {
      chromosome: variantLocationObj.name,
      start: Math.max(1, start - 500),
      end: end + 500,
      assembly: variantLocationObj.genomeAssembly?.primaryExternalId,
    };
  }

  // Fall back to old data structure
  const { gene, location: variantLocation } = variantData || {};
  const { genomeLocations } = gene || {};

  return genomeLocations && genomeLocations.length
    ? getSingleGenomeLocation(genomeLocations)
    : variantLocation
      ? {
          // in case not overlapping a gene
          ...variantLocation,
          start: Math.max(1, variantLocation.start - 500),
          end: variantLocation.end + 500,
        }
      : {};
}
