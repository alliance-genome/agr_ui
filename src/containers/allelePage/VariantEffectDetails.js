import React from 'react';
import PropTypes from 'prop-types';
import {
  AttributeLabel,
  AttributeList,
  AttributeValue
} from '../../components/attribute';
import { CollapsibleList } from '../../components/collapsibleList';
import { VariantJBrowseLink } from '../../components/variant';
import Translation from './Translation';
import Position from './Position';
import styles from './style.scss';

const VariantEffectDetails = ({
  consequence = {},
  transcript = {},
  variant = {},
}) => {
  const {
    // cDNA
    cdnaStartPosition,
    cdnaEndPosition,

    // protein
    aminoAcidReference = '',
    aminoAcidVariation = '',
    proteinStartPosition,
    proteinEndPosition,

    // codon
    codonReference = '',
    codonVariation = '',
    cdsStartPosition,
    cdsEndPosition,

    // consequence
    transcriptLevelConsequence = '',

    //hgvs
    hgvsCodingNomenclature,
    hgvsProteinNomenclature,
    hgvsVEPGeneNomenclature,

  } = consequence;

  const labelStyle = {textTransform: 'initial'};

  return (<div className={`${styles.row} ${styles.detailRow}`}>
    <h5>Predicted effect of{' '}
      <VariantJBrowseLink
        geneLocation={variant.geneLocation}
        location={location}
        species={variant.species && variant.species.name}
        type={variant.type && variant.type.name}
      >
        <span className="text-break">{variant.id}</span>
      </VariantJBrowseLink> on <strong>{transcript.name}</strong></h5>
    <AttributeList>
      <AttributeLabel>Variant type</AttributeLabel>
      <AttributeValue>{variant.type && variant.type.name}</AttributeValue>

      <AttributeLabel style={labelStyle}>HGVS Name (HGVS.p)</AttributeLabel>
      <AttributeValue>{hgvsProteinNomenclature}</AttributeValue>
      <AttributeLabel style={labelStyle}>HGVS Name (HGVS.c)</AttributeLabel>
      <AttributeValue>{hgvsCodingNomenclature}</AttributeValue>
      <AttributeLabel style={labelStyle}>HGVS Name (HGVS.g)</AttributeLabel>
      <AttributeValue>{hgvsVEPGeneNomenclature}</AttributeValue>

      <AttributeLabel >Affected sequence feature name</AttributeLabel>
      <AttributeValue>{transcript.name}</AttributeValue>

      <AttributeLabel>Affected sequence feature type</AttributeLabel>
      <AttributeValue>{transcript.type && transcript.type.name}</AttributeValue>

      <AttributeLabel>Affected sequence feature accession</AttributeLabel>
      <AttributeValue>{transcript.id}</AttributeValue>

      <AttributeLabel style={labelStyle}>Position of Variant in Protein</AttributeLabel>
      <AttributeValue>
        <Position end={proteinEndPosition} start={proteinStartPosition} />
      </AttributeValue>
      <AttributeLabel style={labelStyle}>Position of Variant in Coding Sequence</AttributeLabel>
      <AttributeValue>
        <Position end={cdsEndPosition} start={cdsStartPosition} />
      </AttributeValue>
      <AttributeLabel style={labelStyle}>Position of Variant in Transcript</AttributeLabel>
      <AttributeValue>
        <Position end={cdnaEndPosition} start={cdnaStartPosition} />
      </AttributeValue>

      <AttributeLabel>Molecular Consequence</AttributeLabel>
      <AttributeValue>
        <CollapsibleList collapsedSize={5}>
          {transcriptLevelConsequence.split(',')}
        </CollapsibleList>
      </AttributeValue>
      <AttributeLabel style={labelStyle}>CDS and Protein Change</AttributeLabel>
      <AttributeValue>
        {
          codonVariation ? (
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
              <div className='col-1' style={{textAlign: 'center', alignSelf: 'center'}}>
                {codonVariation ? '=>' : null}
              </div>
              <div className='col-2'>
                <Translation aminoAcids={aminoAcidVariation.split('')} codons={codonVariation.split('')} />
              </div>
            </div>
          ) : null
        }
      </AttributeValue>
    </AttributeList>
  </div>);
};

VariantEffectDetails.propTypes = {
  consequence: PropTypes.shape({
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
  }),
  transcript: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.shape({
      name: PropTypes.string,
    })
  }),
  variant: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

export default VariantEffectDetails;
