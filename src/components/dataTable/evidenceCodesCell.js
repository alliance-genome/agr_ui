import uniq from 'lodash.uniq';

const EvidenceCodesCell = (evidenceCodes) => {
  if (!evidenceCodes || !evidenceCodes.length) {
    return '';
  }
  const codes = evidenceCodes
    .map(code => code.name);
  return uniq(codes).sort().join(', ');
};

export default EvidenceCodesCell;
