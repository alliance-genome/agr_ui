import uniq from 'lodash.uniq';

const EvidenceCodesCell = (publications) => {
  if (!publications || !publications.length) {
    return '';
  }
  const codes = publications
    .map(publication => publication.evidenceCodes)
    .reduce((a, b) => a.concat(b));
  return uniq(codes).sort().join(', ');
};

export default EvidenceCodesCell;
