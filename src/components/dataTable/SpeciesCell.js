import React from 'react';
import PropTypes from 'prop-types';

const SpeciesCell = ({species}) => <i>{species.name}</i>;

SpeciesCell.propTypes = {
  species: PropTypes.object,
};

export default SpeciesCell;
