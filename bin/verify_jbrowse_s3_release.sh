#!/usr/bin/env bash

set -euo pipefail

AWS_PROFILE="${AWS_PROFILE:-ctabone}"
AWS_REGION="${AWS_REGION:-us-east-1}"
JBROWSE_BUCKET="${JBROWSE_BUCKET:-agrjbrowse}"
JBROWSE_DATA_RELEASE="${JBROWSE_DATA_RELEASE:-${REACT_APP_JBROWSE_DATA_RELEASE:-${REACT_APP_JBROWSE_AGR_RELEASE:-}}}"
JBROWSE_VALIDATION_MODE="${JBROWSE_VALIDATION_MODE:-strict}"

if [[ "${JBROWSE_VALIDATION_MODE}" != "strict" && "${JBROWSE_VALIDATION_MODE}" != "warn" ]]; then
  echo "ERROR: JBROWSE_VALIDATION_MODE must be 'strict' or 'warn'."
  exit 2
fi

# Centralized policy: strict exits non-zero, warn only logs and allows deploy to continue.
warn_or_fail() {
  local message="$1"
  local exit_code="${2:-1}"

  if [[ "${JBROWSE_VALIDATION_MODE}" == "warn" ]]; then
    echo "WARN: ${message}"
    return 0
  fi

  echo "ERROR: ${message}"
  exit "${exit_code}"
}

if [[ -z "${JBROWSE_DATA_RELEASE}" ]]; then
  warn_or_fail "JBROWSE_DATA_RELEASE is required. Set JBROWSE_DATA_RELEASE (or REACT_APP_JBROWSE_DATA_RELEASE) before running." 2
  exit 0
fi

# Sentinel keys per species to ensure core NCList tracks are present for a release.
SENTINELS=(
  "docker/${JBROWSE_DATA_RELEASE}/FlyBase/fruitfly/tracks/All_Genes/2L/trackData.jsonz"
  "docker/${JBROWSE_DATA_RELEASE}/human/tracks/All_Genes/20/trackData.jsonz"
  "docker/${JBROWSE_DATA_RELEASE}/MGI/mouse/tracks/All_Genes/19/trackData.jsonz"
  "docker/${JBROWSE_DATA_RELEASE}/RGD/rat/tracks/All_Genes/1/trackData.jsonz"
  "docker/${JBROWSE_DATA_RELEASE}/zfin/zebrafish-11/tracks/All_Genes/1/trackData.jsonz"
  "docker/${JBROWSE_DATA_RELEASE}/WormBase/c_elegans_PRJNA13758/tracks/All_Genes/I/trackData.jsonz"
  "docker/${JBROWSE_DATA_RELEASE}/XenBase/x_laevis/tracks/All_Genes/Chr1L/trackData.jsonz"
  "docker/${JBROWSE_DATA_RELEASE}/XenBase/x_tropicalis/tracks/All_Genes/Chr1/trackData.jsonz"
  "docker/${JBROWSE_DATA_RELEASE}/SGD/yeast/tracks/All_Genes/chrI/trackData.jsonz"
)

echo "Checking JBrowse NCList sentinels..."
echo "  profile: ${AWS_PROFILE}"
echo "  region:  ${AWS_REGION}"
echo "  bucket:  ${JBROWSE_BUCKET}"
echo "  release: ${JBROWSE_DATA_RELEASE}"
echo "  mode:    ${JBROWSE_VALIDATION_MODE}"
echo

missing=0
for key in "${SENTINELS[@]}"; do
  if aws --profile "${AWS_PROFILE}" --region "${AWS_REGION}" s3api head-object --bucket "${JBROWSE_BUCKET}" --key "${key}" >/dev/null 2>&1; then
    echo "OK    ${key}"
  else
    echo "MISS  ${key}"
    missing=1
  fi
done

echo
if [[ "${missing}" -ne 0 ]]; then
  # Stage/test should report missing artifacts without blocking deploy when running in warn mode.
  warn_or_fail "JBrowse release validation failed: one or more sentinel keys are missing." 1
  exit 0
fi

echo "JBrowse release validation passed."
