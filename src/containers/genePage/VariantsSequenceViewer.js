import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GenomeFeatureWrapper from './genomeFeatureWrapper';
import {selectAlleles} from '../../selectors/geneSelectors';
import NoData from '../../components/noData';

export function findFminFmax(genomeLocation,variants){
  let fmax = genomeLocation.end;
  let fmin = genomeLocation.start;
  if(variants && variants.data){
    for(let variant of variants.data){
      if(variant.variants){
        for(let innerVariant of variant.variants){
          if(innerVariant.location){
            if(innerVariant.location.start < fmin ){
              fmin = innerVariant.location.start ;
            }
            if(innerVariant.location.end  > fmax ){
              fmax = innerVariant.location.end ;
            }
          }
        }
      }
    }
  }
  return {fmin,fmax};
}

const VariantsSequenceViewer = ({alleles,allelesSelected,allelesVisible, tableState, gene, genomeLocation}) => {
  if (alleles.loading || alleles.error || alleles.data.length === 0 || !genomeLocation.chromosome) {
    return null;
  }

  // TODO: remove this line when tableState is being used
  console.log(tableState);  // eslint-disable-line


  const anyVariantData = alleles.data.some(allele => allele.variants.length > 0);
  if (!anyVariantData) {
    return <NoData>No mapped variant information available</NoData>;
  }

  const {fmin,fmax} = findFminFmax(genomeLocation,alleles);
  return (
    <GenomeFeatureWrapper
      allelesSelected={allelesSelected}
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
      species={gene.species.taxonId}
      strand={genomeLocation.strand}
      synonyms={gene.synonyms}
      visibleVariants={allelesVisible.map( a => a.id)}
      width='600px'
    />
  );
};

VariantsSequenceViewer.propTypes = {
  alleles: PropTypes.object,
  allelesSelected: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  allelesVisible: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  gene: PropTypes.object,
  genomeLocation: PropTypes.shape({
    assembly: PropTypes.string,
    start: PropTypes.number,
    end: PropTypes.number,
    chromosome: PropTypes.string,
    strand: PropTypes.string,
  }),
  onAllelesSelect: PropTypes.func.isRequired,
  tableState: PropTypes.object.isRequired,  // TODO: have type checking based on what this component actually uses
};

const mapStateToProps = state => ({
  alleles: selectAlleles(state),
});

export default connect(mapStateToProps)(VariantsSequenceViewer);
