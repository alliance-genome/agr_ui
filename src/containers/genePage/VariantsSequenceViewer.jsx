import React from 'react';
import PropTypes from 'prop-types';
import GenomeFeatureWrapper from './genomeFeatureWrapper.jsx';
import { getSingleGenomeLocation } from '../../lib/utils';

const VariantsSequenceViewer = ({ gene, fmin, fmax, allelesSelected, allelesVisible, onAllelesSelect }) => {
  const genomeLocationList = gene.genomeLocations;
  const genomeLocation = getSingleGenomeLocation(genomeLocationList);

  // Use ISOFORM display type for human and SGD since they don't have variants to display at the moment
  // This avoids showing error messages about missing variant data
  // TODO: Change back to ISOFORM_AND_VARIANT when variant data is available for these species
  const species = gene.species?.taxonId;
  const isHumanOrSGD = species === 'NCBITaxon:9606' || species === 'NCBITaxon:559292';
  const displayType = isHumanOrSGD ? 'ISOFORM' : 'ISOFORM_AND_VARIANT';

  // TODO: remove when onAllelesSelect is in use
  // onAllelesSelect is to be called with a list of allele IDs, when selecting alleles throw the viewer.
  // This allows the allele selection to be communicated to the parent component, ie AlleleTable
  // console.log(onAllelesSelect); // eslint-disable-line no-console

  if (!genomeLocation.chromosome) {
    return null;
  }

  if (!fmin || !fmax) {
    return null;
  }

  const visibleVariantIds = allelesVisible.map((a) => a.id);

  return (
    <GenomeFeatureWrapper
      allelesSelected={allelesSelected}
      assembly={genomeLocation.assembly}
      biotype={gene.soTermName}
      chromosome={genomeLocation.chromosome}
      displayType={displayType}
      fmax={fmax}
      fmin={fmin}
      geneSymbol={gene.symbol}
      genomeLocationList={genomeLocationList}
      height="200px"
      onAllelesSelect={onAllelesSelect}
      id="genome-feature-allele-location-id"
      primaryId={gene.id}
      species={gene.species.taxonId}
      strand={genomeLocation.strand}
      synonyms={gene.synonyms}
      visibleVariants={visibleVariantIds}
      width="600px"
    />
  );
};

VariantsSequenceViewer.propTypes = {
  gene: PropTypes.object,
  fmin: PropTypes.number,
  fmax: PropTypes.number,
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
  onAllelesSelect: PropTypes.func.isRequired,
};

export default VariantsSequenceViewer;
