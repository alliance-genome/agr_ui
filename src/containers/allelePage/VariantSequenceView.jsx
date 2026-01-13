import React from 'react';
import PropTypes from 'prop-types';
import GenomeFeatureWrapper from '../genePage/genomeFeatureWrapper.jsx';
import getVariantGenomeLocation from './getVariantGenomeLocation';

const VariantSequenceView = ({ variant: variantData }) => {
  const genomeLocation = getVariantGenomeLocation(variantData);

  // Build location from new API data structure
  const { variant } = variantData || {};
  const variantSubject = variant?.variantAssociationSubject;
  const variantLocationObj =
    variantSubject?.variantGenomicLocationAssociationObject || variant?.variantGenomicLocationAssociationObject;

  const location = {
    chromosome: variantLocationObj?.name,
    start: variant?.start,
    end: variant?.end,
  };

  let htpVariant = `${location.chromosome}:${location.start}`;
  const fmin = Math.min(genomeLocation.start, location.start);
  const fmax = Math.max(genomeLocation.end, location.end);
  // Extract species from new data structure
  const species = variantSubject?.taxon;

  return (
    <GenomeFeatureWrapper
      assembly={genomeLocation.assembly}
      biotype="gene"
      chromosome={genomeLocation.chromosome}
      displayType="ISOFORM"
      fmax={fmax}
      fmin={fmin}
      geneSymbol={variantData.gene?.symbol}
      genomeLocationList={[genomeLocation]}
      height="200px"
      id="genome-feature-location-id"
      htpVariant={htpVariant}
      primaryId={variantData.id || variant?.id}
      species={species?.curie}
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
