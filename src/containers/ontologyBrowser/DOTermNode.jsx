import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import fetchData from '../../lib/fetchData';
import LoadingSpinner from '../../components/loadingSpinner.jsx';
import { useTreeContext } from './TreeContext.js';
import styles from './style.module.scss';

const DOTermNode = ({ curie, name }) => {
  const { expandedCuries, toggleExpanded } = useTreeContext();
  const isExpanded = expandedCuries.has(curie);

  // Fetch eagerly so we know whether this node has children before the user
  // clicks expand (look-ahead). TanStack Query caches the result, so
  // expanding later is instant.
  const { data, isLoading } = useQuery({
    queryKey: [`/api/disease/${curie}`],
    queryFn: () => fetchData(`/api/disease/${curie}`),
    staleTime: 5 * 60 * 1000,
  });

  const children = data?.children || [];
  const isLeaf = !isLoading && children.length === 0;

  return (
    <li className={styles.termNode}>
      <span className={styles.nodeRow}>
        {isLoading ? (
          <span className={styles.togglePlaceholder}>
            <LoadingSpinner size="xs" />
          </span>
        ) : !isLeaf ? (
          <button
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            className={styles.toggleButton}
            onClick={() => toggleExpanded(curie)}
          >
            {isExpanded ? '−' : '+'}
          </button>
        ) : (
          <span className={styles.togglePlaceholder} />
        )}
        <Link className={styles.termLink} to={`/disease/${curie}`}>
          {name}
        </Link>
        <span className={styles.termCurie}>{curie}</span>
      </span>
      {isExpanded && children.length > 0 && (
        <ul className={styles.childList}>
          {children.map((child) => (
            <DOTermNode key={child.curie} curie={child.curie} name={child.name} />
          ))}
        </ul>
      )}
    </li>
  );
};

DOTermNode.propTypes = {
  curie: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default DOTermNode;
