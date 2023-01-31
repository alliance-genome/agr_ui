import React from 'react';
import {compareAlphabeticalCaseInsensitive} from '../../lib/utils';
import {getResourceUrl, getResourceUrls} from "./getResourceUrl";

export const renderPaginationShowsTotal = (start, end, total) => {
  return <span>Showing { start } - { end } of { total.toLocaleString() } rows</span>;
};

export const getDistinctFieldValue = (response, field) => {
  response = response || {};
  const {distinctFieldValues = {}} = response.supplementalData || {};
  return (distinctFieldValues[field] || [])
    .sort(compareAlphabeticalCaseInsensitive)
    .filter((value) => (
      value && value.trim()
    ));
};

export function getRefStrings(referenceItems) {
  if (!referenceItems)
    return;

  let refStrings = referenceItems.map((referenceItem) => getRefString(referenceItem));

  return refStrings.sort();
}

export function getRefString(referenceItem) {
  if (!referenceItem)
    return;

  if (!referenceItem.cross_references && !referenceItem.crossReferences)
    return referenceItem.curie;

  let xrefCuries = referenceItem.crossReferences.map((crossReference) => crossReference.curie);

  let primaryXrefCurie = '';

  if (indexWithPrefix(xrefCuries, 'PMID:') > -1) {
    [primaryXrefCurie] = xrefCuries.splice(indexWithPrefix(xrefCuries, 'PMID:'), 1);
  } else if (indexWithPrefix(xrefCuries, 'FB:') > -1) {
    [primaryXrefCurie] = xrefCuries.splice(indexWithPrefix(xrefCuries, 'FB:'), 1);
  } else if (indexWithPrefix(xrefCuries, 'MGI:') > -1) {
    [primaryXrefCurie] = xrefCuries.splice(indexWithPrefix(xrefCuries, 'MGI:'), 1);
  } else if (indexWithPrefix(xrefCuries, 'RGD:') > -1) {
    [primaryXrefCurie] = xrefCuries.splice(indexWithPrefix(xrefCuries, 'RGD:'), 1);
  } else if (indexWithPrefix(xrefCuries, 'SGD:') > -1) {
    [primaryXrefCurie] = xrefCuries.splice(indexWithPrefix(xrefCuries, 'SGD:'), 1);
  } else if (indexWithPrefix(xrefCuries, 'WB:') > -1) {
    [primaryXrefCurie] = xrefCuries.splice(indexWithPrefix(xrefCuries, 'WB:'), 1);
  } else if (indexWithPrefix(xrefCuries, 'ZFIN:') > -1) {
    [primaryXrefCurie] = xrefCuries.splice(indexWithPrefix(xrefCuries, 'ZFIN:'), 1);
  } else {
    [primaryXrefCurie] = xrefCuries.splice(0, 1);
  }

  return primaryXrefCurie;
}


function indexWithPrefix(array, prefix) {

  for (let i = 0; i < array.length; i++) {
    if (array[i].startsWith(prefix)) {
      return i;
    }
  }
  return -1;
}

export const getSingleReferenceCurieAndUrl = (reference) => {
  const curie = getRefString(reference);
  const url = getResourceUrl(curie);
  return {curie, url};
}

export const getMultipleReferencesCuriesAndUrls = (references) => {
  return references.map((reference) => getSingleReferenceCurieAndUrl(reference));
}