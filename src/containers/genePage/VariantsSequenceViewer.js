import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GenomeFeatureWrapper from './genomeFeatureWrapper';
import {selectAlleles} from '../../selectors/geneSelectors';

const VariantsSequenceViewer = ({alleles, gene, genomeLocation}) => {
  if (alleles.loading || alleles.error) {
    return null;
  }

  const anyVariantData = alleles.data.some(allele => allele.variants.length > 0);
  if (!anyVariantData || !genomeLocation.chromosome) {
    return null;
  }

  return (
    <GenomeFeatureWrapper
      assembly={genomeLocation.assembly}
      biotype={gene.soTermName}
      chromosome={genomeLocation.chromosome}
      displayType='ISOFORM_AND_VARIANT'
      fmax={genomeLocation.end}
      fmin={genomeLocation.start}
      geneSymbol={gene.symbol}
      height='200px'
      id='genome-feature-allele-location-id'
      primaryId={gene.id}
      species={gene.species.name}
      strand={genomeLocation.strand}
      synonyms={gene.synonyms}
      width='600px'
    />
  );
};

VariantsSequenceViewer.propTypes = {
  alleles: PropTypes.object,
  gene: PropTypes.object,
  genomeLocation: PropTypes.shape({
    assembly: PropTypes.string,
    start: PropTypes.number,
    end: PropTypes.number,
    chromosome: PropTypes.string,
    strand: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  alleles: selectAlleles(state),
});

export default connect(mapStateToProps)(VariantsSequenceViewer);
