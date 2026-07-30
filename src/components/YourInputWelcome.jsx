import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './YourInputWelcome.module.scss';

const HIDE_AFTER_SCROLL_PX = 200;

const YourInputWelcome = ({ type, name, allianceId }) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > HIDE_AFTER_SCROLL_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const params = new URLSearchParams();
  if (type) params.set('type', type);
  if (name) params.set('name', name);
  if (allianceId) params.set('id', allianceId);

  return (
    <Link
      className={`btn btn-primary btn-sm ${styles.floatingButton} ${hidden ? styles.hidden : ''}`}
      to={`/contact-us?${params.toString()}`}
    >
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
