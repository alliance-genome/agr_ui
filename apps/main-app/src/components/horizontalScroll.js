import React, { useEffect, useState, useRef }  from 'react';
// import React from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

const HorizontalScroll = ({children, width}) => {
  const [startOffset, setStartOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(0);
  const scrollEl = useRef(null);
  let animationRequest = null;

  // this function does the actual position & offset measurements on the scrolling element
  const updateOffsets = () => {
    const el = scrollEl.current;
    if (!el) {
      return;
    }
    setStartOffset(el.scrollLeft);
    setEndOffset(el.scrollWidth - el.scrollLeft - el.clientWidth);
  };

  // this function calls the updater function, but not too often; throttled by requestAnimationFrame
  const throttledUpdate = () => {
    if (animationRequest) {
      cancelAnimationFrame(animationRequest);
    }
    animationRequest = requestAnimationFrame(updateOffsets);
  };

  // if the children or specified width change, run an update
  useEffect(updateOffsets, [children, width]);

  // set up / tear down a window resize listener for doing an update
  useEffect(() => {
    window.addEventListener('resize', throttledUpdate);
    return () => window.removeEventListener('resize', throttledUpdate);
  }, []);

  return (
    <div className='position-relative'>
      <div className={style.shadow + ' ' + style.left} style={{opacity: startOffset > 0 ? 1 : 0}} />
      <div className={style.shadow + ' ' + style.right} style={{opacity: endOffset > 0 ? 1 : 0}} />
      <div className={style.hScrollOuter} onScroll={throttledUpdate} ref={scrollEl}>
        <div style={{minWidth: width}}>
          {children}
        </div>
      </div>
    </div>
  );
};

HorizontalScroll.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number,
};

export default HorizontalScroll;
