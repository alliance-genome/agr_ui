import { simpleSitemapAndIndex } from 'sitemap';
import fs from 'fs';

simpleSitemapAndIndex({
  hostname: 'https://www.alliancegenome.org',
  destinationDir: './public/',
  gzip: false,
  sourceData: [
    { url: '/' ,             changefreq: 'monthly', priority: 0.1, lastmodrealtime: true },
    { url: '/about-us',         changefreq: 'monthly', priority: 0.8, lastmodrealtime: true },
    { url: '/contact-us',       changefreq: 'monthly', priority: 0.8, lastmodrealtime: true },
    { url: '/cite-us',       changefreq: 'monthly', priority: 0.8, lastmodrealtime: true },
    { url: '/frequently-asked-questions',           changefreq: 'monthly', priority: 0.8, lastmodrealtime: true },
    { url: '/release-notes',    changefreq: 'monthly', priority: 0.8, lastmodrealtime: true },
    { url: '/funding',       changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/organization-and-governance',  changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/privacy-warranty-licensing',  changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/publications',  changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/genome-features',      changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/administrative-supplement',    changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/phenotypes-and-disease-models',    changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/submit-data',    changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/textpresso',    changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/event-calendar',    changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
    { url: '/blast',    changefreq: 'monthly', priority: 0.7, lastmodrealtime: true }
  ]
}).then(() => {
  fs.rename('./public/sitemap-0.xml', './public/main-sitemap.xml', console.error);
  fs.rename('./public/sitemap-index.xml', './public/sitemap.xml', console.error);
});
