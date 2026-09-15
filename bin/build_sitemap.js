import { simpleSitemapAndIndex } from 'sitemap';
import { data as portalData, isRootPortal } from '../src/containers/diseasePortal/portalData.js';
import { NAV_MENU } from '../src/constants.js';

// derived from portalData so a new portal is indexed without anyone remembering this file
const diseasePortalUrls = Object.entries(portalData)
  .filter(([, portal]) => !isRootPortal(portal))
  .map(([slug]) => ({
    url: `/disease-portal/${slug}`,
    changefreq: 'monthly',
    priority: 0.7,
    lastmodrealtime: true,
  }));

// likewise from the nav, so a new MOD landing page is indexed with no second edit
const memberUrls = (NAV_MENU.find((section) => section.label === 'Members')?.sub ?? []).map(({ route }) => ({
  url: route,
  changefreq: 'monthly',
  priority: 0.7,
  lastmodrealtime: true,
}));

simpleSitemapAndIndex({
  hostname: 'https://www.alliancegenome.org',
  destinationDir: './public/',
  gzip: false,
  sourceData: [
    { url: '/', changefreq: 'monthly', priority: 0.1, lastmodrealtime: true },
    { url: '/about-us', changefreq: 'monthly', priority: 0.8, lastmodrealtime: true },
    { url: '/contact-us', changefreq: 'monthly', priority: 0.8, lastmodrealtime: true },
    { url: '/cite-us', changefreq: 'monthly', priority: 0.8, lastmodrealtime: true },
    { url: '/frequently-asked-questions', changefreq: 'monthly', priority: 0.8, lastmodrealtime: true },
    { url: '/release-notes', changefreq: 'monthly', priority: 0.8, lastmodrealtime: true },
    { url: '/funding', changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/organization-and-governance', changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/privacy-warranty-licensing', changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/publications', changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/genome-features', changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/administrative-supplement', changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/phenotypes-and-disease-models', changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/submit-data', changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/textpresso', changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/event-calendar', changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/blast', changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    // app routes; /search is left out on purpose, and /ontology redirects so its target is listed
    { url: '/disease-portal', changefreq: 'monthly', priority: 0.8, lastmodrealtime: true },
    ...diseasePortalUrls,
    { url: '/ontology/disease', changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/downloads', changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/news', changefreq: 'weekly', priority: 0.7, lastmodrealtime: true },
    { url: '/blastservice', changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    ...memberUrls,
  ],
});
