const UNKNOWN_RELEASE = 'unknown';

function normalizeRelease(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed || trimmed.toLowerCase() === UNKNOWN_RELEASE) {
    return null;
  }

  return trimmed;
}

export function getJBrowseDataRelease({ explicitRelease, legacyRelease, contextRelease } = {}) {
  return normalizeRelease(explicitRelease) || normalizeRelease(legacyRelease) || normalizeRelease(contextRelease);
}
