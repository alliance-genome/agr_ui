const JOIN_HIGHLIGHT_BY = '...';

import {
  makeFieldDisplayName,
  makeValueDisplayName
} from '../lib/searchHelpers';
import {
  CATEGORIES,
  DUPLICATE_HIGHLIGHTED_FIELDS,
  NON_HIGHLIGHTED_FIELDS
} from '../constants';

function flattenWithPrettyFieldNames(highlights) {
  if (highlights === undefined) {
    return highlights;
  }

  let prettyHighlights = {};

  Object.keys(highlights).forEach(key => {
    prettyHighlights[makeFieldDisplayName(key)] = highlights[key];
  });

  return prettyHighlights;
}


// takes the fields in responseObj.highlights and replaces the shallow values in responseObj
// also return highlight values as strings like '<em>val</em>...<em>val2</em>' instead of array
export function injectHighlightIntoResponse(responseObj) {
  let high = responseObj.highlights || {};
  let highKeys = Object.keys(high);
  let displayFields = CATEGORIES.find(cat => cat.name === responseObj.category).displayFields;
  let simpleHighObj = {};
  highKeys.forEach(key => {
    let highArr = high[key];
    let highStr = highArr.reduce((prev, current, i) => {
      let suffix = (i === highArr.length - 1) ? '' : JOIN_HIGHLIGHT_BY;
      return prev + current + suffix;
    }, '');
    simpleHighObj[key] = highStr;
    // if it's not excluded from highlighting, add the highlighting and swap
    // it into the original object
    if (!NON_HIGHLIGHTED_FIELDS.includes(key)) {
      responseObj[key] = injectHighlightingIntoValue(highStr, responseObj[key]);
      if (displayFields.includes(key) && !DUPLICATE_HIGHLIGHTED_FIELDS.includes(key)) {
        delete simpleHighObj[key];
      }
    }
  });
  responseObj.highlights = flattenWithPrettyFieldNames(simpleHighObj);
  return responseObj;
}

function injectHighlightingIntoValue(highlight, value) {
  if (highlight === undefined || value === undefined) {
    return value;
  }

  const unhighlightedValue = highlight.replace(/<\/?[em]+(>|$)/g, '');

  let returnValue;

  if (Array.isArray(value)) {
    returnValue = value.map(function (val) {
      return replaceHighlightValue(val, unhighlightedValue, highlight);
    });
  } else {
    returnValue = replaceHighlightValue(value, unhighlightedValue, highlight);
  }

  return returnValue;
}

function replaceHighlightValue(value, unhighlightedValue, highlight) {
  return value.toString().replace(unhighlightedValue, highlight);
}


export function parseResults(results) {
  return results.map(d => {
    switch (d.category) {
    case 'gene':
      return parseGeneResult(d);
    case 'go':
      return parseGoResult(d);
    case 'disease':
      return parseDiseaseResult(d);
    case 'allele':
      return parseAlleleResult(d);
    case 'homology_group':
      return parseHomologyGroupResult(d);
    default:
      return parseDefaultResult(d);
    }
  });
}

export function parseAggs(rawAggs, queryObject) {
  return rawAggs.map(d => parseAgg(d, queryObject));
}

function parseAgg(agg, queryObject) {
  let currentValue = queryObject[agg.key];
  let _values = agg.values.map(value => parseValue(value, currentValue));
  return {
    name: agg.key,
    displayName: makeFieldDisplayName(agg.key),
    key: agg.key,
    values: _values
  };
}

function parseValue(value, currentValue) {
  let _isActive;
  // look at array fields differently
  if (typeof currentValue === 'object') {
    _isActive = (currentValue.indexOf(value.key) >= 0);
  } else {
    _isActive = value.key === currentValue;
  }
  return {
    name: value.key,
    displayName: makeValueDisplayName(value.key),
    key: value.key,
    total: value.total,
    values: value.values.map(v => parseValue(v, currentValue)),
    isActive: _isActive
  };
}

function parseCoordinates(d) {
  // make sure there is a chromosome identifiers
  let chrom = d.gene_chromosomes || [];
  chrom = chrom.filter(d => d);
  if (chrom.length !== 1) {
    return null;
  }
  chrom = chrom[0];
  // make sure there are coordinates
  let numFields = ['gene_chromosome_starts', 'gene_chromosome_ends'];
  for (let i = numFields.length - 1; i >= 0; i--) {
    let field = numFields[i];
    let type = typeof d[field];
    if (type !== 'string' && type !== 'number') {
      return null;
    }
  }
  // only render what you can
  return `chr${chrom}:${d.gene_chromosome_starts}-${d.gene_chromosome_ends}`;
}

// search result individual entry parsers
function parseGeneResult(_d) {
  let speciesKey = _d.species;
  let d = injectHighlightIntoResponse(_d);
  return {
    ...d,
    symbol: d.symbol || '(no symbol)',
    display_name: d.symbol,
    sourceHref: d.href,
    biotype: makeValueDisplayName(d.soTermName),
    speciesKey: speciesKey,  //capture species from before highlighting
    highlight: d.highlights,
    homologs: parseLogs(d.homologs),
    paralogs: parseLogs(d.paralogs),
    genomic_coordinates: parseCoordinates(_d),
    missing: d.missingTerms
  };
}

function parseLogs(logs) {
  if (!logs) {
    return null;
  }
  return logs.map(d => {
    let famId = d.panther_family;
    d.evidence_name = famId;
    d.evidence_href = `http://pantherdb.org/panther/family.do?clsAccession=${famId}`;
    return d;
  });
}

function parseGoResult(_d) {
  let d = injectHighlightIntoResponse(_d);
  return {
    ...d,
    display_name: d.name,
    branch: makeValueDisplayName(_d.branch),
    highlight: d.highlights,
    collapsible_synonyms: d.synonyms, //not just named synonyms,
    //so that it can be collapsible when others aren't
    missing: d.missingTerms
  };
}

function parseDiseaseResult(_d) {
  let d = injectHighlightIntoResponse(_d);
  return {
    ...d,
    display_name: d.name,
    highlight: d.highlights,
    href: '/disease/' + d.id,
    missing: d.missingTerms
  };
}

function parseHomologyGroupResult(_d) {
  let d = injectHighlightIntoResponse(_d);
  return {
    associated_genes: d.associated_genes,
    category: d.category || 'gene',
    display_name: d.name,
    highlight: d.highlights,
    href: d.href,
    name: d.name,
    synonyms: d.synonym,
    member_genes: _d.member_genes
  };
}

function parseAlleleResult(_d) {
  let speciesKey = _d.species;
  let d = injectHighlightIntoResponse(_d);
  return {
    ...d,
    display_name: d.symbol ? d.symbol : d.name,
    href: _d.modCrossRefCompleteUrl,
    highlight: d.highlights,
    name: d.symbol,
    speciesKey: speciesKey,
    missing: d.missingTerms
  };
}


function parseDefaultResult(_d) {
  let d = injectHighlightIntoResponse(_d);
  return {
    ...d,
    display_name: d.name,
    highlight: d.highlights,
    href: _d.modCrossRefCompleteUrl,
    missing: d.missingTerms,
  };
}
