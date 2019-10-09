import React from 'react';
import PropTypes from 'prop-types';
import {shortSpeciesName} from '../lib/utils';
import {Link} from 'react-router-dom';

const RibbonGeneSubjectLabel = ({subject}) => (
  <Link style={{fontSize: '0.9rem', marginRight: '0.25rem'}} to={`/gene/${subject.id}`}>
    {subject.label} ({shortSpeciesName(subject.taxon_id)})
  </Link>
);

RibbonGeneSubjectLabel.propTypes = {
  subject: PropTypes.object,
};

export default RibbonGeneSubjectLabel;
