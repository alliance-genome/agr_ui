import React from 'react';
import PropTypes from 'prop-types';
import GenomeFeatureWrapper from '../genePage/genomeFeatureWrapper.jsx';
import getVariantGenomeLocation from './getVariantGenomeLocation';

const VariantSequenceView = ({ variant }) => {

  const genomeLocation = getVariantGenomeLocation(variant);

  let htpVariant = `${variant.location.chromosome}:${variant.location.start}`;
  const fmin = Math.min(genomeLocation.start, variant.location.start);
  const fmax = Math.max(genomeLocation.end, variant.location.end);
  return (
    <GenomeFeatureWrapper
      assembly={genomeLocation.assembly}
      biotype='gene'
      chromosome={genomeLocation.chromosome}
      displayType='ISOFORM'
      fmax={fmax}
      fmin={fmin}
      geneSymbol={variant.gene.symbol}
      genomeLocationList={[genomeLocation]}
      height='200px'
      id='genome-feature-location-id'
      htpVariant={htpVariant}
      primaryId={variant.id}
      species={variant.species && variant.species.taxonId}
      strand={genomeLocation.strand}
      synonyms={variant.synonyms}
      visibleVariants={[variant.id]}
      width='600px'
    />
  );
};

VariantSequenceView.propTypes = {
  variant: PropTypes.object,
};

export default VariantSequenceView;
