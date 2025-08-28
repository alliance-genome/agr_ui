import React from 'react';
import PropTypes from 'prop-types';
import { shortSpeciesName } from '../lib/utils';
import { Link } from 'react-router-dom';
import style from './style.module.scss';

const RibbonGeneSubjectLabel = ({ isFocusGene, gene }) => (
  <Link className={`${style.ribbonSubjectLabel} ${isFocusGene ? 'font-weight-bold' : ''}`} to={`/gene/${gene.id}`}>
    {gene.label} ({shortSpeciesName(gene.taxon_id)})
  </Link>
);

RibbonGeneSubjectLabel.propTypes = {
  gene: PropTypes.object,
  isFocusGene: PropTypes.bool,
};

export default RibbonGeneSubjectLabel;
