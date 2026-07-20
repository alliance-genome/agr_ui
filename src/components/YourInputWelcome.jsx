import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './YourInputWelcome.module.scss';

const YourInputWelcome = ({ type, name, allianceId }) => {
  const params = new URLSearchParams();
  if (type) params.set('type', type);
  if (name) params.set('name', name);
  if (allianceId) params.set('id', allianceId);
  return (
    <Link className={`btn btn-primary btn-sm ${styles.floatingButton}`} to={`/contact-us?${params.toString()}`}>
      Your Input Welcome
    </Link>
  );
};

YourInputWelcome.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  allianceId: PropTypes.string,
};

export default YourInputWelcome;
