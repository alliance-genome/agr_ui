import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import classNames from 'classnames';

import style from './style.module.scss';

const CollapsibleBox = ({ children, initiallyExpanded = false, foldedHeight = 72 }) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const [shouldExpand, setShouldExpand] = useState(null);
  const childrenRef = useRef(null);

  useEffect(() => {
    if (shouldExpand === null && childrenRef.current) {
      const childrenHeight = childrenRef.current.getBoundingClientRect().height;
      setShouldExpand(childrenHeight > foldedHeight + 20);
    }
  }, [shouldExpand, childrenRef.current]);

  let outerContainerProps = {};

  if (shouldExpand) {
    outerContainerProps = {
      onClick: () => setExpanded(!expanded),
      title: `click to ${expanded ? 'reduce' : 'expand'}`,
      className: classNames(style['collapsible-box'], { [style['collapsed']]: !expanded }),
      style: {
        maxHeight: expanded ? `${childrenRef.current.getBoundingClientRect().height}px` : `${foldedHeight}px`,
        transition: 'all .5s ease-in-out',
      },
    };
  }

  return (
    <div {...outerContainerProps}>
      <section className="children-wrapper" ref={childrenRef}>
        {children}
      </section>
    </div>
  );
};

CollapsibleBox.propTypes = {
  foldedHeight: PropTypes.number,
  children: PropTypes.element.isRequired,
  initiallyExpanded: PropTypes.bool,
};

export default CollapsibleBox;
