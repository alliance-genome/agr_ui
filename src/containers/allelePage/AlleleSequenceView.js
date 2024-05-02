import React from 'react';
import PropTypes from 'prop-types';
import GenomeFeatureWrapper from '../genePage/genomeFeatureWrapper';
import useAllAlleleVariants from '../../hooks/useAlleleVariants';
import useDataTableQuery from '../../hooks/useDataTableQuery';



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

function findAlleleStart(variants) {
  if (variants && variants.data.results) {
//just get the start of the first variant
    return variants[0].data.results.location.start;
  }
}

const AlleleSequenceView = ({ allele }) => {
  const variants = useAllAlleleVariants(allele.id);
  const visibleTranscripts = useDataTableQuery(`/api/allele/${allele.id}/variants`);

  if (!allele.gene) {
    return null;
  }

  const genomeLocations = allele.gene.genomeLocations;
  const genomeLocation = genomeLocations && genomeLocations.length > 0 ? genomeLocations[0] : null;
  if (!genomeLocation || variants.isLoading || variants.isError || variants.data.length === 0 ||visibleTranscripts.data.length === 0) {
    return null;
  }

  let isoformFilter = [];
  if(visibleTranscripts.data[0].transcriptList){
    isoformFilter = visibleTranscripts.data[0].transcriptList.map(a => a.id.split(':').pop());
  }

  const { fmin, fmax } = findFminFmax(genomeLocation, variants);
	//highjacking the htpVaraint to send the start of the variant itself
  const htpVariant = findAlleleStart(variants);
  return (
    <GenomeFeatureWrapper
      assembly={genomeLocation.assembly}
      biotype='gene'
      chromosome={genomeLocation.chromosome}
      displayType='ISOFORM_AND_VARIANT'
      fmax={fmax}
      fmin={fmin}
      htpVariant={htpVariant}
      geneSymbol={allele.symbol}
      genomeLocationList={genomeLocations}
      height='200px'
      id='genome-feature-location-id'
      isoformFilter={isoformFilter}
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
