import { STRINGENCY_HIGH, STRINGENCY_MED } from '../components/homology/constants.js';
import { DEFAULT_TABLE_STATE, SPECIES } from '../constants.js';
import { stringify } from 'qs';

export function makeId(string) {
  return string.toLowerCase().replace(/[^A-Za-z0-9]/g, '-');
}

export function stripHtml (string) {
  if (!string) {
    return '';
  }
  return string.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi, '').trim();
}

function functionOrIdentity(func) {
  return func || (val => val);
}

export function compareAlphabeticalCaseInsensitive(accessor) {
  accessor = functionOrIdentity(accessor);
  return function (a, b) {
    return accessor(a).toLowerCase().localeCompare(accessor(b).toLowerCase());
  };
}

export function alphaSort(accessor) {
  //implements a natural sort
  //https://wikipedia.org/wiki/Natural_sort_order
  
  accessor = functionOrIdentity(accessor);
  return function (a, b) {
    const ax = accessor(a).toLowerCase();
    const bx = accessor(b).toLowerCase();
    
    // Split strings into chunks of strings and numbers
    const splitRegex = /([0-9]+|[^0-9]+)/g;
    const aChunksArray = ax.match(splitRegex);
    const bChunksArray = bx.match(splitRegex);

    const len = Math.min(aChunksArray.length, bChunksArray.length);
    
    for (let i = 0; i < len; i++) {
      // If both parts are numeric, compare as numbers
      if (!isNaN(aChunksArray[i]) && !isNaN(bChunksArray[i])) {
        const diff = parseInt(aChunksArray[i]) - parseInt(bChunksArray[i]);
        if (diff !== 0) return diff;
      }
      // Otherwise compare as strings
      else {
        const diff = aChunksArray[i].localeCompare(bChunksArray[i]);
        if (diff !== 0) return diff;
      }
    }
    
    // If all parts are equal up to the length of the shorter string,
    // the shorter string comes first
    return aChunksArray.length - bChunksArray.length;
  };
}

export function compareByFixedOrder(order, accessor) {
  accessor = functionOrIdentity(accessor);
  const indexOf = value => {
    const index = order.indexOf(value);
    return index < 0 ? order.length : index;
  };
  return (a, b) => indexOf(accessor(a)) - indexOf(accessor(b));
}

export function compareBy(compareFunctions) {
  return (a, b) => {
    const last = compareFunctions.length - 1;
    for (let i = 0; i < last; i++) {
      const compareOutput = compareFunctions[i](a, b);
      if (compareOutput !== 0) {
        return compareOutput;
      }
    }
    return compareFunctions[last](a, b);
  };
}

export function sortBy(array, compareFunctions) {
  return array.sort(compareBy(compareFunctions));
}

export function buildTableQueryString(options) {
  if (!options) {
    options = DEFAULT_TABLE_STATE;
  }
  const queryParams = {};
  Object.entries(options.filters || {})
    .forEach(([field, filter]) => {
      let value = Array.isArray(filter.filterVal) ?
        filter.filterVal.join('|') :
        filter.filterVal;
      queryParams[`filter.${field}`] = value || null;
    });
  // these "or nulls" could be removed if https://github.com/ljharb/qs/issues/372 is resolved
  queryParams.page = options.page || null;
  queryParams.limit = options.sizePerPage || null;
  queryParams.sortBy =  options.sort || null;
  return stringify(queryParams, {
    skipNull: true,
  });
}

export function getTableUrl(baseUrl, tableState) {
  if (!baseUrl) {
    return null;
  }
  const separator = baseUrl.indexOf('?') < 0 ? '?' : '&';
  return baseUrl + separator + buildTableQueryString(tableState);
}

export function orthologyMeetsStringency(orthology, stringency) {
  switch (stringency) {
  case STRINGENCY_HIGH:
    return orthology.strictFilter;
  case STRINGENCY_MED:
    return orthology.moderateFilter || orthology.strictFilter;
  default:
    return true;
  }
}

export function filterOrthologyByStringency(orthologyList, stringency) {
  return orthologyList.filter(o => orthologyMeetsStringency(o, stringency));
}

export function getSpecies(taxonId) {
  return SPECIES.find(s => s.taxonId === taxonId) || {};
}

export const shortSpeciesName = taxonId => {
  return getSpecies(taxonId).shortName;
};

export const fullSpeciesName = taxonId => {
  return getSpecies(taxonId).fullName;
};

export function htmlToPlainText(html) {
  return html
    .replaceAll('<sup>', '[')
    .replaceAll('</sup>', ']');
}

export function getSingleGenomeLocation(genomeLocations) {
  // extracted from container/genePage/index.js
  // todo, add chromosome
  let genomeLocation = {};
  if (genomeLocations) {
    if (genomeLocations.length === 1) {
      genomeLocation = genomeLocations[0];
    }
    else if (genomeLocations.length > 1) {
      // TODO: figure out the proper assembly
      for (let i in genomeLocations) {
        let tempGenomeLocation = genomeLocations[i];
        if (tempGenomeLocation.start && tempGenomeLocation.end) {
          genomeLocation = tempGenomeLocation;
        }
      }
    }
  }
  return genomeLocation;
}

export function findFminFmax(locations) {
  let fmax;
  let fmin;
  (locations || []).forEach((location) => {
    const {start, end} = location || {};

    if (typeof fmin === 'undefined' || (typeof start !== 'undefined' && start < fmin)) {
      fmin = start;
    }
    if (typeof fmax === 'undefined' || (typeof end !== 'undefined' && end > fmax)) {
      fmax = end;
    }
  });
  return {
    fmax,
    fmin,
  };
}
