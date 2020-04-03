import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GenomeFeatureWrapper from './genomeFeatureWrapper';
import {selectAlleles} from '../../selectors/geneSelectors';
import NoData from '../../components/noData';

export function findFminFmax(genomeLocation,variants){

  console.log('input variants',variants);

  let fmax = genomeLocation.end;
  let fmin = genomeLocation.start;

  try{
    if(variants && variants.data){
      for(let variant of variants.data){
        if(variant.location.start < fmin ){
          fmin = variant.location.start ;
        }
        if(variant.location.end  > fmax ){
          fmax = variant.location.end ;
        }
      }
    }
  }
  catch(e){
    console.error(e);
  }
  return {fmin,fmax};
}

const VariantsSequenceViewer = ({alleles, gene, genomeLocation}) => {
  if (alleles.loading || alleles.error || alleles.data.length === 0 || !genomeLocation.chromosome) {
    return null;
  }


  const anyVariantData = alleles.data.some(allele => allele.variants.length > 0);
  if (!anyVariantData) {
    return <NoData>No mapped variant information available</NoData>;
  }

  console.log('alleles')
  const {fmin,fmax} = findFminFmax(genomeLocation,alleles);

  return (
    <GenomeFeatureWrapper
      assembly={genomeLocation.assembly}
      biotype={gene.soTermName}
      chromosome={genomeLocation.chromosome}
      displayType='ISOFORM_AND_VARIANT'
      fmax={fmax}
      fmin={fmin}
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
