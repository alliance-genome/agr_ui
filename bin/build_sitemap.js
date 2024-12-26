
var sm = require('sitemap'), fs = require('fs'), path = require('path');

var sitemapindex = sm.buildSitemapIndex({
  urls: [
    'https://www.alliancegenome.org/main-sitemap.xml'
  ]
});

fs.writeFileSync('public/sitemap.xml', sitemapindex.toString());

var sitemap = sm.createSitemap({
  hostname: 'https://www.alliancegenome.org',
  urls: [
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
    { url: '/event-calendar',    changefreq: 'monthly', priority: 0.7, lastmodrealtime: true }
  ]
});

fs.writeFileSync('public/main-sitemap.xml', sitemap.toString());
