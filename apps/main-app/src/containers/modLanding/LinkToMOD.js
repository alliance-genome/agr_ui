import React from 'react';
import PropTypes from "prop-types";
import style from './style.scss';

const LinkToMOD = ({modName, linkAddress, titleBarStyle}) => {
  return (
    <p data-testid="link-to-mod-parent">
      <a href={linkAddress} >
        <button className={`${style.buttonVisitMod} ${titleBarStyle}`} >Visit {modName}</button>
      </a>
    </p>
  );
}

LinkToMOD.propTypes = {
  modName: PropTypes.string.isRequired,
  linkAddress: PropTypes.string.isRequired
}

export default LinkToMOD;
