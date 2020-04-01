import React from 'react';
import PropTypes from 'prop-types';
import {selectVariants} from '../../selectors/alleleSelectors';
import {connect} from 'react-redux';
import GenomeFeatureWrapper from '../genePage/genomeFeatureWrapper';

const AlleleSequenceView = ({allele, variants}) => {

  if (!allele.gene) {
    return null;
  }

  const genomeLocations = allele.gene.genomeLocations;
  const genomeLocation = genomeLocations && genomeLocations.length > 0 ? genomeLocations[0] : null;
  if (!genomeLocation || variants.loading || variants.error || variants.data.length === 0) {
    return null;
  }
  return (
    <GenomeFeatureWrapper
      assembly={genomeLocation.assembly}
      biotype='gene'
      chromosome={genomeLocation.chromosome}
      displayType='ISOFORM_AND_VARIANT'
      fmax={genomeLocation.end}
      fmin={genomeLocation.start}
      geneSymbol={allele.symbol}
      height='200px'
      id='genome-feature-location-id'
      primaryId={allele.id}
      species={allele.species.name}
      strand={genomeLocation.strand}
      synonyms={allele.synonyms}
      variant={allele.symbol}
      width='600px'
    />
  );
};

AlleleSequenceView.propTypes = {
  allele: PropTypes.object,
  variants: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.any,
    data: PropTypes.array,
  }),
};

const mapStateToProps = state => ({
  variants: selectVariants(state),
});

export default connect(mapStateToProps)(AlleleSequenceView);
