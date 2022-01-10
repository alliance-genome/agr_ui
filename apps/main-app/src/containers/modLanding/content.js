import flybaseLogo from '../../../../../libs/shared-assets/src/lib/assets/alliance_logo_flybase.png';
import mgdLogo from '../../../../../libs/shared-assets/src/lib/assets/alliance_logo_mgd.png';
import rgdLogo from '../../../../../libs/shared-assets/src/lib/assets/alliance_logo_rgd.png';
import sgdLogo from '../../../../../libs/shared-assets/src/lib/assets/alliance_logo_sgd.png';
import wormbaseLogo from '../../../../../libs/shared-assets/src/lib/assets/alliance_logo_wormbase.png';
import zfinLogo from '../../../../../libs/shared-assets/src/lib/assets/alliance_logo_zfin.png';
import gocLogo from '../../../../../libs/shared-assets/src/lib/assets/alliance_logo_goc.png';

import style from './style.scss';

export const MODContent = {
  'wormbase': {
    about: '<p>WormBase is an international consortium of biologists and computer scientists providing the research ' +
      'community with accurate, current, accessible information concerning the genetics, genomics and biology of ' +
      '<i>C. elegans</i> and related nematodes. Founded in 2000, the WormBase Consortium is led by Paul Sternberg ' +
      '(CalTech), Matt Berriman (The Wellcome Trust Sanger Institute), Kevin Howe (EBI), and Lincoln Stein (The ' +
      'Ontario Institute for Cancer Research).' +
      '</p>' +
      '<p>' +
      'WormBase is a founding member of the Alliance of Genome Resources Project.' +
      '</p>',
    link: 'https://wormbase.org',
    modShortName: 'WormBase',
    modFullName: 'WormBase',
    modVisitButtonText: 'WormBase',
    bannerStyle: style.banner__WB,
    titleBarStyle: style.titleBar__WB,
    footerStyle: style.modFooter__WB,
    sectionStyle: style.section__WB,
    logoImgSrc: wormbaseLogo,
    hasNews: true,
    wordpressNewsBaseURL: 'https://public-api.wordpress.com/wp/v2/sites/blog.wormbase.org/posts',
    fetchNewsCount: 3,
    linkToNewsPage: 'https://blog.wormbase.org/',
    resources:
      '<p><a href="https://wormbase.org/about/userguide/nomenclature#gi9m5c264k8be0afldh71j3--10">WormBase Guidelines for Nomenclature</a></p>' +
      '<p><a href="https://wormbase.org/tools#0--10">WormBase Tools</a></p>' +
      '<p><a href="https://wormbase.org/about/userguide/submit_data#01--10">Submit Data to WormBase</a></p>' +
      '<p><a href="https://wormbase.org/about/userguide#0123456--10">WormBase User Guides</a></p>' +
      '<p><a href="https://wormbase.org/tools/support">WormBase Help Desk</a></p>' +
      '<p><a href="https://cgc.umn.edu/"><i>Caenorhabditis</i> Genetics Center</a></p>' +
      '<p><a href="http://www.wormbook.org/">WormBook</a></p>' +
      '<p><a href="https://www.wormatlas.org/">WormAtlas</a></p>' +
      '<p><a href="http://nematode.net/NN3_frontpage.cgi">Nematode.net</a></p>' +
      '<p><a href="http://www.nematodes.org/">Nematodes.org</a></p>' +
      '<p><a href="https://www.micropublication.org/">microPublication</a></p>' +
      '<p><a href="https://parasite.wormbase.org/">ParaSite</a></p>',
    footer: [
      ['Citing WormBase',	                               'https://wormbase.org/about/citing_wormbase#012--10'],
      ['WormBase Forum',                                       'https://community.alliancegenome.org/c/model-organism-worms/7'],
      ['<i class="fa fa-fw fa-twitter"></i> @wormbase',        'https://twitter.com/wormbase'],
      ['WormBase Release Schedule',                            'https://wormbase.org/about/release_schedule#01--10'],
      ['Worm Labs',                                            'https://wormbase.org/resources/laboratory#012--10)'],
      ['<i class="fa fa-fw fa-youtube"></i> WormBase YouTube', 'https://www.youtube.com/user/WormBaseHD'],
      ['WormBase Copyright',                                   'https://wormbase.org/about/policies#2--10'], 
      ['WormBase Developer Documentation',                     'https://wormbase.org/about/userguide/for_developers#012345--10'],
      ['',                                                     ''],
      ['WormBase FAQ',                                         'https://wormbase.org/about/Frequently_asked_questions#5d39afc2687b4e01--10'],
      ['WormBase FTP Downloads',                               'ftp://ftp.wormbase.org/pub/wormbase/']
    ],
//     footerNote:
//       'WormBase is supported by grant #24 HG002223 from the National Human Genome Research Institute,' +
//       ' the UK Medical Research Council and the UK Biotechnology and Biological Sciences Research Council.',
  },
  'sgd': {
    about: '<p>The Saccharomyces Genome Database (SGD) provides comprehensive integrated biological information for the ' +
      'budding yeast <i>Saccharomyces cerevisiae</i> along with search and analysis tools to explore these data, ' +
      'enabling the discovery of functional relationships between sequence and gene products in fungi and higher ' +
      'organisms.' +
      '</p>' +
      '<p>' +
      'SGD is a founding member of the Alliance of Genome Resources Project.' +
      '</p>',
    link: 'https://www.yeastgenome.org',
    modShortName: 'SGD',
    modFullName: '<i>Saccharomyces</i> Genome Database',
    modVisitButtonText: 'SGD',
    bannerStyle: style.banner__SGD,
    titleBarStyle: style.titleBar__SGD,
    footerStyle: style.modFooter__SGD,
    sectionStyle: style.section__SGD,
    logoImgSrc: sgdLogo,
    hasNews: true,
    wordpressNewsBaseURL: 'https://public-api.wordpress.com/rest/v1.1/sites/yeastgenomeblog.wordpress.com/posts/',
    fetchNewsCount: 3,
    linkToNewsPage: 'https://yeastgenomeblog.wordpress.com/',
    resources:
      '<p><a href="https://www.yeastgenome.org/search?q=&is_quick=true">Search SGD</a></p>' +
      '<p><a href="https://yeastmine.yeastgenome.org/yeastmine/begin.do">Search and Retrieve Yeast Data</a></p>' +
      '<p><a href="https://wiki.yeastgenome.org/index.php/Main_Page">Access SGD Community Information</a></p>' +
      '<p><a href="https://www.yeastgenome.org/genomesnapshot">SGD Genome and Annotation Summary</a></p>' +
      '<p><a href="https://www.yeastgenome.org/submitData">Submit Data to SGD</a></p>' +
      '<p><a href="https://www.yeastgenome.org/reference/recent">New Yeast Papers</a></p>' +
      '<p><a href="https://sites.google.com/view/yeastgenome-help/about/how-to-cite-sgd?authuser=0">How to cite SGD</a></p>' +
      '<p><a href="https://sites.google.com/view/yeastgenome-help/sgd-general-help">General SGD Help</a></p>' +
      '<p><a href="https://sites.google.com/view/yeastgenome-help/community-help/gene-registry">SGD Gene Registry</a></p>' +
      '<p><a href="https://www.yeastgenome.org/blast-sgd">SGD BLAST</a></p>',
    footer: [
      ['About SGD',                                         'https://sites.google.com/view/yeastgenome-help/about'],
      ['Stanford University',                               'https://www.stanford.edu/'],
      ['<i class="fa fa-fw fa-twitter"></i> @yeastgenome',  'https://twitter.com/yeastgenome'],
      ['SGD Blog',                                          'https://www.yeastgenome.org/blog'],
      ['Stanford Privacy Policy',                           'https://www.stanford.edu/site/privacy/'],
      ['<i class="fa fa-fw fa-facebook"></i> @yeastgenome', 'https://www.facebook.com/yeastgenome'],
      ['SGD Help',                                          'https://sites.google.com/view/yeastgenome-help/sgd-general-help'], 
      ['Stanford Genetics Dept',                            'https://med.stanford.edu/genetics.html'],
      ['<i class="fa fa-fw fa-youtube"></i> SGD YouTube',   'https://www.youtube.com/SaccharomycesGenomeDatabase'],
      ['Download SGD Data',                                 'http://sgd-archive.yeastgenome.org/'],
      // Stanford copyright statement: © Stanford University, Stanford, CA 94305.
      ['CC BY 4.0',                                         'https://creativecommons.org/licenses/by/4.0/'],
      // CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/) creative commons license; if possible link from the image (see SGD)
      // ['<img src="https://www.encodeproject.org/static/img/su-logo-white-2x.png" height="46px" />',                                               'https://www.stanford.edu/'],
      ['<i class="fa fa-fw fa-linkedin"></i> SGD LinkedIn', 'https://www.linkedin.com/company/saccharomyces-genome-database'],
    ],
  },
  'zfin': {
    about: '<p>The Zebrafish Information Network (ZFIN) is the database of genetic and genomic data for the zebrafish ' +
      '(<i>Danio rerio</i>) as a model organism. ZFIN provides a wide array of expertly curated, organized and ' +
      'cross-referenced Zebrafish research data.' +
      '</p>' +
      '<p>ZFIN is a founding member of the Alliance of Genome Resources Project.</p>',
    link: 'https://www.zfin.org',
    modShortName: 'ZFIN',
    modFullName: 'Zebrafish Information Network',
    modVisitButtonText: 'ZFIN',
    bannerStyle: style.banner__ZFIN,
    titleBarStyle: style.titleBar__ZFIN,
    footerStyle: style.modFooter__ZFIN,
    sectionStyle: style.section__ZFIN,
    logoImgSrc: zfinLogo,
    hasNews: true,
    newsURL: 'https://zfin.atlassian.net/wiki/spaces/news/overview',
    resources:
      '<p><a href="https://zfin.org/search?category=&q=">Search and Retrieve Zebrafish Data</a></p>' +
      '<p><a href="https://zfin.org/action/expression/search">ZFIN Gene Expression Data / Images</a></p>' +
      '<p><a href="https://zfin.org/action/fish/search">ZFIN Mutants / Transgenics / Phenotypes</a></p>' +
      '<p><a href="https://zfin.org/action/antibody/search">ZFIN Antibodies</a></p>' +
      '<p><a href="https://zfin.org/action/blast/blast">ZFIN BLAST</a></p>' +
      '<p><a href="https://zfin.org/action/publication/search">Zebrafish Publications</a></p>' +
      '<p><a href="https://zfin.org/action/submit-data">Submit Data to ZFIN</a></p>' +
      '<p><a href="https://zfin.org/zf_info/zfbook/zfbk.html">Zebrafish Book</a></p>' +
      '<p><a href=" https://zebrafish.org/home/guide.php">Zebrafish International Resource Center</a></p>' +
      '<p><a href="https://zfin.org/action/profile/person/search">ZFIN Person Search</a></p>',
    footer: [
      ['Anatomy / GO / Human Disease',                     'https://zfin.org/action/ontology/search'],
      ['ZFIN Downloads',                                   'https://zfin.org/downloads'],
      ['Citing ZFIN',                                      'https://zfin.atlassian.net/wiki/spaces/general/pages/1891415775/ZFIN+Database+Information'],
      ['Zebrafish Anatomy Atlases and Resources',          'https://zfin.atlassian.net/wiki/spaces/general/pages/1892876451/Anatomy+Atlases+and+Resources'],
      ['ZFIN Glossary',                                    'https://zfin.org/zf_info/glossary.html'],
      ['Contact ZFIN',                                     'https://zfin.atlassian.net/wiki/spaces/general/pages/1891412324/ZFIN+Contact+Information'],
      ['ZFIN Genome Browser',                              'https://zfin.org/action/gbrowse/'],
      ['Author Guidelines',                                'https://zfin.org/zf_info/author_guidelines.html'],
      ['<i class="fa fa-fw fa-twitter"></i> @ZFINmod',     'https://twitter.com/ZFINmod'],
      ['Zebrafish Laboratory Search',                      'https://zfin.org/action/profile/lab/search'],
      ['ZFIN Help and Tips',                               'https://zfin.atlassian.net/wiki/spaces/general/pages/1919656548/ZFIN+Tips'],
      ['<i class="fa fa-fw fa-youtube"></i> ZFIN YouTube', 'https://www.youtube.com/channel/UCPR_QDNX8DetI9Sfk3P08sg'],
    ],
  },
  'flybase': {
    about: '<p>FlyBase (flybase.org) is an essential online database for researchers using <i>Drosophila melanogaster</i> ' +
      'as a model organism, facilitating access to a diverse array of information that includes genetic, molecular, ' +
      'genomic and reagent resources.</p>' +
      '<p>FlyBase is a founding member of the Alliance of Genome Resources Project.</p>',
    link: 'https://www.flybase.org',
    modShortName: 'FlyBase',
    modFullName: 'FlyBase',
    modVisitButtonText: 'FlyBase',
    bannerStyle: style.banner__FB,
    titleBarStyle: style.titleBar__FB,
    sectionStyle: style.section__FB,
    footerStyle: style.modFooter__FB,
    logoImgSrc: flybaseLogo,
    hasNews: true,
    flybaseNewsAPI: 'https://flybase.org/api/news?limit=3',
    fetchNewsCount: 3,
    newsURL: 'https://flybase.org/commentaries',
    resources:
      '<p><a href="https://flybase.org/">Search</a></p>' +
      '<p><a href="https://flybase.org/blast/">FlyBase BLAST</a></p>' +
      '<p><a href="https://flybase.org/jbrowse/?data=data/json/dmel">FlyBase JBrowse</a></p>' +
      '<p><a href="https://flybase.org/rnaseq/rnaseq">Fly RNA-Seq</a></p>' +
      '<p><a href="https://flybase.org/vocabularies">Fly Vocabularies</a></p>' +
      '<p><a href="https://flybase.org/convert/id">Fly ID Validator</a></p>' +
      '<p><a href="https://flybase.org/batchdownload">Fly Batch Download</a></p>' +
      '<p><a href="https://flybase.org/submission/publication/">Fast-Track Your Paper</a></p>',
    footer: [
      ['FlyBase Support',                                     'https://flybase.org/wiki/FlyBase:About#FlyBase_Support'],
      ['Copyright Statement',                                 'https://flybase.org/wiki/FlyBase:About#FlyBase_Copyright'],
      ['<i class="fa fa-fw fa-twitter"></i> @FlyBaseDotOrg',  'https://twitter.com/FlyBaseDotOrg'],
      ['Contact FlyBase',                                     'https://flybase.org/contact/email'],
      ['Cite FlyBase',                                        'https://flybase.org/wiki/FlyBase:About#Citing_FlyBase'],
      ['<i class="fa fa-fw fa-youtube"></i> FlyBase YouTube', 'https://www.youtube.com/c/FlyBaseTV'],
    ],
  },
  'rgd': {
    about: '<p>The Rat Genome Database (RGD) is the primary site for genetic, genomic, phenotype, and disease-related ' +
      'data generated from rat research. The data is the result of both manual curation work by RGD curators and ' +
      'imported data from other databases through custom ELT (Extract, Load and Transform) pipelines. RGD has ' +
      'expanded to include structured and standardized data for additional species (human, mouse, chinchilla, ' +
      'bonobo, 13-lined ground squirrel, dog and pig). RGD also offers a growing suite of innovative tools for ' +
      'querying, analyzing and visualizing this data making it a valuable resource for researchers worldwide.</p>' +
      '<p>RGD is a founding member of the Alliance of Genome Resources Project.</p>',
    link: 'https://rgd.mcw.edu/',
    modShortName: 'RGD',
    modFullName: 'Rat Genome Database',
    modVisitButtonText: 'RGD',
    bannerStyle: style.banner__RGD,
    titleBarStyle: style.titleBar__RGD,
    sectionStyle: style.section__RGD,
    footerStyle: style.modFooter__RGD,
    logoImgSrc: rgdLogo,
    hasNews: true,
    newsURL: 'https://rgd.mcw.edu/wg/news2/',
    resources:
      '<p><a href="https://rgd.mcw.edu/rgdweb/search/genes.html">RGD Gene Search</a></p>' +
      '<p><a href="https://rgd.mcw.edu/rgdweb/search/strains.html">RGD Strain search</a></p>' +
      '<p><a href="https://rgd.mcw.edu/rgdweb/models/allModels.html">Rat Genetic Models</a></p>' +
      '<p><a href="https://rgd.mcw.edu/QueryBuilder/">OntoMate Literature Search</a></p>' +
      '<p><a href="https://rgd.mcw.edu/rgdweb/portal/index.jsp">RGD Disease Portals</a></p>' +
      '<p><a href="https://rgd.mcw.edu/rgdweb/front/config.html">RGD Variant Visualizer</a></p>' +
      '<p><a href="https://rgd.mcw.edu/rgdweb/enrichment/start.html">Multi-Ontology Enrichment Tool (MOET)</a></p>' +
      '<p><a href="https://rgd.mcw.edu/rgdweb/generator/list.html">Object List Generator & Analyzer (OLGA)</a></p>' +
      '<p><a href="https://rgd.mcw.edu/rgdweb/ontology/search.html">RGD Ontology Browser and Search</a></p>' +
      '<p><a href="https://rgd.mcw.edu/rgdweb/contact/contactus.html">RGD User Support</a></p>',
    footer: [
      ['RGD Downloads',                                           'https://download.rgd.mcw.edu/data_release'],
      ['RGD REST API',                                            'https://rest.rgd.mcw.edu/rgdws/swagger-ui.html'],
      ['<i class="fa fa-fw fa-twitter"></i> @ratgenome',          'https://twitter.com/ratgenome'],
      ['About RGD', 	                                          'https://rgd.mcw.edu/wg/about-us'],
      ['Citing RGD', 	                                          'https://rgd.mcw.edu/wg/citing-rgd/'],
      ['<i class="fa fa-fw fa-facebook"></i> @RatGenomeDatabase', 'https://www.facebook.com/RatGenomeDatabase'],
      ['Contact RGD',                                             'https://rgd.mcw.edu/rgdweb/contact/contactus.html'],
      ['RGD Help',   	                                          'https://rgd.mcw.edu/wg/help3/'],
      ['<i class="fa fa-fw fa-github"></i> RGD GitHub',           'https://github.com/rat-genome-database'],
    ],
  },
  'mgd': {
    about: '<p>The Mouse Genome Database (MGD) is the community model organism database for the laboratory mouse ' +
    'and is the primary source of expertly curated function and phenotype annotations for the mouse genome ' +
    'and mouse models of human disease.</p>' +
    '<p>MGD is a core database in the Mouse Genome Informatics (MGI) consortium and founding member of the ' +
    'Alliance of Genome Resources Project.</p>',
    link: 'http://www.informatics.jax.org/',
    modShortName: 'MGD',
    modFullName: 'Mouse Genome Database',
    modVisitButtonText: 'MGI',
    bannerStyle: style.banner__MGD,
    titleBarStyle: style.titleBar__MGD,
    sectionStyle: style.section__MGD,
    footerStyle: style.modFooter__MGD,
    logoImgSrc: mgdLogo,
    hasNews: true,
    newsURL: 'http://www.informatics.jax.org/mgihome/news/whatsnew.shtml',
    resources:
      '<p><a href="http://www.informatics.jax.org/genes.shtml">Mouse Genes</a></p>' +
      '<p><a href="http://www.informatics.jax.org/phenotypes.shtml">Mouse Phenotypes & Mutant Alleles</a></p>' +
      '<p><a href="http://www.informatics.jax.org/humanDisease.shtml">Mouse-Human: Disease Connection</a></p>' +
      '<p><a href="http://www.informatics.jax.org/expression.shtml">Gene Expression Database (GXD)</a></p>' +
      '<p><a href="http://www.informatics.jax.org/home/recombinase">Recombinase (cre)</a></p>' +
      '<p><a href="http://www.informatics.jax.org/function.shtml">Mouse Function</a></p>' +
      '<p><a href="http://www.informatics.jax.org/home/strain.shtml">Mouse Strains & SNPs</a></p>' +
      '<p><a href="http://tumor.informatics.jax.org/mtbwi/index.do">Mouse Models of Human Cancer</a></p>' +
      '<p><a href="https://www.jax.org/mgi-coronavirus-info">Mouse Models for Coronavirus Research</a></p>' +
      '<p><a href="http://www.mousemine.org/mousemine/begin.do">MouseMine</a></p>' +
      // '<p><a href="http://www.findmice.org/index.jsp">International Mouse Strain Resource (IMSR)</a></p>' +
      '<p><a href="http://www.informatics.jax.org/mgihome/support/mgi_inbox.shtml">MGI User Support</a></p>',
      footer: [
        ['Citing MGI Resources',                                  'http://www.informatics.jax.org/mgihome/other/citation.shtml'],
        ['MGI Funding Information',                               'http://www.informatics.jax.org/mgihome/other/mgi_funding.shtml'],
        ['<i class="fa fa-fw fa-twitter"></i> @mgi_mouse',        'https://twitter.com/mgi_mouse'],
        ['MGI Warranty Disclaimer and Copyright Notice',          'http://www.informatics.jax.org/mgihome/other/copyright.shtml'],
        ['',                                                      ''],
        ['<i class="fa fa-fw fa-facebook"></i> @mgi.informatics', 'https://www.facebook.com/mgi.informatics'],
      ],
  },
  'goc': {
    about: '<p>The mission of the GO Consortium is to develop a comprehensive, computational model of biological systems, ' +
        'ranging from the molecular to the organism level, across the multiplicity of species in the tree of life.</p>' +
        '<p>The Gene Ontology (GO) knowledgebase is the world’s largest source of information on the functions of genes. ' +
        'This knowledge is both human-readable and machine-readable, and is a foundation for computational analysis of ' +
        'large-scale molecular biology and genetics experiments in biomedical research.</p>' +
        '<p>GOC is a founding member of the Alliance of Genome Resources Project.</p>',
    link: 'http://geneontology.org/',
    modShortName: 'GOC',
    modFullName: 'Gene Ontology Consortium',
    modVisitButtonText: 'GOC',
    bannerStyle: style.banner__GO,
    titleBarStyle: style.titleBar__GO,
    sectionStyle: style.section__GO,
    footerStyle: style.modFooter__GO,
    logoImgSrc: gocLogo,
    hasNews: true,
    newsURL: 'https://twitter.com/news4go',
    resources:
      '<p><a href="http://pantherdb.org/">PANTHER Enrichment Analysis</a></p>' +
      '<p><a href="http://release.geneontology.org/">GO Release Archive</a></p>' +
      '<p><a href="http://amigo.geneontology.org/amigo">AmiGO</a></p>' +
      '<p><a href="http://api.geneontology.org">GO API</a></p>' +
      '<p><a href="http://geneontology.org/docs/ontology-documentation/">About the Ontology</a></p>' +
      '<p><a href="http://geneontology.org/docs/go-annotations/">About GO Annotations</a></p>' +
      '<p><a href="http://geneontology.org/docs/tools-overview/">GO Tools Overview</p>' +
      '<p><a href="http://geneontology.org/docs/faq/">GO FAQ</a></p>' +
      '<p><a href="https://link.springer.com/book/10.1007%2F978-1-4939-3743-1">The Gene Ontology Handbook</a></p>',
      // '<p><a href="http://geneontology.org/docs/gocam-overview/">GO-CAM overview</a></p>' +
      // '<p><a href="https://geneontology.cloud/home">User interface to browse GO-CAMs</a></p>' +
      // '<p><a href="http://geneontology.org/docs/download-mappings/">Cross-references to external classification systems</a></p>' +
      // '<p><a href="http://geneontology.org/docs/contributing-to-go-terms/">Contributing to the ontology</a></p>',
    footer: [
      ['GO Helpdesk',                                              'https://help.geneontology.org/'],
      ['Current GO release',                                       'http://current.geneontology.org/'],
      ['<i class="fa fa-fw fa-twitter"></i> @News4GO',             'https://twitter.com/news4go'],
      ['GO Citation Policy & License',                             'http://geneontology.org/docs/go-citation-policy/'],
      ['',                                                         ''],
      ['<i class="fa fa-fw fa-facebook"></i> @geneontology',       'https://www.facebook.com/geneontology'],
      ['GO Funding Information',                                   'https://reporter.nih.gov/project-details/9209989'],
      ['',                                                         ''],
      ['<i class="fa fa-fw fa-github"></i> geneontology/helpdesk', 'https://github.com/geneontology/helpdesk/discussions'],
    ],
  }
}
