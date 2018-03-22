export const SEARCH_API_ERROR_MESSAGE = 'There was a problem connecting to the server. Please refresh the page.  If you continue to see this message, please contact alliance-software@lists.stanford.edu';
export const LARGE_COL_CLASS = 'col-sm-8 col-md-8 col-xs-12';
export const SMALL_COL_CLASS = 'col-sm-4 col-md-4 col-xs-12';

/* Wordpress REST API connection setting */
export const WORDPRESS_REST_API_BASE = 'https://public-api.wordpress.com/wp/v2/sites/alliancegenome.wordpress.com';
export const WORDPRESS_PAGE_BASE_URL = WORDPRESS_REST_API_BASE + '/pages?slug=';
export const WORDPRESS_POST_BASE_URL = WORDPRESS_REST_API_BASE + '/posts';
export const WORDPRESS_POST_URL = WORDPRESS_POST_BASE_URL + '?slug=';
/* Maximum number of posts to display on the News and Events page */
export const WORDPRESS_POST_MAX_COUNT = 10;
export const WORDPRESS_PATH = '';
export const WORDPRESS_POST_PATH = '/posts';

//the order in this array matters for the category icons
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
  },
  {
    name: 'allele',
    displayName: 'Allele'
  }
];

/**********  Wordpress Pages *************
 An entry is added to this constant each
 time a new static page that's part of the
 menu or sub-menu  is created/published in
 wordpress

 Fields Definition:
 1) label: Used in the site  menu/sub menu
 2) slug: Wordpress slug for this page
 3) path: Used for Portal router
 ******************************************/

export const WORDPRESS_PAGES = {
  home: {
    label: 'Home',
    slug: 'home'
  },
  'about-us': {
    label: 'About Us',
    slug: 'about-us'
  },
  'projects-work-products-publications': {
    label: 'Work Products',
    slug: 'projects-work-products-publications'
  },
  'contact-us': {
    label: 'Contact Us',
    slug: 'contact-us'
  },
  'frequently-asked-questions': {
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
  publications: {
    label: 'Publications',
    slug: 'publications'
  },
  'administrative-supplement': {
    label: 'Administrative Supplement',
    slug: 'administrative-supplement'
  },
  'genome-features': {
    label: 'Genome Features',
    slug: 'genome-features',
  },
  orthology: {
    label: 'Orthology',
    slug: 'orthology'
  },
  'phenotypes-and-disease-models': {
    label: 'Phenotypes And Disease Models',
    slug: 'phenotypes-and-disease-models'
  },
  news: {
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
  16: 'home',
  2: 'about-us',
  257: 'projects-work-products-publications',
  3: 'contact-us'
};

/********* Sub Menu ************************
 This is where you add/remove entries
 to/from the submenus
 *********************************************/
export const SUB_MENU = {
  'about-us': [
    'frequently-asked-questions',
    'funding',
    'organization-and-governance',
    'publications'
  ],
  'projects-work-products-publications': [
    'administrative-supplement',
    'genome-features',
    'orthology',
    'phenotypes-and-disease-models'
  ]
};

export const NON_HIGHLIGHTED_FIELDS = ['sourceHref', 'href', 'category', 'homologs', 'paralogs', 'orthologs', 'homologs.symbol', 'homologs.panther_family'];

export const HELP_EMAIL = 'alliance-helpdesk@lists.stanford.edu';

/**
 * collapsible menu: MenuItems
 */
export const NAV_MENU = {
  home: {
    id: 1,
    label: 'Home',
    slug: 'home',
    sub: undefined
  },
  'about-us': {
    id: 2,
    label: 'About Us',
    slug: 'about-us',
    sub: {
      'frequently-asked-questions': {
        id: 5,
        label: 'Frequently Asked Questions',
        slug: 'frequently-asked-questions'
      },
      'funding': {
        id: 6,
        label: 'Funding',
        slug: 'funding'
      },
      'organization-and-governance': {
        id: 7,
        label: 'Organization and Governance',
        slug: 'organization-and-governance'
      },
      'publications': {
        id: 8,
        label: 'Publications',
        slug: 'publications',
      }
    }
  },
  'projects-work-products-publications': {
    id: 3,
    label: 'Work Products',
    slug: 'projects-work-products-publications',
    sub: {
      'administrative-supplement': {
        id: 9,
        label: 'Administrative Supplement',
        slug: 'administrative-supplement'
      },
      'genome-features':{
        id: 10,
        label: 'Genome Features',
        slug: 'genome-features'
      },
      'orthology':{
        id: 11,
        label: 'Orthology',
        slug: 'orthology'
      },
      'phenotypes-and-disease-models':{
        id: 12,
        label: 'Phenotypes And Disease Models',
        slug: 'phenotypes-and-disease-models'
      }
    }
  },
  'contact-us': {
    id: 4,
    label: 'Contact Us',
    slug: 'contact-us',
    sub: undefined
  },
  news:{
    id: 13,
    label: 'News & Events',
    slug: 'news',
    sub: undefined
  },
  posts:{
    id: 131,
    label: 'News & Events',
    slug: 'news',
    sub: undefined
  }
};
