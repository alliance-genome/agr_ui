import React from 'react';
import ExternalLink from '../../../components/ExternalLink.jsx';

export const namesList = (value) => {
  if (!value) return '';
  const items = Array.isArray(value) ? value : [value];
  return items.map((item) => item?.name).filter(Boolean).join(', ');
};

export const sourceFormatter = (evidence) => {
  if (!evidence || !evidence.length) return null;
  const first = evidence[0] || {};
  const xref = (first.crossReferences || []).find((x) => x.referencedCurie?.startsWith('PMID:'));
  if (xref?.referencedCurie) {
    const pmid = xref.referencedCurie.replace('PMID:', '');
    return <ExternalLink href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`}>{xref.referencedCurie}</ExternalLink>;
  }
  return first.referenceID || first.curie || null;
};
