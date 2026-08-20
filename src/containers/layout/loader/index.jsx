import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import style from './style.module.scss';
import { selectPageLoading } from '../../../selectors/loadingSelector';

const FINISH_INTERVAL = 250;

const CLASS_NAMES = [style.done, style.pending, style.finishing];

// 0=done, 1=pending, 2=finishing (transition from pending to complete so the
// loading bar always finishes, which is satisfying)
const Loader = ({ isPending }) => {
  const [readyState, setReadyState] = useState(0);
  const timeoutRef = useRef(null);
  const prevIsPendingRef = useRef(isPending);

  useEffect(() => {
    const prevIsPending = prevIsPendingRef.current;
    prevIsPendingRef.current = isPending;

    // wasn't pending -> is pending
    if (!prevIsPending && isPending) {
      setReadyState(1);
    }
    // is pending -> not pending, setup quick animation to finish
    else if (prevIsPending && !isPending) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setReadyState(2);
      timeoutRef.current = setTimeout(() => setReadyState(0), FINISH_INTERVAL);
    }
  }, [isPending]);

  useEffect(() => () => timeoutRef.current && clearTimeout(timeoutRef.current), []);

  return <div className={`${style.loader} ${CLASS_NAMES[readyState]}`} />;
};

Loader.propTypes = {
  isPending: PropTypes.bool,
};

function mapStateToProps(state) {
  return { isPending: selectPageLoading(state) };
}

export default connect(mapStateToProps)(Loader);
