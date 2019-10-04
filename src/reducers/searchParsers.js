const JOIN_HIGHLIGHT_BY = '...';

import { makeFieldDisplayName, makeValueDisplayName } from '../lib/searchHelpers';
import { NON_HIGHLIGHTED_FIELDS } from '../constants';

function flattenWithPrettyFieldNames(highlights) {
  if (highlights === undefined) { return highlights; }

  let prettyHighlights = {};

  Object.keys(highlights).forEach( key => {
    prettyHighlights[makeFieldDisplayName(key)] = highlights[key];
  });

  return prettyHighlights;
}


// takes the fields in responseObj.highlights and replaces the shallow values in responseObj
// also return highlight values as strings like '<em>val</em>...<em>val2</em>' instead of array
export function injectHighlightIntoResponse(responseObj) {
  let high = responseObj.highlights || {};
  let highKeys = Object.keys(high);
  let simpleHighObj = {};
  highKeys.forEach( key => {
    let highArr = high[key];
    let highStr = highArr.reduce( (prev, current, i) => {
      let suffix = (i === highArr.length - 1) ? '' : JOIN_HIGHLIGHT_BY;
      return prev + current + suffix;
    }, '');
    simpleHighObj[key] = highStr;
    // don't highlight some fields
    if (NON_HIGHLIGHTED_FIELDS.indexOf(key) < 0) {
      responseObj[key] = injectHighlightingIntoValue(highStr, responseObj[key]);
    }
  });
  responseObj.highlights = flattenWithPrettyFieldNames(simpleHighObj);
  return responseObj;
}

function injectHighlightingIntoValue(highlight, value) {
  if (highlight === undefined || value === undefined) { return value; }

  var unhighlightedValue = highlight.replace(/<\/?[em]+(>|$)/g, '');

  var returnValue;

  if (Array.isArray(value)) {
    returnValue = value.map(function(val) {
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
  return results.map( d => {
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
  return rawAggs.map( d => {
    let _values = d.values.map( _d => {
      let currentValue = queryObject[d.key];
      let _isActive;
      // look at array fields differently
      if (typeof currentValue === 'object') {
        _isActive = (currentValue.indexOf(_d.key) >= 0);
      } else {
        _isActive = _d.key === currentValue;
      }
      return {
        name: _d.key,
        displayName: makeValueDisplayName(_d.key),
        key: _d.key,
        total: _d.total,
        isActive: _isActive
      };
    });
    return {
      name: d.key,
      displayName: makeFieldDisplayName(d.key),
      key: d.key,
      values: _values
    };
  });
}

function parseCoordinates(d) {
  // make sure there is a chromosome identifiers
  let chrom = d.gene_chromosomes || [];
  chrom = chrom.filter( d => d );
  if (chrom.length !== 1) {
    return null;
  }
  chrom = chrom[0];
  // make sure there are coordinates
  let numFields = ['gene_chromosome_starts', 'gene_chromosome_ends'];
  for (var i = numFields.length - 1; i >= 0; i--) {
    let field = numFields[i];
    let type = typeof d[field];
    if (type !== 'string' && type !== 'number') {
      return null;
    }
  }
  // only render what you can
  return `chr${chrom}:${d.gene_chromosome_starts}-${d.gene_chromosome_ends}`;
}

function parseCrossReferences(d) {
  if (!d || !d.crossReferences) {
    return null;
  }

  return Object.keys(d.crossReferences)
    .map(k => { return d.crossReferences[k]; } )
    .reduce(function (a, b) { return a.concat(b); }, [])
    .map(function (r) { return r.name; });
}

// search result individual entry parsers
function parseGeneResult(_d) {
  let speciesKey = _d.species;
  let d = injectHighlightIntoResponse(_d);
  return {
    symbol: d.symbol || '(no symbol)',
    category: d.category || 'gene',
    display_name: d.symbol,
    href: d.href,
    name: d.name,
    id: d.id || '(no ID)',
    sourceHref: d.href,
    synonyms: d.synonyms,
    biotype: makeValueDisplayName(d.soTermName),
    species: d.species,
    speciesKey: speciesKey,  //capture species from before highlighting
    highlight: d.highlights,
    homologs: parseLogs(d.homologs),
    paralogs: parseLogs(d.paralogs),
    genomic_coordinates: parseCoordinates(_d),
    relatedData: d.relatedData,
    missing: d.missingTerms,
    explanation: d.explanation,
    score: d.score
  };
}

function parseLogs(logs) {
  if (!logs) return null;
  return logs.map( d => {
    let famId = d.panther_family;
    d.evidence_name = famId;
    d.evidence_href = `http://pantherdb.org/panther/family.do?clsAccession=${famId}`;
    return d;
  });
}

function parseGoResult(_d) {
  let d = injectHighlightIntoResponse(_d);
  return {
    category: d.category,
    display_name: d.name,
    go_branch: makeValueDisplayName(d.go_type),
    id: d.id,
    highlight: d.highlights,
    href: d.href,
    name: d.name,
    collapsible_synonyms: d.synonyms, //not just named synonyms,
    //so that it can be collapsible when others aren't
    relatedData: d.relatedData,
    missing: d.missingTerms,
    explanation: d.explanation,
    score: d.score
  };
}

function parseDiseaseResult(_d) {
  let d = injectHighlightIntoResponse(_d);
  return {
    associated_genes: d.associated_genes,
    category: d.category,
    display_name: d.name,
    definition: d.definition,
    external_ids: parseCrossReferences(d),
    highlight: d.highlights,
    href: '/disease/' + d.id,
    name: d.name,
    id: d.id,
    synonyms: d.synonyms,
    relatedData: d.relatedData,
    missing: d.missingTerms,
    explanation: d.explanation,
    score: d.score
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
    category: d.category,
    id: d.id,
    display_name: d.symbol,
    href: _d.modCrossRefCompleteUrl,
    highlight: d.highlights,
    name: d.symbol,
    synonyms: d.synonym,
    species: d.species,
    speciesKey: speciesKey,
    diseases: d.diseases,
    gene: d.genes,
    relatedData: d.relatedData,
    missing: d.missingTerms,
    explanation: d.explanation,
    score: d.score
  };
}


function parseDefaultResult(_d) {
  let d = injectHighlightIntoResponse(_d);
  return {
    associated_genes: d.associated_genes,
    category: d.category,
    id: d.id,
    display_name: d.name,
    highlight: d.highlights,
    href: _d.modCrossRefCompleteUrl,
    name: d.name,
    synonyms: d.synonym,
    missing: d.missingTerms,
    explanation: d.explanation,
    relatedData: d.relatedData,
    score: d.score
  };
}
