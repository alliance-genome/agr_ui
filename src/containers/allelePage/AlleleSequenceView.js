import React from 'react';
import PropTypes from 'prop-types';
import { selectVariants } from '../../selectors/alleleSelectors';
import { connect } from 'react-redux';
import GenomeFeatureWrapper from '../genePage/genomeFeatureWrapper';
// import GenomeFeatureWrapper from '../genePage/genomeFeatureWrapper';

const AlleleSequenceView = ({allele}) => {
  console.log('allele',allele);

  // myl7
  // http://localhost:2992/gene/ZFIN:ZDB-GENE-991019-3#alleles-and-variants
  // az2
  // http://localhost:2992/allele/ZFIN:ZDB-ALT-181010-2
  const genomeLocations = allele.gene.genomeLocations;
  const genomeLocation = genomeLocations && genomeLocations.length > 0 ? genomeLocations[0] : null ;

  return (
    <div>
      <GenomeFeatureWrapper
        assembly={genomeLocation.assembly}
        biotype='gene'
        chromosome={genomeLocation.chromosome}
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
    </div>
  );
};

AlleleSequenceView.propTypes = {
  allele: PropTypes.object,
  variants: PropTypes.shape({
    data: PropTypes.any,
  }),
};

const mapStateToProps = state => ({
  variants: selectVariants(state),
});

export default connect(mapStateToProps)(AlleleSequenceView);
