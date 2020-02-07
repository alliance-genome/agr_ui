import React from 'react';
import PropTypes from 'prop-types';
import GenomeFeatureWrapper from '../genePage/genomeFeatureWrapper';
// import GenomeFeatureWrapper from '../genePage/genomeFeatureWrapper';

const AlleleSequenceView = ({allele}) => {
  console.log('allele',allele);

  // myl7
  // http://localhost:2992/gene/ZFIN:ZDB-GENE-991019-3#alleles-and-variants
  // az2
  // http://localhost:2992/allele/ZFIN:ZDB-ALT-181010-2


  let genomeLocation = {
    assembly: 'GRCz11',
    chromosome:'8',
    start:40457107,
    end:40464935,
    strand:'+',
  };
  return (
    <div>
      Allele viewer here
      {/*{allele}*/}
      <ul>
        <li>assembly: N/A fake {genomeLocation.assembly}</li>
        <li>fmin : N/A fake {genomeLocation.start}</li>
        <li>fmax: N/A  fake {genomeLocation.end}</li>
        <li>strand: N/A fake {genomeLocation.end}</li>
        <li>chromosome : N/A fake {genomeLocation.chromosome}</li>
        <li>biotype: {allele.type}, though maybe mapped as a gene</li>
        <li>symbol: {allele.symbol}</li>
        <li>id: {allele.id}</li>
        <li>species: {allele.species.name}</li>
        <li>synonyms: {allele.synonyms}</li>
      </ul>
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
};

export default AlleleSequenceView;
