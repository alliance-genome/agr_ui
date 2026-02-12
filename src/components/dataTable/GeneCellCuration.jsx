import React from 'react';
import { Link } from 'react-router-dom';

import style from './style.module.scss';
import { getIdentifier } from './utils.jsx';

/**
 * @param {object} props
 * @param {string} props.identifier - The gene identifier
 * @param {object} props.gene - The gene object containing symbol information
 */
const GeneCellCuration = ({ identifier, gene } = {}) => {
  if (!gene) return null;

  let geneIdentifier = identifier || getIdentifier(gene);

  return (
    <Link className={style.breakWords} to={'/gene/' + geneIdentifier}>
      <span dangerouslySetInnerHTML={{ __html: gene.geneSymbol?.displayText }} />
    </Link>
  );
};

export default GeneCellCuration;
