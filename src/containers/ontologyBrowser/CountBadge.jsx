import React from 'react';
import PropTypes from 'prop-types';
import { useDiseaseCounts } from './useDiseaseCounts.jsx';
import style from './style.module.scss';

const CountBadge = ({ curie, type, expanded }) => {
  const counts = useDiseaseCounts(curie);
  const count = counts ? counts[type.id] : undefined;

  // The pill is a navigation shortcut — useless when there's nothing to jump to.
  if (typeof count !== 'number' || count === 0) return null;

  const href = `/disease/${curie}#${type.hash}`;
  const display = expanded ? `View ${type.label.toLowerCase()}` : type.label.charAt(0).toUpperCase();
  const title = `${count.toLocaleString()} ${type.label.toLowerCase()} — open in new window`;
  const badgeClass = expanded ? `${style.countBadge} ${style.countBadgeExpanded}` : style.countBadge;

  if (!type.hash) {
    return (
      <span
        className={badgeClass}
        style={{ background: type.bg, color: type.fg }}
        title={`${count.toLocaleString()} ${type.label.toLowerCase()}`}
      >
        {display}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`${badgeClass} ${style.countBadgeLink}`}
      style={{ background: type.bg, color: type.fg }}
      title={title}
    >
      {display}
    </a>
  );
};

CountBadge.propTypes = {
  curie: PropTypes.string.isRequired,
  type: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    hash: PropTypes.string,
    bg: PropTypes.string.isRequired,
    fg: PropTypes.string.isRequired,
  }).isRequired,
  expanded: PropTypes.bool,
};

export default CountBadge;
