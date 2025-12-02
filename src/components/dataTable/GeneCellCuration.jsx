import React from 'react';
import { Link } from 'react-router-dom';

import style from './style.module.scss';

/**
 * @param {object} props
 * @param {string} props.curie - The gene curie/identifier
 * @param {object} props.geneSymbol - The gene symbol object
 */
const GeneCellCuration = ({ curie, geneSymbol } = {}) => {
  return (
    <Link className={style.breakWords} to={'/gene/' + curie}>
      {geneSymbol?.displayText}
    </Link>
  );
};

export default GeneCellCuration;
