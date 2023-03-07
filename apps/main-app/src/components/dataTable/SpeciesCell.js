import React from 'react';
import PropTypes from 'prop-types';
import SpeciesName from '../SpeciesName';

// TODO: remove when the data is fixed on the backend
// see https://agr-jira.atlassian.net/browse/SCRUM-2649
function simplifySpeciesNameSC(speciesName) {
  const SC = 'Saccharomyces cerevisiae'
  if( speciesName.startsWith(SC))
    return SC;
  else
    return speciesName;
}

const SpeciesCell = ({species}) => <SpeciesName>{simplifySpeciesNameSC(species.name)}</SpeciesName>;

SpeciesCell.propTypes = {
  species: PropTypes.object,
};

export default SpeciesCell;
