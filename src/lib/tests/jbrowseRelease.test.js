import assert from 'assert';

import { getJBrowseDataRelease } from '../jbrowseRelease';

describe('getJBrowseDataRelease', () => {
  it('prefers explicit release over all other sources', () => {
    const resolved = getJBrowseDataRelease({
      explicitRelease: '9.1.0',
      legacyRelease: '8.3.0',
      contextRelease: '9.0.0',
    });

    assert.equal(resolved, '9.1.0');
  });

  it('uses legacy release when explicit release is unavailable', () => {
    const resolved = getJBrowseDataRelease({
      explicitRelease: '',
      legacyRelease: '8.3.0',
      contextRelease: '9.0.0',
    });

    assert.equal(resolved, '8.3.0');
  });

  it('falls back to context release when env overrides are unavailable', () => {
    const resolved = getJBrowseDataRelease({
      explicitRelease: '',
      legacyRelease: '',
      contextRelease: '9.0.0',
    });

    assert.equal(resolved, '9.0.0');
  });

  it('returns null when release is unresolved', () => {
    const resolved = getJBrowseDataRelease({
      explicitRelease: '',
      legacyRelease: '',
      contextRelease: 'unknown',
    });

    assert.equal(resolved, null);
  });
});
