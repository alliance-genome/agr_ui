import React from 'react';
import PropTypes from 'prop-types';
import GenomeFeatureWrapper from '../genePage/genomeFeatureWrapper';
import useAllAlleleVariants from '../../hooks/useAlleleVariants';


function findFminFmax(genomeLocation, variants) {
  let fmax = genomeLocation.end;
  let fmin = genomeLocation.start;
  if (variants && variants.data.results) {
    for (let variant of variants.data.results) {
      if (variant.location.start < fmin) {
        fmin = variant.location.start;
      }
      if (variant.location.end > fmax) {
        fmax = variant.location.end;
      }
    }
  }
  return { fmin, fmax };
}

const AlleleSequenceView = ({ allele }) => {
  const variants = useAllAlleleVariants(allele.id);

  if (!allele.gene) {
    return null;
  }

  const genomeLocations = allele.gene.genomeLocations;
  const genomeLocation = genomeLocations && genomeLocations.length > 0 ? genomeLocations[0] : null;
  if (!genomeLocation || variants.isLoading || variants.isError || variants.data.results.length === 0) {
    return null;
  }

  const { fmin, fmax } = findFminFmax(genomeLocation, variants);
  return (
    <GenomeFeatureWrapper
      assembly={genomeLocation.assembly}
      biotype='gene'
      chromosome={genomeLocation.chromosome}
      displayType='ISOFORM_AND_VARIANT'
      fmax={fmax}
      fmin={fmin}
      geneSymbol={allele.symbol}
      height='200px'
      id='genome-feature-location-id'
      primaryId={allele.id}
      species={allele.species.taxonId}
      strand={genomeLocation.strand}
      synonyms={allele.synonyms}
      visibleVariants={[allele.id]}
      width='600px'
    />
  );
};

AlleleSequenceView.propTypes = {
  allele: PropTypes.object,
};

export default AlleleSequenceView;
