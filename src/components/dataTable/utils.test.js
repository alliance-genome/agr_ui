import { getIdentifier } from './utils.jsx';

describe('getIdentifier', () => {
  it('prefers primaryExternalId over an AGRKB curie', () => {
    expect(getIdentifier({ curie: 'AGRKB:105000000383782', primaryExternalId: 'HGNC:40' })).toBe('HGNC:40');
  });

  it('falls back to modInternalId before curie', () => {
    expect(getIdentifier({ curie: 'AGRKB:105000000383782', modInternalId: 'ZFIN:ZDB-ALT-1' })).toBe('ZFIN:ZDB-ALT-1');
  });

  it('falls back to curie when no MOD ID is present', () => {
    expect(getIdentifier({ curie: 'AGRKB:105000000383782' })).toBe('AGRKB:105000000383782');
  });

  it('returns undefined for a missing subject', () => {
    expect(getIdentifier(undefined)).toBeUndefined();
  });
});
