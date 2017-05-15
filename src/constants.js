export const SEARCH_API_ERROR_MESSAGE = 'There was a problem connecting to the server. Please refresh the page.  If you continue to see this message, please contact alliance-software@lists.stanford.edu';
export const LARGE_COL_CLASS = 'col-sm-8 col-md-8 col-xs-12';
export const SMALL_COL_CLASS = 'col-sm-4 col-md-4 col-xs-12';
export const WP_REST_API_BASE_URL = 'https://public-api.wordpress.com/wp/v2/sites/alliancegenome.wordpress.com/pages?slug=';

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

export const MENU = {
  home: {
    title: 'Home - Alliance of Genome Resources',
    label: 'Home',
    slug: 'home',
    path: 'home'
  },
  about: {
    title: 'About Us - Alliance of Genome Resources',
    label: 'About Us',
    slug: 'about-us',
    path: 'about'
  },
  contact: {
    title: 'Contact Us - Alliance of Genome Resources',
    label: 'Contact Us',
    slug: 'contact-us',
    path: 'contact'
  },
  publications: {
    title: 'Projects, Work Pruduct, Publications - Alliance of Genome Resources',
    label: 'Projects, Work Pruduct, Publications',
    slug: 'projects-work-products-publications',
    path: 'publications'
  }
};
export const NON_HIGHLIGHTED_FIELDS = ['sourceHref', 'href', 'category', 'homologs', 'paralogs', 'orthologs', 'homologs.symbol', 'homologs.panther_family'];
