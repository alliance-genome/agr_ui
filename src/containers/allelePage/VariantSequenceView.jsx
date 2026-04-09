import React from 'react';
import PropTypes from 'prop-types';
import GenomeFeatureWrapper from '../genePage/genomeFeatureWrapper.jsx';
import getVariantGenomeLocation from './getVariantGenomeLocation';

function getTargetGene(variantData, cvgla) {
  return cvgla?.overlapGenes?.[0] || variantData?.gene || null;
}

function getTargetGeneLocation(targetGene) {
  const geneLocationAssociation = targetGene?.geneGenomicLocationAssociations?.[0];
  if (geneLocationAssociation) {
    return {
      chromosome: geneLocationAssociation.geneGenomicLocationAssociationObject?.name,
      start: geneLocationAssociation.start,
      end: geneLocationAssociation.end,
      strand: geneLocationAssociation.strand,
      assembly: targetGene?.taxon?.species?.assembly_curie,
    };
  }

  return targetGene?.genomeLocations?.[0] || null;
}

const VariantSequenceView = ({ variant: variantData }) => {
  // Build location from new API data structure
  const variant = variantData?.variantList && variantData.variantList[0];
  const cvgla = variant?.curatedVariantGenomicLocations && variant.curatedVariantGenomicLocations[0];
  const variantLocationObj = cvgla?.variantGenomicLocationAssociationObject;
  const targetGene = getTargetGene(variantData, cvgla);
  const targetGeneLocation = getTargetGeneLocation(targetGene);
  const genomeLocation = targetGeneLocation || getVariantGenomeLocation(variantData);

  const location = {
    chromosome: variantLocationObj?.name,
    start: cvgla?.start,
    end: cvgla?.end,
  };

  if (!genomeLocation?.chromosome || location.start == null || location.end == null) {
    return null;
  }

  const htpVariant = `${location.chromosome}:${location.start}`;
  const fmin = Math.min(genomeLocation.start, location.start);
  const fmax = Math.max(genomeLocation.end, location.end);
  const species = variant?.taxon?.curie || targetGene?.taxon?.curie;
  const targetGeneId = targetGene?.curie || targetGene?.primaryExternalId || targetGene?.modEntityId;
  const targetGeneSymbol = targetGene?.geneSymbol?.displayText || targetGene?.symbol;

  return (
    <GenomeFeatureWrapper
      assembly={genomeLocation.assembly}
      biotype="gene"
      chromosome={genomeLocation.chromosome}
      displayType="ISOFORM"
      fmax={fmax}
      fmin={fmin}
      geneSymbol={targetGeneSymbol}
      genomeLocationList={[genomeLocation]}
      height="200px"
      id="genome-feature-location-id"
      htpVariant={htpVariant}
      primaryId={targetGeneId || variantData.id || variant?.id}
      species={species}
      strand={genomeLocation.strand}
      synonyms={variantData.synonyms}
      visibleVariants={[variantData.id || variant?.id]}
      width="600px"
    />
  );
};

VariantSequenceView.propTypes = {
  variant: PropTypes.object,
};

export default VariantSequenceView;
