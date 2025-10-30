import { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import classNames from 'classnames';

import style from './style.module.scss';

const CollapsibleBox = ({ children, initiallyExpanded = false, collapsedHeight = 4.5 }) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  let expClass = expanded ? '' : 'folded';
  let styleObj = expanded ? { cursor: 'pointer' } : { cursor: 'pointer', maxHeight: collapsedHeight + 'em' };
  let titleMsg = expanded ? 'click to reduce' : 'click to expand';

  return (
    <div className={`${style[expClass]}`} onClick={() => setExpanded(!expanded)} style={styleObj} title={titleMsg}>
      {children}
    </div>
  );
};

CollapsibleBox.propTypes = {
  backgroundVariants: PropTypes.string,
  children: PropTypes.element.isRequired,
  initiallyExpended: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default CollapsibleBox;
