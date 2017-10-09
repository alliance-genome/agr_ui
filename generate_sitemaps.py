'''
 Generates sitemaps for wordpress pages
'''
from os import makedirs
from os.path import isdir,isfile,join,basename
from shutil import copyfile

import datetime
today = datetime.datetime.now()
current_time=today.strftime('%Y-%m-%dT%I:%M:%S %P')

## We will make this array being fetched
## at run time from wp server using WP REST API
## But to test -- we will hardcode the pages
##
WP_PAGES={}
WP_PAGES[""]="1"
WP_PAGES["/home"]="0.1"
WP_PAGES["/about"]="0.8"
WP_PAGES["/projects"]="0.8"
WP_PAGES["/contact"]="0.8"
WP_PAGES["/posts"]="0.8"
WP_PAGES["/faq"]="0.7"
WP_PAGES["/funding"]="0.7"
WP_PAGES["/organization"]="0.7"
WP_PAGES["/publications"]="0.7"
WP_PAGES["/features"]="0.7"
WP_PAGES["/supplement"]="0.7"
WP_PAGES["/phenotypes"]="0.7"

class SiteMap:
    def __init__(self):
        self.sitemaps=[]
        self.base_url="http://www.alliancegenome.org"
        self.public_dir="src/public"

        self.wp_pages_sitemap=self.public_dir+"/wordpress-pages-sitemap.xml"
        self.sitemap_index=self.public_dir+"/sitemap.xml"

        self.sitemaps.append(self.base_url+"/wordpress-pages-sitemap.xml")
        self.sitemaps.append(self.base_url+"/api/sitemap/disease.xml")
        self.sitemaps.append(self.base_url+"/api/sitemap/gene.xml")
        
        self.set_public()

    def set_public(self):
        try:
            if not isdir(self.public_dir): makedirs(self.public_dir)
        except: raise        

    def gen_sitemap_index(self):
        try:
            if isfile(self.sitemap_index):copyfile(self.sitemap_index,self.public_dir+"/sitemap.xml.old")    
            fd=open(self.sitemap_index,'w') 
            fd.write('<?xml version="1.0" encoding="UTF-8"?>')
            fd.write("\n"+'<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
            for site_map_url in self.sitemaps:
                fd.write("\n    <sitemap>")
                fd.write("\n        <loc>"+site_map_url+"</loc>")
                fd.write("\n        <lastmod>"+current_time+"</lastmod>")
                fd.write("\n    </sitemap>")
            fd.write("\n</sitemapindex>")
            fd.close()
        except: raise

    def gen_wp_sitemap(self):
        try:
            fd=open(self.wp_pages_sitemap,'w')
            fd.write('<?xml version="1.0" encoding="UTF-8"?>')
            fd.write("\n"+'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
            for site_url,priority in WP_PAGES.items():
                fd.write("\n    <url>")
                fd.write("\n        <loc>"+self.base_url+site_url+"</loc>")
                fd.write("\n        <lastmod>"+current_time+"</lastmod>")
                fd.write("\n        <changefreq>monthly</changefreq>")
                fd.write("\n        <priority>"+priority+"</priority>")
                fd.write("\n    </url>")
            fd.write("\n</urlset>")
        except:raise 

if __name__== "__main__":
    sitemap=SiteMap()
    sitemap.gen_sitemap_index()
    sitemap.gen_wp_sitemap()



