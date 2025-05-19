import React from 'react';
import PropTypes from 'prop-types';
import SpeciesName from '../SpeciesName.jsx';
import { simplifySpeciesNameSC } from './utils.jsx';

// TODO: remove simplifySpeciesNameSC when the data is fixed on the backend
// see https://agr-jira.atlassian.net/browse/SCRUM-2649
const SpeciesCell = ({species}) => <SpeciesName>{simplifySpeciesNameSC(species.name)}</SpeciesName>;

SpeciesCell.propTypes = {
  species: PropTypes.object,
};

export default SpeciesCell;
