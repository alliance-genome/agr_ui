import flybaseLogo from '../../assets/images/alliance_logo_flybase.png';
import mgdLogo from '../../assets/images/alliance_logo_mgd.png';
import rgdLogo from '../../assets/images/alliance_logo_rgd.png';
import sgdLogo from '../../assets/images/alliance_logo_sgd.png';
import wormbaseLogo from '../../assets/images/alliance_logo_wormbase.png';
import zfinLogo from '../../assets/images/alliance_logo_zfin.png';
import gocLogo from '../../assets/images/alliance_logo_goc.png';
import zenbaseLogo from '../../assets/images/alliance_logo_xenbase.png';


import style from './style.module.scss';

export const MODContent = {
  'wormbase': {
    about: '<p>WormBase is an international consortium of biologists and computer scientists providing the research ' +
      'community with accurate, current, accessible information concerning the genetics, genomics and biology of ' +
      '<i>C. elegans</i> and related nematodes. Founded in 2000, the WormBase Consortium is led by ' +
      '<a href="https://wormbase.org/resources/person/WBPerson625#02--10" target="_blank">Paul Sternberg</a> ' +
      '(California Institute of Technology), ' +
      '<a href="https://wormbase.org/resources/person/WBPerson6308#02--10" target="_blank">Matt Berriman</a> ' +
      '(Institute of Infection, Immunity and Inflammation, University of Glasgow), ' +
      '<a href="https://wormbase.org/resources/person/WBPerson57242#02--10" target="_blank">Sarah Dyer</a> ' +
      '(European Molecular Biology Laboratory-European Bioinformatics Institute), and ' +
      '<a href="https://wormbase.org/resources/person/WBPerson1482#02--10" target="_blank">Lincoln Stein</a> ' +
      '(The Ontario Institute for Cancer Research).' +
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
    hasMeetings: true,
    meetingsURL: 'https://wormbase.org//#012-43-5',
    hasNews: true,
    wordpressNewsBaseURL: 'https://public-api.wordpress.com/wp/v2/sites/blog.wormbase.org/posts',
    fetchNewsCount: 3,
    linkToNewsPage: 'https://blog.wormbase.org/',
    search: [
      ['<i>C. elegans</i>', '/search?species=Caenorhabditis elegans&category=gene'],
    ],
    resources: [
      ['WormBase Guidelines for Nomenclature',  'https://wormbase.org/about/userguide/nomenclature#gi9m5c264k8be0afldh71j3--10'],
      ['WormBase Tools',                        'https://wormbase.org/tools#0--10'],
      ['Submit Data to WormBase',               'https://wormbase.org/about/userguide/submit_data#01--10'],
      ['WormBase User Guides',                  'https://wormbase.org/about/userguide#0123456--10'],
      ['WormBase Help Desk',                    'https://wormbase.org/tools/support'],
      ['WormBase ParaSite',                     'https://parasite.wormbase.org/'],
      ['<i>Caenorhabditis</i> Genetics Center', 'https://cgc.umn.edu/'],
      ['WormBook',                              'http://www.wormbook.org/'],
      ['WormAtlas',                             'https://www.wormatlas.org/'],
      ['Nematode.net',                          'http://nematode.net/NN3_frontpage.cgi'],
      ['Nematodes.org',                         'http://www.nematodes.org/'],
      ['microPublication',                      'https://www.micropublication.org/'],
      ['WormWiring',                            'https://www.wormwiring.org/'],
      ['<i>more resources...</i>',              'https://wormbase.org/resources#234--10'],
    ],
    footer: [
      ['',            'Citing WormBase',	                  'https://wormbase.org/about/citing_wormbase#012--10'],
      ['',            'WormBase Forum',                     'https://community.alliancegenome.org/c/model-organism-worms/7'],
      ['x-twitter',   ' @wormbase',                         'https://twitter.com/wormbase'],
      ['',            'WormBase Release Schedule',          'https://wormbase.org/about/release_schedule#01--10'],
      ['',            'Worm Labs',                          'https://wormbase.org/resources/laboratory#012--10)'],
      ['youtube',     ' WormBase YouTube',                  'https://www.youtube.com/user/WormBaseHD'],
      ['',            'WormBase Copyright',                 'https://wormbase.org/about/policies#2--10'],
      ['',            'WormBase Developer Documentation',   'https://wormbase.org/about/userguide/for_developers#012345--10'],
      ['',            '',                                   ''],
      ['',            'WormBase FAQ',                       'https://wormbase.org/about/Frequently_asked_questions#5d39afc2687b4e01--10'],
      ['',            'WormBase FTP Downloads',             'ftp://ftp.wormbase.org/pub/wormbase/']
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
    hasMeetings: true,
    googleapisMeetingsBaseURL: 'https://www.googleapis.com/calendar/v3/calendars/mhv058nk936st3jd3qjernajdk@group.calendar.google.com/events?key=AIzaSyDXypHUsRcWWBx2UClUV_wrag8TIlNYbSc',
    linkToMeetingsPage: 'https://www.yeastgenome.org/',
    fetchMeetingsCount: 3,
    hasNews: true,
    wordpressNewsBaseURL: 'https://public-api.wordpress.com/rest/v1.1/sites/yeastgenomeblog.wordpress.com/posts/',
    fetchNewsCount: 3,
    linkToNewsPage: 'https://yeastgenomeblog.wordpress.com/',
    search: [
      ['<i>S. cerevisiae</i>', '/search?species=Saccharomyces cerevisiae&category=gene'],
    ],
    resources: [
      ['Search SGD',                        'https://www.yeastgenome.org/search?q=&is_quick=true'],
      ['Search and Retrieve Yeast Data',    'https://yeastmine.yeastgenome.org/yeastmine/begin.do'],
      ['Access SGD Community Information',  'https://wiki.yeastgenome.org/index.php/Main_Page'],
      ['SGD Genome and Annotation Summary', 'https://www.yeastgenome.org/genomesnapshot'],
      ['Submit Data to SGD',                'https://www.yeastgenome.org/submitData'],
      ['New Yeast Papers',                  'https://www.yeastgenome.org/reference/recent'],
      ['How to cite SGD',                   'https://sites.google.com/view/yeastgenome-help/about/how-to-cite-sgd?authuser=0'],
      ['General SGD Help',                  'https://sites.google.com/view/yeastgenome-help/sgd-general-help'],
      ['SGD Gene Registry',                 'https://sites.google.com/view/yeastgenome-help/community-help/gene-registry'],
      ['SGD BLAST',                         'https://www.yeastgenome.org/blast-sgd'],
      ['microPublication',                  'https://www.micropublication.org/'],
    ],
    footer: [
      ['',            'About SGD',                  'https://sites.google.com/view/yeastgenome-help/about'],
      ['',            'Stanford University',        'https://www.stanford.edu/'],
      ['x-twitter',   ' @yeastgenome',              'https://twitter.com/yeastgenome'],
      ['',            'SGD Blog',                   'https://www.yeastgenome.org/blog'],
      ['',            'Stanford Privacy Policy',    'https://www.stanford.edu/site/privacy/'],
      ['facebook-f',  ' @yeastgenome',              'https://www.facebook.com/yeastgenome'],
      ['',            'SGD Help',                   'https://sites.google.com/view/yeastgenome-help/sgd-general-help'],
      ['',            'Stanford Genetics Dept',     'https://med.stanford.edu/genetics.html'],
      ['youtube',     ' SGD YouTube',               'https://www.youtube.com/SaccharomycesGenomeDatabase'],
      ['',            'Download SGD Data',          'http://sgd-archive.yeastgenome.org/'],
      ['',            'CC BY 4.0',                  'https://creativecommons.org/licenses/by/4.0/'],
      // CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/) creative commons license; if possible link from the image (see SGD)
      // ['<img src="https://www.encodeproject.org/static/img/su-logo-white-2x.png" height="46px" />',                                               'https://www.stanford.edu/'],
      ['linkedin',    ' SGD LinkedIn',              'https://www.linkedin.com/company/saccharomyces-genome-database'],
    ],
  },
  'zfin': {
    about: '<p>The Zebrafish Information Network (ZFIN) is the database of genetic and genomic data for the zebrafish ' +
      '(<i>Danio rerio</i>) as a model organism. ZFIN provides a wide array of expertly curated, organized and ' +
      'cross-referenced zebrafish research data.' +
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
    hasMeetings: true,
    meetingsURL: 'https://zfin.atlassian.net/wiki/spaces/meetings/overview',
    linkToMeetingsPage: 'https://zfin.atlassian.net/wiki/spaces/meetings/overview',
    zfinMeetingsAPI: 'https://zfin.org/action/api/wiki/meetings?limit=5&page=1',
    fetchMeetingsCount: 3,
    hasNews: true,
    newsURL: 'https://zfin.atlassian.net/wiki/spaces/news/overview',
    linkToNewsPage: 'https://zfin.atlassian.net/wiki/spaces/news/overview',
    zfinNewsAPI: 'https://zfin.org/action/api/wiki/news?limit=5&page=1',
    fetchNewsCount: 3,
    search: [
      ['<i>D. rerio</i>', '/search?species=Danio rerio&category=gene'],
    ],
    resources: [
      ['Search and Retrieve Zebrafish Data',      'https://zfin.org/search?category=&q='],
      ['ZFIN Gene Expression Data / Images',      'https://zfin.org/action/expression/search'],
      ['ZFIN Mutants / Transgenics / Phenotypes', 'https://zfin.org/action/fish/search'],
      ['ZFIN Antibodies',                         'https://zfin.org/action/antibody/search'],
      ['ZFIN BLAST',                              'https://zfin.org/action/blast/blast'],
      ['Zebrafish Publications',                  'https://zfin.org/action/publication/search'],
      ['Submit Data to ZFIN',                     'https://zfin.org/action/submit-data'],
      ['Zebrafish Book',                          'https://zfin.org/zf_info/zfbook/zfbk.html'],
      ['Zebrafish International Resource Center', 'https://zebrafish.org/home/guide.php'],
      ['ZFIN Person Search',                      'https://zfin.org/action/profile/person/search'],
      ['microPublication',                        'https://www.micropublication.org/'],
    ],
    footer: [
      ['',            'Zebrafish Anatomy / GO / Human Disease',     'https://zfin.org/action/ontology/search'],
      ['',            'ZFIN Downloads',                             'https://zfin.org/downloads'],
      ['',            'Citing ZFIN',                                'https://zfin.atlassian.net/wiki/spaces/general/pages/1891415775/ZFIN+Database+Information'],
      ['',            'Zebrafish Anatomy Atlases and Resources',    'https://zfin.atlassian.net/wiki/spaces/general/pages/1892876451/Anatomy+Atlases+and+Resources'],
      ['',            'ZFIN Glossary',                              'https://zfin.org/zf_info/glossary.html'],
      ['',            'Contact ZFIN',                               'https://zfin.atlassian.net/wiki/spaces/general/pages/1891412324/ZFIN+Contact+Information'],
      ['',            'ZFIN Genome Browser',                        'https://zfin.org/action/gbrowse/'],
      ['',            'ZFIN Author Guidelines',                     'https://zfin.org/zf_info/author_guidelines.html'],
      ['x-twitter',   ' @ZFINmod',                                  'https://twitter.com/ZFINmod'],
      ['',            'Zebrafish Laboratory Search',                'https://zfin.org/action/profile/lab/search'],
      ['',            'ZFIN Help and Tips',                         'https://zfin.atlassian.net/wiki/spaces/general/pages/1919656548/ZFIN+Tips'],
      ['youtube',     ' ZFIN YouTube',                              'https://www.youtube.com/channel/UCPR_QDNX8DetI9Sfk3P08sg'],
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
    hasMeetings: true,
    meetingsURL: 'https://drosophilaresearch.org/all-events',
    hasNews: true,
    flybaseNewsAPI: 'https://flybase.org/api/news?limit=3',
    fetchNewsCount: 3,
    newsURL: 'https://flybase.org/commentaries',
    linkToNewsPage: 'https://flybase.org/commentaries',
    search: [
      ['<i>D. melanogaster</i>', '/search?species=Drosophila melanogaster&category=gene'],
    ],
    resources: [
      ['Search FlyBase',        'https://flybase.org/'],
      ['FlyBase BLAST',         'https://flybase.org/blast/'],
      ['FlyBase JBrowse',       'https://flybase.org/jbrowse/?data=data/json/dmel'],
      ['Fly Vocabularies',      'https://flybase.org/vocabularies'],
      ['Fly ID Validator',      'https://flybase.org/convert/id'],
      ['Fly Batch Download',    'https://flybase.org/batchdownload'],
      ['Fast-Track Your Paper', 'https://flybase.org/submission/publication/'],
      ['microPublication',      'https://www.micropublication.org/'],
    ],
    footer: [
      ['',            'FlyBase Support',        'https://flybase.org/wiki/FlyBase:About#FlyBase_Support'],
      ['',            'Copyright Statement',    'https://flybase.org/wiki/FlyBase:About#FlyBase_Copyright'],
      ['x-twitter',   ' @FlyBaseDotOrg',        'https://twitter.com/FlyBaseDotOrg'],
      ['',            'Contact FlyBase',        'https://flybase.org/contact/email'],
      ['',            'Cite FlyBase',           'https://flybase.org/wiki/FlyBase:About#Citing_FlyBase'],
      ['youtube',     ' FlyBase YouTube',       'https://www.youtube.com/c/FlyBaseTV'],
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
    hasMeetings: true,
    rgdMeetingsAPI: 'https://rest.rgd.mcw.edu/rgdws/news/meetings?limit=3',
    linkToMeetingsPage: 'https://rgd.mcw.edu/#conference',
    fetchMeetingsCount: 3,
    hasNews: true,
    rgdNewsAPI: 'https://rest.rgd.mcw.edu/rgdws/news/last?limit=3',
    fetchNewsCount: 3,
    newsURL: 'https://rgd.mcw.edu/wg/news2/',
    linkToNewsPage: 'https://rgd.mcw.edu/wg/news2/',
    search: [
      ['<i>R. norvegicus</i>', '/search?species=Rattus norvegicus&category=gene'],
    ],
    resources: [
      ['RGD Gene Search',                         'https://rgd.mcw.edu/rgdweb/search/genes.html'],
      ['RGD Strain search',                       'https://rgd.mcw.edu/rgdweb/search/strains.html'],
      ['Rat Genetic Models',                      'https://rgd.mcw.edu/rgdweb/models/allModels.html'],
      ['OntoMate Literature Search',              'https://ontomate.rgd.mcw.edu/QueryBuilder/'],
      ['RGD Disease Portals',                     'https://rgd.mcw.edu/rgdweb/portal/index.jsp'],
      ['RGD Variant Visualizer',                  'https://rgd.mcw.edu/rgdweb/front/config.html'],
      ['Multi-Ontology Enrichment Tool (MOET)',   'https://rgd.mcw.edu/rgdweb/enrichment/start.html'],
      ['Object List Generator & Analyzer (OLGA)', 'https://rgd.mcw.edu/rgdweb/generator/list.html'],
      ['RGD Ontology Browser and Search',         'https://rgd.mcw.edu/rgdweb/ontology/search.html'],
      ['RGD User Support',                        'https://rgd.mcw.edu/rgdweb/contact/contactus.html'],
    ],
    footer: [
      ['',              'RGD Downloads',          'https://download.rgd.mcw.edu/data_release'],
      ['',              'RGD REST API',           'https://rest.rgd.mcw.edu/rgdws/swagger-ui.html'],
      ['x-twitter',     ' @ratgenome',            'https://twitter.com/ratgenome'],
      ['',              'About RGD', 	            'https://rgd.mcw.edu/wg/about-us'],
      ['',              'Citing RGD', 	          'https://rgd.mcw.edu/wg/citing-rgd/'],
      ['facebook-f',    ' @RatGenomeDatabase',    'https://www.facebook.com/RatGenomeDatabase'],
      ['',              'Contact RGD',            'https://rgd.mcw.edu/rgdweb/contact/contactus.html'],
      ['',              'RGD Help',   	          'https://rgd.mcw.edu/wg/help3/'],
      ['github',        ' RGD GitHub',            'https://github.com/rat-genome-database'],
    ],
  },
  'mgd': {
    about: '<p>The Mouse Genome Database (MGD) is the database resource for the laboratory mouse, and ' +
    'provides integrated biological data to facilitate the study of human health and disease.</p>' +
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
    search: [
      ['<i>M. musculus</i>', '/search?species=Mus musculus&category=gene'],
    ],
    resources: [
      ['Mouse Genes',                           'http://www.informatics.jax.org/genes.shtml'],
      ['Mouse Phenotypes & Mutant Alleles',     'http://www.informatics.jax.org/phenotypes.shtml'],
      ['Mouse-Human: Disease Connection',       'http://www.informatics.jax.org/humanDisease.shtml'],
      ['Gene Expression Database (GXD)',        'http://www.informatics.jax.org/expression.shtml'],
      ['Recombinase (cre)',                     'http://www.informatics.jax.org/home/recombinase'],
      ['Mouse Function',                        'http://www.informatics.jax.org/function.shtml'],
      ['Mouse Strains & SNPs',                  'http://www.informatics.jax.org/home/strain.shtml'],
      ['Mouse Models of Human Cancer',          'http://tumor.informatics.jax.org/mtbwi/index.do'],
      ['Mouse Models for Coronavirus Research', 'https://www.jax.org/mgi-coronavirus-info'],
      ['MouseMine',                             'http://www.mousemine.org/mousemine/begin.do'],
      ['MGI User Support',                      'http://www.informatics.jax.org/mgihome/support/mgi_inbox.shtml'],
    ],
    footer: [
      ['',              'Citing MGI Resources',                     'http://www.informatics.jax.org/mgihome/other/citation.shtml'],
      ['',              'MGI Funding Information',                  'http://www.informatics.jax.org/mgihome/other/mgi_funding.shtml'],
      ['x-twitter',     ' @mgi_mouse',                              'https://twitter.com/mgi_mouse'],
      ['',              'MGI Warranty Disclaimer and Copyright',    'http://www.informatics.jax.org/mgihome/other/copyright.shtml'],
      ['',              '',                                         ''],
      ['facebook-f',    ' @mgi.informatics',                        'https://www.facebook.com/mgi.informatics'],
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
    search: [
      ['Gene Ontology', '/search?category=go'],
    ],
    resources: [
      ['PANTHER Enrichment Analysis', 'http://pantherdb.org/'],
      ['GO Release Archive',          'http://release.geneontology.org/'],
      ['AmiGO',                       'http://amigo.geneontology.org/amigo'],
      ['GO API',                      'http://api.geneontology.org'],
      ['About the Ontology',          'http://geneontology.org/docs/ontology-documentation/'],
      ['About GO Annotations',        'http://geneontology.org/docs/go-annotations/'],
      ['GO Tools Overview',           'http://geneontology.org/docs/tools-overview/'],
      ['GO FAQ',                      'http://geneontology.org/docs/faq/'],
      ['The Gene Ontology Handbook',  'https://link.springer.com/book/10.1007%2F978-1-4939-3743-1'],
    ],
    footer: [
      ['',              'GO Helpdesk',                    'https://help.geneontology.org/'],
      ['',              'Current GO release',             'http://current.geneontology.org/'],
      ['x-twitter',     ' @News4GO',                      'https://twitter.com/news4go'],
      ['',              'GO Citation Policy & License',   'http://geneontology.org/docs/go-citation-policy/'],
      ['',              '',                               ''],
      ['facebook-f',    ' @geneontology',                 'https://www.facebook.com/geneontology'],
      ['',              'GO Funding Information',         'https://reporter.nih.gov/project-details/9209989'],
      ['',              '',                               ''],
      ['github',        ' geneontology/helpdesk',         'https://github.com/geneontology/helpdesk/discussions'],
    ],
  },
  'xenbase': {
    about: '<p>Xenbase’s mission is to provide a comprehensive, integrated and easy to use website that gives ' +
      'access to the diverse and rich genomic, expression and functional data available from <i>Xenopus</i> ' +
      'research. Xenbase also provides a critical data sharing infrastructure for many other NIH-funded projects, ' +
      'and is a key resource hub for the <i>Xenopus</i> research community.</p>',
    link: 'https://www.xenbase.org/',
    modShortName: 'Xenbase',
    modFullName: 'Xenbase',
    modVisitButtonText: 'Xenbase',
    bannerStyle: style.banner__XB,
    titleBarStyle: style.titleBar__XB,
    sectionStyle: style.section__XB,
    footerStyle: style.modFooter__XB,
    logoImgSrc: zenbaseLogo,
    hasNews: true,
    newsURL: 'https://www.xenbase.org/xenbase/doNewsList.do',
    hasMeetings: true,
    meetingsURL: 'https://www.xenbase.org/xenbase/doNewsRead.do?id=219',
    search: [
      ['<i>Xenopus laevis</i>', '/search?species=Xenopus laevis&category=gene'],
      ['<i>Xenopus tropicalis</i>', '/search?species=Xenopus tropicalis&category=gene'],
    ],
    resources: [
      ['<i>Xenopus</i> Gene Search',        'https://www.xenbase.org/entry/gene/gene.do'],
      ['<i>Xenopus</i> Gene Expression',    'https://www.xenbase.org/geneExpression/geneExpressionSearch.do?method=display'],
      ['<i>Xenopus</i> Phenotype Data',     'https://www.xenbase.org/entry/searchPhenotype.do?method=display'],
      ['<i>Xenopus</i> Literature ',        'https://www.xenbase.org/literature/articles.do'],
      ['<i>Xenopus</i> Disease Models',     'https://www.xenbase.org/entry/searchPhenotype.do?method=display&keyword=disease&tabName=disease'],
      ['<i>Xenopus</i> Lines & Mutants',    'https://www.xenbase.org/entry/stockCenter/searchLines.do?supplier=&searchIn=1&searchValue=*&searchSpecies=11&orderBy=CREATE_DATE&orderDirection=DESC&method=searchLines'],
      ['GEO data on Xenbase',               'https://www.xenbase.org/geneExpression/gseCurationSearch.do?method=search'],
      ['<i>Xenopus</i> Drawings',           'https://www.xenbase.org/entry/zahn.do'],
      ['<i>Xenopus</i> Staging Landmarks Table',  'https://www.xenbase.org/entry/landmarks-table.do'],
      ['<i>Xenopus</i> Data Downloads',     'https://www.xenbase.org/entry/static-xenbase/ftpDatafiles.jsp'],
      ['<i>Xenopus</i> Gene Reports',       'https://ftp.xenbase.org/pub/GenePageReports/'],
    ],
    footer: [
      ['',            'Xenbase User Support',           'https://www.xenbase.org/entry/static-xenbase/contactUs.jsp'],
      ['',            'Xine e-newsletter',              'https://www.xenbase.org/xenbase/static-xenbase/xine/xine.jsp'],
      ['x-twitter',   ' @Xenbase',                      'https://twitter.com/Xenbase'],
      ['',            'Xenbase Citation Policy',        'https://www.xenbase.org/other/static-xenbase/citingMOD.jsp'],
      ['',            'Xenbase Funding & Copyright',    'https://www.xenbase.org/entry/static-xenbase/aboutMOD.jsp'],
      ['youtube',     ' @XenbaseTips',                  'https://www.youtube.com/user/XenbaseTips'],
    ],
  }
}
