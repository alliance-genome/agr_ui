export const SEARCH_API_ERROR_MESSAGE = 'There was a problem connecting to the server. Please refresh the page.  If you continue to see this message, please contact alliance-software@lists.stanford.edu';
export const LARGE_COL_CLASS = 'col-sm-8 col-md-9 col-xl-10';
export const SMALL_COL_CLASS = 'col-sm-4 col-md-3 col-xl-2';

export const CATEGORIES = [
  {
    name: 'all',
    displayName: 'All'
  },
  {
    name: 'gene',
    displayName: 'Genes'
  },
  {
    name: 'go',
    displayName: 'Gene Ontology'
  }
];

export const NON_HIGHLIGHTED_FIELDS = ['sourceHref', 'href', 'category', 'homologs', 'paralogs', 'orthologs', 'homologs.symbol', 'homologs.panther_family'];
