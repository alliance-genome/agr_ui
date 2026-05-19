import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useQuery, useQueries } from '@tanstack/react-query';
import fetchData from '../../lib/fetchData';

const fetchCitation = (curie) =>
  fetchData(`/api/reference/${curie}`)
    .then((d) => d?.literatureSummary?.short_citation || d?.literatureSummary?.citation || curie)
    .catch(() => curie);

const RelatedPapersList = ({ referenceId }) => {
  const [includeOrthologs, setIncludeOrthologs] = useState(false);
  const related = useQuery({
    queryKey: ['related-papers', referenceId, includeOrthologs],
    queryFn: () =>
      fetchData(
        `/api/reference/${referenceId}/related-papers?limit=10&includeOrthologs=${includeOrthologs}`
      ),
    staleTime: 60_000,
  });

  const results = related.data?.results || [];

  const citations = useQueries({
    queries: results.map((r) => ({
      queryKey: ['citation', r.referenceCurie],
      queryFn: () => fetchCitation(r.referenceCurie),
      staleTime: 5 * 60_000,
    })),
  });

  if (related.isLoading) return <div style={{ color: '#6c757d' }}>Loading related papers…</div>;
  if (!results.length) return <div style={{ color: '#6c757d' }}>No related papers found.</div>;

  return (
    <>
      <div style={{ marginBottom: 8 }}>
        <label style={{ fontSize: '0.875rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={includeOrthologs}
            onChange={(e) => setIncludeOrthologs(e.target.checked)}
            style={{ marginRight: 6 }}
          />
          Include cross-species papers (expand via orthology)
        </label>
      </div>
      <div style={{ fontSize: '0.75rem', color: '#6c757d', marginBottom: 8 }}>
        {includeOrthologs
          ? 'Gene set expanded via ortholog object-gene lookup; a match includes papers that cite an ortholog of any focus gene.'
          : 'Exact-match only. Ortholog matches are not counted — genes must share the exact curie.'}
      </div>
      <ol style={{ paddingLeft: 20, marginBottom: 0 }}>
        {results.map((r, i) => {
          const citation = citations[i].data;
          const species = r.sharedSpecies || [];
          return (
            <li key={r.referenceCurie} style={{ marginBottom: 6 }}>
              <Link to={`/reference/${r.referenceCurie}`}>
                <span dangerouslySetInnerHTML={{ __html: citation || r.referenceCurie }} />
              </Link>{' '}
              <span
                style={{ fontSize: '0.75rem', color: '#6c757d' }}
                title={`${r.sharedGenes} of ${r.focusGeneCount} focus genes shared. Candidate has ${r.candidateGeneCount} genes total.`}
              >
                ({r.sharedGenes} shared gene{r.sharedGenes === 1 ? '' : 's'}, Jaccard {r.jaccard.toFixed(2)})
              </span>
              {species.length > 0 && (
                <>
                  {' — '}
                  <strong>{species.join(', ')}</strong>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </>
  );
};

RelatedPapersList.propTypes = {
  referenceId: PropTypes.string.isRequired,
};

export default RelatedPapersList;
