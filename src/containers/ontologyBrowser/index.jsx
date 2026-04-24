import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DataPage, PageData, PageHeader, PageNav } from '../../components/dataPage';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import NotFound from '../../components/notFound.jsx';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import DOTermNode from './DOTermNode.jsx';
import TreeContext from './TreeContext.js';
import styles from './style.module.scss';

const DO_ROOT = 'DOID:4';

const parseExpanded = (searchParams) =>
  new Set(searchParams.get('expanded')?.split(',').filter(Boolean) || []);

const OntologyBrowserPage = () => {
  const { isLoading, isError, data } = usePageLoadingQuery(`/api/disease/${DO_ROOT}`);
  const [searchParams, setSearchParams] = useSearchParams();

  const expandedCuries = parseExpanded(searchParams);

  const toggleExpanded = useCallback(
    (curie) => {
      setSearchParams(
        (prev) => {
          const current = parseExpanded(prev);
          if (current.has(curie)) {
            current.delete(curie);
          } else {
            current.add(curie);
          }
          const next = new URLSearchParams(prev);
          if (current.size > 0) {
            next.set('expanded', [...current].join(','));
          } else {
            next.delete('expanded');
          }
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  if (isError) return <NotFound />;
  if (isLoading) return null;

  const { doTerm, children = [] } = data;

  return (
    <DataPage>
      <HeadMetaTags title="Disease Ontology Browser" />
      <PageNav sections={[]} />
      <PageData>
        <PageHeader>Disease Ontology Browser</PageHeader>
        <TreeContext.Provider value={{ expandedCuries, toggleExpanded }}>
          <div className={styles.treeContainer}>
            <ul className={styles.termTree}>
              <li className={styles.termNode}>
                <span className={styles.nodeRow}>
                  <span className={styles.rootName}>{doTerm.name}</span>
                  <span className={styles.termCurie}>{doTerm.curie}</span>
                </span>
                <ul className={styles.childList}>
                  {children.map((child) => (
                    <DOTermNode key={child.curie} curie={child.curie} name={child.name} />
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </TreeContext.Provider>
      </PageData>
    </DataPage>
  );
};

export default OntologyBrowserPage;
