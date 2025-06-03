import fs from 'fs';

const env = process.env.NODE_ENV;
const directory = './public';
const filename = 'robots.txt';

const PROD_CONTENT = `User-agent: *
Allow: /
Disallow: /search
Disallow: /alliancemine
Disallow: /jbrowse
Sitemap: https://www.alliancegenome.org/sitemap.xml
Sitemap: https://www.alliancegenome.org/api/sitemap.xml`;

const OTHER_CONTENT = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow: /
`;

const content = env === 'production' ? PROD_CONTENT : OTHER_CONTENT;

console.log(`writing to... ${directory}/${filename}`)
fs.writeFile(`${directory}/${filename}`, content, (err) => {
  if (err) {
    console.error('Error writing robots.txt file:', err);
  } else {
    console.log('robots.txt file written successfully');
  }
});
