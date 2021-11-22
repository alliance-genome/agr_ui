import React from 'react';
import PropTypes from "prop-types";

const LinkToMOD = ({modName, linkAddress}) => {
  return (
    <p>
      <b>To visit {modName} click <a href={linkAddress}> here</a>.</b>
    </p>
  );
}

LinkToMOD.propTypes = {
  modName: PropTypes.string.isRequired,
  linkAddress: PropTypes.string.isRequired
}

export default LinkToMOD;
