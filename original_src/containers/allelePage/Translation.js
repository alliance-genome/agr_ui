import React from 'react';
import PropTypes from 'prop-types';
// import Position from './Position';
import translationStyles from './translation.module.scss';

const TranslationRow = ({
  aminoAcids: aminoAcidsRaw = [],
  proteinStartPosition,
  proteinEndPosition,

  codons = [],
  cdsStartPosition,
  cdsEndPosition,

  isReference = false,

  isPositionStartShown = true,
  isPositionEndShown = true,
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
              {isPositionStartShown ? cdsStartPosition ? cdsStartPosition : 'N/A' : null}
            </td> :
            null
        }
        <td>
          {codons.map((codon, index) => (
            <span className={translationStyles.codon} key={index}>{codon}</span>
          ))}
        </td>
        {
          isReference && codons.length ?
            <td className={translationStyles.position}>
              {isPositionEndShown ? cdsEndPosition ? cdsEndPosition : 'N/A' : null}
            </td> :
            null
        }
      </tr>
      <tr className={translationStyles.aminoAcidRow}>
        {
          isReference && aminoAcids.length ?
            <td className={translationStyles.position}>
              {
                isPositionStartShown ?
                  proteinStartPosition ? `[${proteinStartPosition}]` : 'N/A' :
                  null
              }
            </td> :
            null
        }
        <td>
          {aminoAcids.map((aa, index) => (
            <span className={translationStyles.aminoAcid} key={index}>{aa}</span>
          ))}
          {isFrameshift ? <span className="badge badge-secondary">frameshift</span> : null}
        </td>
        {
          isReference && aminoAcids.length && isPositionEndShown ?
            <td className={translationStyles.position}>
              {
                isPositionEndShown ? proteinEndPosition ? `[${proteinEndPosition}]` : 'N/A' : null
              }
            </td> :
            null
        }
      </tr>
    </>
  );
};

TranslationRow.propTypes = {
  aminoAcids: PropTypes.arrayOf(PropTypes.string),
  cdsEndPosition: PropTypes.any,
  cdsStartPosition: PropTypes.any,
  codons: PropTypes.arrayOf(PropTypes.string),
  isPositionEndShown: PropTypes.bool,
  isPositionStartShown: PropTypes.bool,
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

  maxAminoAcidsPerRow = 10,

  title,

  ...translationRowProps
}) => {
  let countCdsStartPositionPadded = 0;
  while (codons[countCdsStartPositionPadded] && codons[countCdsStartPositionPadded] === codons[countCdsStartPositionPadded].toLowerCase()) {
    countCdsStartPositionPadded++;
  }

  let countCdsEndPositionPadded = 0;
  while (codons[codons.length - 1 - countCdsEndPositionPadded] && codons[codons.length - 1 - countCdsEndPositionPadded] === codons[codons.length - 1 - countCdsEndPositionPadded].toLowerCase()) {
    countCdsEndPositionPadded++;
  }

  const cdsEndPosition = parseInt(cdsEndPositionRaw) + countCdsEndPositionPadded;
  const cdsStartPosition = parseInt(cdsStartPositionRaw) - countCdsStartPositionPadded;

  const rows = [];
  for (let aminoAcidOffset = 0; aminoAcidOffset < aminoAcids.length; aminoAcidOffset = aminoAcidOffset + maxAminoAcidsPerRow) {
    const row = {
      aminoAcids: aminoAcids.slice(aminoAcidOffset, aminoAcidOffset + maxAminoAcidsPerRow),
      cdsEndPosition: Math.min(parseInt(cdsStartPosition) + (aminoAcidOffset + maxAminoAcidsPerRow) * 3 - 1, parseInt(cdsEndPosition)),
      cdsStartPosition: parseInt(cdsStartPosition) + aminoAcidOffset * 3,
      codons: codons.slice(aminoAcidOffset * 3, (aminoAcidOffset + maxAminoAcidsPerRow) * 3),
      proteinEndPosition: Math.min(parseInt(proteinStartPosition) + aminoAcidOffset + maxAminoAcidsPerRow - 1, parseInt(proteinEndPosition)),
      proteinStartPosition: parseInt(proteinStartPosition) + aminoAcidOffset,
    };
    rows.push(row);
  }
  return (
    <table className={translationStyles.table}>
      {
        title ?
          <tr>
            {translationRowProps.isReference ? <th className={translationStyles.position} /> : null }
            <th>{title}</th>
          </tr> :
          null
      }
      {
        rows.map((row, rowIndex) => {
          const rowIndexLast = rows.length - 1;
          return (
            <TranslationRow
              {...translationRowProps}
              {...row}
              isPositionEndShown={rowIndex === rowIndexLast}
              isPositionStartShown={rowIndex === 0}
              key={`${rowIndex}-${rowIndexLast}`}
            />
          );
        })
      }
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
  title: PropTypes.string,
};

export default Translation;
