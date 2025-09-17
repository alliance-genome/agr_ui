import React from 'react';
import PropTypes from 'prop-types';
import SpeciesName from '../../components/SpeciesName.jsx';

const speciesRegex = new RegExp(
  /(C\.\s+elegans|Caenorhabditis\s+elegans|D\.\s+rerio|Danio\s+rerio|D\.\s+melanogaster|Drosophila\s+melanogaster|Mus\smusculus|M\.\s+musculus|Rattus\snorvegicus|R\.\s+norvegicus|Saccharomyces\scerevisiae|S\.\s+cerevisiae|Xenopus\slaevis|X\.\s+laevis|Xenopus\stropicalis|X\.\s+tropicalis)/g
);
const ApplySpeciesNameFormat = ({ text }) => {
  const splitText = text.split(speciesRegex);
  // console.log(splitText);
  return (
    <span>
      {splitText.map((token, index) => {
        if (token.match(speciesRegex)) return <SpeciesName key={index} dangerouslySetInnerHTML={{ __html: token }} />;
        else return <span key={index} dangerouslySetInnerHTML={{ __html: token }} />;
        // else return token;
      })}
    </span>
  );
};

ApplySpeciesNameFormat.propTypes = {
  text: PropTypes.text,
};

export default ApplySpeciesNameFormat;
