import React from 'react';
import PropTypes from 'prop-types';
import translationStyles from './Translation.scss';

const Translation = ({
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
      <div>
        {
          isReference && codons.length ?
            <a style={{fontFamily: 'monospace'}}>
              {cdsStartPosition}
              {
                cdsEndPosition !== cdsStartPosition ?
                  ` - ${cdsEndPosition}` :
                  null
              }
              &nbsp;&nbsp;
            </a> :
            null
        }
        {codons.map((codon, index) => (
          <span className={translationStyles.codon} key={index}>{codon}</span>
        ))}
      </div>
      <div>
        {
          isReference && aminoAcids.length ?
            <a style={{fontFamily: 'monospace'}}>
              {proteinStartPosition}
              {
                proteinEndPosition !== proteinStartPosition ?
                  ` - ${proteinEndPosition}` :
                  null
              }
              &nbsp;&nbsp;
            </a> :
            null
        }
        {aminoAcids.map((aa, index) => (
          <span className={translationStyles.aminoAcid} key={index}>{aa}</span>
        ))}
        {isFrameshift ? <span className="badge badge-secondary">frameshift</span> : null}
      </div>
    </>
  );
};

Translation.propTypes = {
  aminoAcids: PropTypes.arrayOf(PropTypes.string),
  cdsEndPosition: PropTypes.number,
  cdsStartPosition: PropTypes.number,
  codons: PropTypes.arrayOf(PropTypes.string),
  isReference: PropTypes.bool,
  proteinEndPosition: PropTypes.number,
  proteinStartPosition: PropTypes.number,
};

export default Translation;
