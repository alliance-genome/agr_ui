import { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import classNames from 'classnames';

import style from './style.module.scss';

const CollapsibleBox = ({ children, initiallyExpanded = false, foldedHeight = 4.5 }) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  let expClass = expanded ? '' : 'folded';
  let styleObj = expanded
    ? { cursor: 'pointer', transition: 'all 0.5s ease-in-out', maxHeight: '50em' }
    : { cursor: 'pointer', transition: 'all 0.25s', maxHeight: foldedHeight + 'em' };
  let titleMsg = expanded ? 'click to reduce' : 'click to expand';

  return (
    <div className={`${style[expClass]}`} onClick={() => setExpanded(!expanded)} style={styleObj} title={titleMsg}>
      {children}
    </div>
  );
};

CollapsibleBox.propTypes = {
  foldedHeight: PropTypes.number,
  children: PropTypes.element.isRequired,
  initiallyExpended: PropTypes.bool,
};

export default CollapsibleBox;
