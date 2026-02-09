import { getSingleGenomeLocation } from '../../lib/utils';

export default function getVariantGenomeLocation(variantData) {
  // Support new API data structure
  const nestedVariant = variantData?.variant;
  const variantSubject = nestedVariant?.variantAssociationSubject;
  const variantLocationObj =
    variantSubject?.variantGenomicLocationAssociationObject || nestedVariant?.variantGenomicLocationAssociationObject;

  // First, check for overlapping genes' genome locations (prioritize gene span like production)
  // If multiple genes overlap, use the smallest start and greatest end to cover all genes
  const overlapGenes = nestedVariant?.overlapGenes;
  if (overlapGenes && overlapGenes.length > 0) {
    // Collect all start/end values from geneGenomicLocationAssociations across all overlap genes
    const allLocations = [];
    for (const gene of overlapGenes) {
      const geneLocationAssociations = gene?.geneGenomicLocationAssociations;
      if (geneLocationAssociations && geneLocationAssociations.length > 0) {
        allLocations.push(...geneLocationAssociations);
      }
    }

    // If we found any geneGenomicLocationAssociations, calculate the range
    if (allLocations.length > 0) {
      const minStart = Math.min(...allLocations.map((loc) => loc.start));
      const maxEnd = Math.max(...allLocations.map((loc) => loc.end));
      return {
        chromosome: variantLocationObj?.name,
        start: minStart,
        end: maxEnd,
        assembly: variantLocationObj?.genomeAssembly?.primaryExternalId,
      };
    }

    // Fall back to genomeLocations from the first gene if available
    const firstGene = overlapGenes[0];
    const geneLocations = firstGene?.genomeLocations;
    if (geneLocations && geneLocations.length > 0) {
      return getSingleGenomeLocation(geneLocations);
    }
  }

  // Fall back to old data structure for gene locations
  const { gene, location: variantLocation } = variantData || {};
  const { genomeLocations } = gene || {};

  if (genomeLocations && genomeLocations.length) {
    return getSingleGenomeLocation(genomeLocations);
  }

  // Only use variant position + padding if no gene data is available
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

  return variantLocation
    ? {
        // in case not overlapping a gene
        ...variantLocation,
        start: Math.max(1, variantLocation.start - 500),
        end: variantLocation.end + 500,
      }
    : {};
}
