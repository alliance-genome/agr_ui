import React from 'react';
import PropTypes from "prop-types";
import style from './style.scss';

const LinkToMOD = ({modName, linkAddress}) => {
  return (
    <h5 data-testid='visit_mod_header' className={style.externalNews} >
      <a data-testid='visit_mod_link' href={linkAddress}>
         Visit {modName}
      </a>
    </h5>
  );
}

LinkToMOD.propTypes = {
  modName: PropTypes.string.isRequired,
  linkAddress: PropTypes.string.isRequired
}

export default LinkToMOD;
