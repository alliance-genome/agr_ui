import React from 'react';
import PropTypes from 'prop-types';
import Position from './Position';
import translationStyles from './translation.scss';

const TranslationRow = ({
  aminoAcids: aminoAcidsRaw = [],
  proteinStartPosition,
  proteinEndPosition,

  codons = [],
  cdsStartPosition,
  cdsEndPosition,

  isReference = false
}) => {
  const [lastAminoAcid] = aminoAcidsRaw.slice(-1);
  const isFrameshift = lastAminoAcid === 'X';
  const aminoAcids = isFrameshift ? aminoAcidsRaw.slice(0, -1) : aminoAcidsRaw;
  return (
    <>
      <tr className={translationStyles.codonRow}>
        {
          isReference && codons.length ?
            <td className={translationStyles.position}>
              <a style={{fontFamily: 'monospace'}}>
                <Position end={cdsEndPosition} start={cdsStartPosition} />
                &nbsp;&nbsp;
              </a>
            </td> :
            null
        }
        <td>
          {codons.map((codon, index) => (
            <span className={translationStyles.codon} key={index}>{codon}</span>
          ))}
        </td>
      </tr>
      <tr className={translationStyles.aminoAcidRow}>
        {
          isReference && aminoAcids.length ?
            <td className={translationStyles.position}>
              <a style={{fontFamily: 'monospace'}}>
                <Position end={proteinEndPosition} start={proteinStartPosition} />
                &nbsp;&nbsp;
              </a>
            </td> :
            null
        }
        <td>
          {aminoAcids.map((aa, index) => (
            <span className={translationStyles.aminoAcid} key={index}>{aa}</span>
          ))}
          {isFrameshift ? <span className="badge badge-secondary">frameshift</span> : null}
        </td>
      </tr>
    </>
  );
};

TranslationRow.propTypes = {
  aminoAcids: PropTypes.arrayOf(PropTypes.string),
  cdsEndPosition: PropTypes.any,
  cdsStartPosition: PropTypes.any,
  codons: PropTypes.arrayOf(PropTypes.string),
  isReference: PropTypes.bool,
  proteinEndPosition: PropTypes.any,
  proteinStartPosition: PropTypes.any,
};

const Translation = ({
  aminoAcids = [],
  proteinStartPosition,
  proteinEndPosition,

  codons = [],
  cdsStartPosition: cdsStartPositionRaw,
  cdsEndPosition: cdsEndPositionRaw,

  maxAminoAcidsPerRow = 5,

  ...translationRowProps
}) => {
  let countCdsStartPositionPadded = 0;
  while (codons[countCdsStartPositionPadded] && codons[countCdsStartPositionPadded] === codons[countCdsStartPositionPadded].toLowerCase()) {
    countCdsStartPositionPadded++;
  }

  let countCdsEndPositionPadded = 0;
  while (codons[aminoAcids.length - 1 - countCdsEndPositionPadded] && codons[aminoAcids.length - 1 - countCdsEndPositionPadded] === codons[aminoAcids.length - 1 - countCdsEndPositionPadded].toLowerCase()) {
    countCdsEndPositionPadded++;
  }

  const cdsEndPosition = parseInt(cdsEndPositionRaw) + countCdsEndPositionPadded;
  const cdsStartPosition = parseInt(cdsStartPositionRaw) - countCdsStartPositionPadded;

  const rows = [];
  for (let aminoAcidOffset = 0; aminoAcidOffset < codons.length; aminoAcidOffset = aminoAcidOffset + maxAminoAcidsPerRow) {
    const row = (
      <TranslationRow
        {...translationRowProps}
        aminoAcids={aminoAcids.slice(aminoAcidOffset, aminoAcidOffset + maxAminoAcidsPerRow)}
        cdsEndPosition={Math.min(parseInt(cdsStartPosition) + (aminoAcidOffset + maxAminoAcidsPerRow) * 3 - 1, parseInt(cdsEndPosition))}
        cdsStartPosition={parseInt(cdsStartPosition) + aminoAcidOffset * 3}
        codons={codons.slice(aminoAcidOffset * 3, (aminoAcidOffset + maxAminoAcidsPerRow) * 3)}
        proteinEndPosition={Math.min(parseInt(proteinStartPosition) + aminoAcidOffset + maxAminoAcidsPerRow - 1, parseInt(proteinEndPosition))}
        proteinStartPosition={parseInt(proteinStartPosition) + aminoAcidOffset}
      />
    );
    rows.push(row);
  }
  return (
    <table className={translationStyles.table}>
      {rows}
    </table>
  );
};

Translation.propTypes = {
  aminoAcids: PropTypes.arrayOf(PropTypes.string),
  cdsEndPosition: PropTypes.any,
  cdsStartPosition: PropTypes.any,
  codons: PropTypes.arrayOf(PropTypes.string),
  isReference: PropTypes.bool,
  maxAminoAcidsPerRow: PropTypes.number,
  proteinEndPosition: PropTypes.any,
  proteinStartPosition: PropTypes.any,
};

export default Translation;
