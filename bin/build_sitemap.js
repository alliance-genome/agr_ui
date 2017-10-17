
var sm = require('sitemap'), fs = require('fs');


var sitemapindex = sm.buildSitemapIndex({
    urls: [
          'http://www.alliancegenome.org/main-sitemap.xml',
          'http://www.alliancegenome.org/api/sitemap.xml'
    ]
});

fs.writeFileSync("dist/sitemap.xml", sitemapindex.toString());

var sitemap = sm.createSitemap({
    hostname: 'http://www.alliancegenome.org',
    urls: [
        { url: '/' ,             changefreq: 'monthly', priority: 0.1, lastmodrealtime: true },
        { url: '/about',         changefreq: 'monthly', priority: 0.8, lastmodrealtime: true },
        { url: '/contact',       changefreq: 'monthly', priority: 0.8, lastmodrealtime: true },
        { url: '/faq',           changefreq: 'monthly', priority: 0.8, lastmodrealtime: true },
        { url: '/funding',       changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
        { url: '/organization',  changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
        { url: '/publications',  changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
        { url: '/features',      changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
        { url: '/supplement',    changefreq: 'monthly', priority: 0.7, lastmodrealtime: true },
        { url: '/phenotypes',    changefreq: 'monthly', priority: 0.7, lastmodrealtime: true }
    ]
});

fs.writeFileSync("dist/main-sitemap.xml", sitemap.toString());
