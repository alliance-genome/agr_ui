import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import CountBadge from './CountBadge.jsx';
import { ANNOTATION_TYPES } from './annotationTypes.js';
import { useDiseaseTerm } from './useDiseaseTerms.jsx';
import style from './style.module.scss';

const OntologyTree = ({ curie, name, depth = 0, forceExpanded, focusedCurie, onSelect, scrollOnFocus = true }) => {
  const [open, setOpen] = useState(false);
  const rowRef = useRef(null);

  // Term doc comes from the batched provider so every visible node knows its
  // children without firing per-node requests.
  const data = useDiseaseTerm(curie);

  useEffect(() => {
    if (forceExpanded.has(curie)) setOpen(true);
  }, [forceExpanded, curie]);

  useEffect(() => {
    if (scrollOnFocus && focusedCurie === curie && rowRef.current) {
      rowRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [focusedCurie, curie, scrollOnFocus]);

  const childTerms = data?.children || [];
  // We don't know if a node has children until we've expanded it and
  // fetched its doc. Show the arrow optimistically; hide it only after a
  // fetch confirms no children.
  const knownEmpty = !!data && childTerms.length === 0 && !(data.doTerm?.descendantCount > 0);
  const hasChildren = !knownEmpty;
  const isFocused = focusedCurie === curie;

  const toggle = (e) => {
    e.stopPropagation();
    setOpen((v) => !v);
  };

  return (
    <div className={style.node}>
      <div
        ref={rowRef}
        className={classNames(style.nodeRow, { [style.nodeRowFocused]: isFocused })}
        onClick={() => onSelect(curie)}
      >
        {hasChildren ? (
          <button
            type="button"
            className={style.toggle}
            onClick={toggle}
            title={open ? 'Collapse' : 'Expand children'}
            aria-label={open ? 'Collapse' : 'Expand children'}
          >
            <FontAwesomeIcon icon={open ? faChevronDown : faChevronRight} fixedWidth />
          </button>
        ) : (
          <span className={style.toggleSpacer} />
        )}
        <span>{name}</span>
        <span className={style.curie}>&nbsp;{curie}</span>
        <span className={style.badgeRow}>
          {ANNOTATION_TYPES.map((t) => (
            <CountBadge key={t.id} curie={curie} type={t} />
          ))}
        </span>
      </div>
      {open && childTerms.length > 0 && (
        <div className={style.children}>
          {[...childTerms]
            .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
            .map((c) => (
              <OntologyTree
                key={c.curie}
                curie={c.curie}
                name={c.name}
                depth={depth + 1}
                forceExpanded={forceExpanded}
                focusedCurie={focusedCurie}
                onSelect={onSelect}
                scrollOnFocus={scrollOnFocus}
              />
            ))}
        </div>
      )}
    </div>
  );
};

OntologyTree.propTypes = {
  curie: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  depth: PropTypes.number,
  forceExpanded: PropTypes.instanceOf(Set).isRequired,
  focusedCurie: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  scrollOnFocus: PropTypes.bool,
};

export default OntologyTree;
