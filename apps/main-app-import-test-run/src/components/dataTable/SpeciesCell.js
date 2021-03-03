import React from 'react';
import PropTypes from 'prop-types';
import SpeciesName from '../SpeciesName';

const SpeciesCell = ({species}) => <SpeciesName>{species.name}</SpeciesName>;

SpeciesCell.propTypes = {
  species: PropTypes.object,
};

export default SpeciesCell;
