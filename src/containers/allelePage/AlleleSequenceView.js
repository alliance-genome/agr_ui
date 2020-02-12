import React from 'react';
import PropTypes from 'prop-types';
import { selectVariants } from '../../selectors/alleleSelectors';
import { connect } from 'react-redux';
import GenomeFeatureWrapper from '../genePage/genomeFeatureWrapper';

const AlleleSequenceView = ({allele}) => {


  const genomeLocations = allele.gene.genomeLocations;
  const genomeLocation = genomeLocations && genomeLocations.length > 0 ? genomeLocations[0] : null ;
  if(genomeLocation) {
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
  }
  else{
    return <div />;
  }
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
