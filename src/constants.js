export const SEARCH_API_ERROR_MESSAGE = 'There was a problem connecting to the server. Please refresh the page.  If you continue to see this message, please contact alliance-software@lists.stanford.edu';
export const LARGE_COL_CLASS = 'col-sm-8 col-md-8 col-xs-12';
export const SMALL_COL_CLASS = 'col-sm-4 col-md-4 col-xs-12';

/* Wordpress REST API connection setting */
export const WP_REST_API_BASE = 'https://public-api.wordpress.com/wp/v2/sites/alliancegenome.wordpress.com';
export const WP_PAGE_BASE_URL = WP_REST_API_BASE+'/pages?slug=';
export const WP_POST_BASE_URL = WP_REST_API_BASE+'/posts';
export const WP_POST_URL = WP_POST_BASE_URL+'?slug=';
/* Maximum number of posts to display on the News and Events page */
export const WP_POST_MAX_COUNT = 10;
export const WP_PATH= '';
export const WP_POST_PATH = '/posts';

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
  },
  {
    name: 'disease',
    displayName: 'Disease'
  }
];

/**********  Wordpress Pages *************
  An entry is added to this constant each
  time a new static page that's part of the
  menu or sub-menu  is created/publised in WP

  Fields Definition:
  1) label: Used in the site  menu/sub menu
  2) slug: WP slug for this page
  3) path: Used for Portal router
******************************************/

export const WP_PAGES ={
  home: {
    label: 'Home',
    slug: 'home',
    path: 'home'
  },
  about: {
    label: 'About US',
    slug: 'about-us',
    path: 'about'
  },
  projects: {
    label: 'Projects, Work Product, Publications',
    slug: 'projects-work-products-publications',
    path: 'projects'
  },
  contact: {
    label: 'Contact US',
    slug: 'contact-us',
    path: 'contact'
  },
  faq:{
    label: 'Frequently Asked Questions',
    slug: 'frequently-asked-questions',
    path: 'faq'
  },
  funding: {
    label: 'Funding',
    slug: 'funding',
    path: 'funding'
  },
  organization: {
    label: 'Organization and Governance',
    slug: 'organization-and-governance',
    path: 'organization'
  },
  goups: {
    label: 'AGR Working Groups',
    slug: 'projects-work-products-publications',
    path: 'projects'
  },
  publications:{
    label: 'Publications',
    slug: 'publications',
    path: 'publications'
  },
  news:{
    label: 'News & Events',
    slug: 'news-and-events',
    path: 'news'
  },
  features: {
    label: 'Genome Features',
    slug: 'genome-features',
    path: 'features'
  },
  supplement: {
    label: 'Administrative Supplement',
    slug: 'administrative-supplement',
    path: 'supplement'
  },
  phenotypes: {
    label: 'Phenotypes And Disease Models',
    slug: 'phenotypes-and-disease-models',
    path: 'phenotypes'
  }
};

/********* Main Menu ************************
  This is where you add/remove entries
  to/from the site menu
*********************************************/
export const MENU = [
  'home',
  'about',
  'projects',
  'news',
  'contact'
];
/********* Secondary nav setting ************************
  This maps the ids of primary menu items
*********************************************/
export const MENU_IDS = {
  16:'home',
  2:'about',
  257:'projects',
  3:'contact'
};

/********* Sub Menu ************************
  This is where you add/remove entries
  to/from the submenus
*********************************************/
export const SUB_MENU= {
  about: [
    'faq',
    'funding',
    'organization'
  ],
  projects: [
    'goups',
    'publications'
  ]
};

export const NON_HIGHLIGHTED_FIELDS = ['sourceHref', 'href', 'category', 'homologs', 'paralogs', 'orthologs', 'homologs.symbol', 'homologs.panther_family'];
