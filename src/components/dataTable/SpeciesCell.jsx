import React from 'react';
import PropTypes from 'prop-types';
import SpeciesName from '../SpeciesName.jsx';

const SpeciesCell = ({ taxon }) => <SpeciesName>{taxon?.species?.fullName || taxon?.name || ''}</SpeciesName>;

SpeciesCell.propTypes = {
  taxon: PropTypes.object,
};

export default SpeciesCell;
