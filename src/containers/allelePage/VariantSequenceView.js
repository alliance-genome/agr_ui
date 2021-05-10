import React from 'react';
import PropTypes from 'prop-types';
import GenomeFeatureWrapper from '../genePage/genomeFeatureWrapper';

const VariantSequenceView = ({ variant }) => {

  const genomeLocations = variant.gene && variant.gene.genomeLocations;
  const genomeLocation = genomeLocations && genomeLocations.length > 0 ? 
    genomeLocations[0] :
    {
      // in case not overlapping a gene
      ...variant.location,
      start: Math.max(1, variant.location.start - 1000),
      end: variant.location.end + 1000,
    };

  let isoformFilter = [];
  if(variant.transcriptList){
    isoformFilter = variant.transcriptList.map(a => a.id.split(':').pop());
  }

  const fmin = Math.min(genomeLocation.start, variant.location.start);
  const fmax = Math.max(genomeLocation.end, variant.location.end);
  return (
    <GenomeFeatureWrapper
      assembly={genomeLocation.assembly}
      biotype='gene'
      chromosome={genomeLocation.chromosome}
      displayType='ISOFORM_AND_VARIANT'
      fmax={fmax}
      fmin={fmin}
      geneSymbol={variant.symbol}
      genomeLocationList={genomeLocations}
      height='200px'
      id='genome-feature-location-id'
      isoformFilter={isoformFilter}
      primaryId={variant.id}
      species={variant.species.taxonId}
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
