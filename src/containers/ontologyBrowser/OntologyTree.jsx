import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import CountBadge from './CountBadge.jsx';
import { ANNOTATION_TYPES } from './annotationTypes.js';
import { useDiseaseTerm } from './useDiseaseTerms.jsx';
import style from './style.module.scss';

const OntologyTree = ({
  curie,
  name,
  depth = 0,
  forceExpanded,
  focusedCurie,
  onSelect,
  scrollOnFocus = true,
  onFocusMounted,
}) => {
  const [open, setOpen] = useState(false);
  const rowRef = useRef(null);

  // Term doc comes from the batched provider so every visible node knows its
  // children without firing per-node requests.
  const data = useDiseaseTerm(curie);

  useEffect(() => {
    if (forceExpanded.has(curie)) setOpen(true);
  }, [forceExpanded, curie]);

  // Deep-link nav can shift the focused row multiple times while ancestor
  // batches arrive. Re-anchor a few times so late layout shifts still land the
  // row in view. Anchoring is strictly opt-in (scrollOnFocus) AND only fires
  // when the row is currently outside its scroll parent's viewport, so an
  // in-tree click never yanks the pane away from the user's cursor.
  useEffect(() => {
    if (!scrollOnFocus || focusedCurie !== curie) return;
    onFocusMounted?.();
    const findScrollParent = (el) => {
      let p = el.parentElement;
      while (p) {
        const s = window.getComputedStyle(p);
        if (/(auto|scroll)/.test(s.overflow) || /(auto|scroll)/.test(s.overflowY)) return p;
        p = p.parentElement;
      }
      return document.scrollingElement;
    };
    const anchor = () => {
      const el = rowRef.current;
      if (!el) return;
      const scrollParent = findScrollParent(el);
      if (scrollParent) {
        const rowRect = el.getBoundingClientRect();
        const parentRect = scrollParent.getBoundingClientRect();
        if (rowRect.top >= parentRect.top && rowRect.bottom <= parentRect.bottom) return;
      }
      el.scrollIntoView({ block: 'center', behavior: 'auto' });
    };
    anchor();
    const timers = [100, 300, 700, 1200].map((ms) => setTimeout(anchor, ms));
    return () => timers.forEach(clearTimeout);
  }, [focusedCurie, curie, scrollOnFocus, onFocusMounted]);

  const childTerms = data?.children || [];
  // Only show the toggle once the term doc confirms children exist. This
  // avoids the flash where every node briefly renders a chevron and then
  // loses it a moment later when the batched fetch reports zero children.
  const hasChildren = childTerms.length > 0 || (data?.doTerm?.descendantCount || 0) > 0;
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
                onFocusMounted={onFocusMounted}
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
  onFocusMounted: PropTypes.func,
};

export default OntologyTree;
