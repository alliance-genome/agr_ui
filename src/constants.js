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
    displayName: 'Gene'
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
    slug: 'home'
  },
  'about-us': {
    label: 'About US',
    slug: 'about-us'
  },
  'projects-work-products-publications': {
    label: 'Projects, Work Product, Publications',
    slug: 'projects-work-products-publications'
  },
  'contact-us': {
    label: 'Contact US',
    slug: 'contact-us'
  },
  'frequently-asked-questions':{
    label: 'Frequently Asked Questions',
    slug: 'frequently-asked-questions'
  },
  funding: {
    label: 'Funding',
    slug: 'funding'
  },
  'organization-and-governance': {
    label: 'Organization and Governance',
    slug: 'organization-and-governance'
  },
  publications:{
    label: 'Publications',
    slug: 'publications'
  },
  news:{
    label: 'News & Events',
    slug: 'news'
  }
};

/********* Main Menu ************************
  This is where you add/remove entries
  to/from the site menu
*********************************************/
export const MENU = [
  'home',
  'about-us',
  'projects-work-products-publications',
  'news',
  'contact-us'
];
/********* Secondary nav setting ************************
  This maps the ids of primary menu items
*********************************************/
export const MENU_IDS = {
  16:'home',
  2:'about-us',
  257:'projects-work-products-publications',
  3:'contact-us'
};

/********* Sub Menu ************************
  This is where you add/remove entries
  to/from the submenus
*********************************************/
export const SUB_MENU= {
  'about-us': [
    'frequently-asked-questions',
    'funding',
    'organization-and-governance'
  ],
  'projects-work-products-publications': [
    'projects-work-products-publications',
    'publications'
  ]
};

export const NON_HIGHLIGHTED_FIELDS = ['sourceHref', 'href', 'category', 'homologs', 'paralogs', 'orthologs', 'homologs.symbol', 'homologs.panther_family'];
