import React from 'react';
import PropTypes from 'prop-types';
import {
  AttributeLabel,
  AttributeList,
  AttributeValue
} from '../../components/attribute';
import Translation from './Translation';
import Position from './Position';
// import styles from './style.scss';

const VariantEffectDetails = ({data = []}) => {
  return (
    <div>
      {
        data.map(({
          id,
          consequences = [],
        }) => (
          consequences.map(({
            // cDNA
            cdnaStartPosition,
            cdnaEndPosition,

            // protein
            aminoAcidChange = '',
            proteinStartPosition,
            proteinEndPosition,

            // codon
            codonChange = '',
            cdsStartPosition,
            cdsEndPosition,

            // consequence
            transcriptLevelConsequence,

            //hgvs
            hgvsCodingNomenclature,
            hgvsProteinNomenclature,
            hgvsVEPGeneNomenclature,

            ...zzz
          }) => {
            const [codonReference = '', codonVariation = ''] = codonChange.split('/');
            const [aminoAcidReference = '', aminoAcidVariation = ''] = aminoAcidChange.split('/');
            const labelStyle = {textTransform: 'initial'};
            return (
              <div key={`${id}-${hgvsCodingNomenclature}`}>
                <AttributeList>
                  <AttributeLabel style={labelStyle}>cDNA coordinate</AttributeLabel>
                  <AttributeValue>
                    <Position end={cdnaEndPosition} start={cdnaStartPosition} />
                  </AttributeValue>
                  <AttributeLabel>protein coordinate</AttributeLabel>
                  <AttributeValue>
                    <Position end={proteinEndPosition} start={proteinStartPosition} />
                  </AttributeValue>
                  <AttributeLabel>CDS coordinate</AttributeLabel>
                  <AttributeValue>
                    <Position end={cdsEndPosition} start={cdsStartPosition} />
                  </AttributeValue>

                  <AttributeLabel style={labelStyle}>HGVS.p</AttributeLabel>
                  <AttributeValue>{hgvsProteinNomenclature}</AttributeValue>
                  <AttributeLabel style={labelStyle}>HGVS.c</AttributeLabel>
                  <AttributeValue>{hgvsCodingNomenclature}</AttributeValue>
                  <AttributeLabel style={labelStyle}>HGVS.g</AttributeLabel>
                  <AttributeValue>{hgvsVEPGeneNomenclature}</AttributeValue>

                  <AttributeLabel>Molecular consequence</AttributeLabel>
                  <AttributeValue>{transcriptLevelConsequence}</AttributeValue>
                  <AttributeLabel>Change</AttributeLabel>
                  <AttributeValue>
                    <div className="row container">
                      <div className='col-4' style={{textAlign: 'right'}}>
                        <Translation
                          aminoAcids={aminoAcidReference.split('')}
                          cdsEndPosition={cdsEndPosition}
                          cdsStartPosition={cdsStartPosition}
                          codons={codonReference.split('')}
                          isReference
                          proteinEndPosition={proteinEndPosition}
                          proteinStartPosition={proteinStartPosition}
                        />
                      </div>
                      <div className='col-1' style={{textAlign: 'center'}}>
                        {codonChange ? '=>' : null}
                      </div>
                      <div className='col-2'>
                        <Translation aminoAcids={aminoAcidVariation.split('')} codons={codonVariation.split('')} />
                      </div>
                    </div>
                  </AttributeValue>

                  <AttributeLabel>Z</AttributeLabel>
                  <AttributeValue>{id + ': ' + JSON.stringify(zzz, null, 2)}</AttributeValue>
                </AttributeList>
              </div>
            );
          })
        ))
      }
    </div>
  );
};

VariantEffectDetails.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      gene: PropTypes.shape({

      }),
      consequence: PropTypes.arrayOf(PropTypes.shape({

      })),
      // cDNA
      cdnaStartPosition: PropTypes.string,
      cdnaEndPosition: PropTypes.string,

      // protein
      aminoAcidChange: PropTypes.string,
      proteinStartPosition: PropTypes.string,
      proteinEndPosition: PropTypes.string,

      // codon
      codonChange: PropTypes.string,
      cdsStartPosition: PropTypes.string,
      cdsEndPosition: PropTypes.string,

      // consequence
      transcriptLevelConsequence: PropTypes.string,

      //hgvs
      hgvsCodingNomenclature: PropTypes.string,
      hgvsProteinNomenclature: PropTypes.string,
      hgvsVEPGeneNomenclature: PropTypes.string,
    })
  ),
};

export default VariantEffectDetails;
