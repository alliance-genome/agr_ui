import style from './style.scss';

export const MODContent = {
  'wb': {
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
    bannerStyle: style.banner__WB,
    titleBarStyle: style.titleBar__WB,
    sectionStyle: style.section__WB,
    logoImgSrc: 'https://alliancegenome.files.wordpress.com/2016/11/logo_wormbase.png',
    wordpressBaseURL: 'https://public-api.wordpress.com/wp/v2/sites/blog.wormbase.org/posts',
    fetchNewsCount: 3,
    linkToNewsPage: 'https://blog.wormbase.org/',
    resources:
      '<br /><p>Some of the resources that can be found at WormBase\'s website:</p>' +
      '<p><a href="https://wormbase.org/about/userguide/nomenclature#gi9m5c264k8be0afldh71j3--10\">Nomenclature</a></p>' +
      '<p><a href="https://wormbase.org/tools#0--10">Tools</a></p>' +
      '<p><a href="https://wormbase.org/about/userguide/submit_data#01--10">Submit data to WormBase</a></p>' +
      '<p><a href="https://wormbase.org/about/userguide#0123456--10">User guides</a></p>' +
      '<p><a href="https://wormbase.org/tools/support">Help Desk</a></p>' +
      '<p><a href="https://cgc.umn.edu/">Caenorhabditis Genetics Center</a></p>' +
      '<p><a href="http://www.wormbook.org/">WormBook</a></p>' +
      '<p><a href="https://www.wormatlas.org/">WormAtlas</a></p>' +
      '<p><a href="http://nematode.net/NN3_frontpage.cgi">Nematode.net</a></p>' +
      '<p><a href="http://www.nematodes.org/">Nematodes.org</a></p>' +
      '<p><a href="https://www.micropublication.org/">Micropublication</a></p>' +
      '<p><a href="https://parasite.wormbase.org/">ParaSite</a></p>'
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
    bannerStyle: style.banner__SGD,
    titleBarStyle: style.titleBar__SGD,
    sectionStyle: style.section__SGD,
    logoImgSrc: 'https://alliancegenome.files.wordpress.com/2016/11/logo_sgd.png',
    wordpressBaseURL: 'https://public-api.wordpress.com/rest/v1.1/sites/yeastgenomeblog.wordpress.com/posts/',
    fetchNewsCount: 3,
    linkToNewsPage: 'https://yeastgenomeblog.wordpress.com/',
    resources:
      '<br /><p>Some of the resources that can found at SGD\'s website</p>' +
      '<p><a href="https://yeastmine.yeastgenome.org/yeastmine/begin.do">Search and retrieve data</a></p>' +
      '<p><a href="https://wiki.yeastgenome.org/index.php/Main_Page">Access SGD community information</a></p>' +
      '<p><a href="https://www.yeastgenome.org/genomesnapshot">Genome and annotation summary</a></p>' +
      '<p><a href="https://www.yeastgenome.org/submitData">Submit data</a></p>' +
      '<p><a href="https://www.yeastgenome.org/reference/recent">New yeast papers</a></p>' +
      '<p><a href="https://sites.google.com/view/yeastgenome-help/about/how-to-cite-sgd?authuser=0">How to cite SGD</a></p>' +
      '<p><a href="https://sites.google.com/view/yeastgenome-help/sgd-general-help">General help</a></p>' +
      '<p><a href="https://sites.google.com/view/yeastgenome-help/community-help/gene-registry">Gene Registry</a></p>' +
      '<p><a href="https://www.yeastgenome.org/blast-sgd">SGD BLAST</a></p>'
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
    bannerStyle: style.banner__ZFIN,
    titleBarStyle: style.titleBar__ZFIN,
    sectionStyle: style.section__ZFIN,
    logoImgSrc: 'https://alliancegenome.files.wordpress.com/2016/11/logo_zfin.png',
    resources:
      '<br /><p>Some of the resources that can be found at ZFIN\'s website:</p>' +
      '<p><a href="https://zfin.org/search?category=&q=">Search and Retrieve zebrafish data</a></p>' +
      '<p><a href="https://zfin.org/action/expression/search">Gene Expression data / Images</a></p>' +
      '<p><a href="https://zfin.org/action/fish/search">Mutants/Transgenics/Phenotypes</a></p>' +
      '<p><a href="https://zfin.org/action/antibody/search">Antibodies</a></p>' +
      '<p><a href="https://zfin.org/action/blast/blast">ZFIN BLAST</a></p>' +
      '<p><a href="https://zfin.org/action/publication/search">Zebrafish Publications</a></p>' +
      '<p><a href="https://zfin.org/action/submit-data">Submit Data to ZFIN</a></p>' +
      '<p><a href="https://zfin.org/zf_info/zfbook/zfbk.html">Zebrafish Book</a></p>' +
      '<p><a href=" https://zebrafish.org/home/guide.php">Zebrafish International Resource Center</a></p>' +
      '<p><a href="https://zfin.org/action/profile/person/search">People</a></p>'
  },
  'fb': {
    about: '<p>FlyBase (flybase.org) is an essential online database for researchers using <i>Drosophila melanogaster</i> ' +
      'as a model organism, facilitating access to a diverse array of information that includes genetic, molecular, ' +
      'genomic and reagent resources.</p>' +
      '<p>FlyBase is a founding member of the Alliance of Genome Resources Project.</p>',
    link: 'https://www.flybase.org',
    modShortName: 'FB',
    modFullName: 'FlyBase',
    bannerStyle: style.banner__FB,
    titleBarStyle: style.titleBar__FB,
    sectionStyle: style.section__FB,
    logoImgSrc: 'https://alliancegenome.files.wordpress.com/2016/11/logo_flybase.png',
    wordpressBaseURL: '',
    fetchNewsCount: 0,
    resources:
      '<br /><p>Some of the resources that can be found at FB\'s website:</p>' +
      '<p><a href="https://flybase.org/">Search</a></p>' +
      '<p><a href="https://flybase.org/blast/">BLAST</a></p>' +
      '<p><a href="https://flybase.org/jbrowse/?data=data/json/dmel">JBrowse</a></p>' +
      '<p><a href="https://flybase.org/rnaseq/rnaseq">RNA-Seq</a></p>' +
      '<p><a href="https://flybase.org/vocabularies">Vocabularies</a></p>' +
      '<p><a href="https://flybase.org/convert/id">ID Validator</a></p>' +
      '<p><a href="https://flybase.org/batchdownload">Batch Download</a></p>' +
      '<p><a href="https://flybase.org/submission/publication/">Fast-Track Your Paper</a></p>'
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
    bannerStyle: style.banner__RGD,
    titleBarStyle: style.titleBar__RGD,
    sectionStyle: style.section__RGD,
    logoImgSrc: 'https://alliancegenome.files.wordpress.com/2016/11/logo_rgd.png',
    resources:
      '<br /><p>Some of the resources that can be found at RGD\'s website:</p>' +
      '<p><a href="https://rgd.mcw.edu/rgdweb/search/genes.html">Gene Search</a></p>' +
      '<p><a href="https://rgd.mcw.edu/rgdweb/search/strains.html">Strain search</a></p>' +
      '<p><a href="https://rgd.mcw.edu/rgdweb/models/allModels.html">Rat Genetic Models</a></p>' +
      '<p><a href=" https://rgd.mcw.edu/QueryBuilder/">OntoMate Literature Search</a></p>' +
      '<p><a href="https://rgd.mcw.edu/rgdweb/portal/index.jsp">RGD Disease Portals</a></p>' +
      '<p><a href="https://rgd.mcw.edu/rgdweb/front/config.html">Variant Visualizer</a></p>' +
      '<p><a href="https://rgd.mcw.edu/rgdweb/enrichment/start.html">Multi-Ontology Enrichment Tool (MOET)</a></p>' +
      '<p><a href="https://rgd.mcw.edu/rgdweb/generator/list.html">Object List Generator & Analyzer (OLGA)</a></p>' +
      '<p><a href="https://rgd.mcw.edu/rgdweb/ontology/search.html">RGD Ontology Browser and Search</a></p>' +
      '<p><a href="https://rgd.mcw.edu/rgdweb/contact/contactus.html">User Support</a></p>'
  },
  'mgi': {
    about: '<p>MGI is the international database resource for the laboratory mouse, providing integrated genetic, ' +
      'genomic, and biological data to facilitate the study of human health and disease. ' +
      '<a href="http://www.informatics.jax.org/mgihome/projects/aboutmgi.shtml">Learn more</a>.</p>' +
      '<p>MGI is a founding member of the Alliance of Genome Resources Project.</p>',
    link: 'http://www.informatics.jax.org/',
    modShortName: 'MGI',
    modFullName: 'Mouse Genome Informatics',
    bannerStyle: style.banner__MGI,
    titleBarStyle: style.titleBar__MGI,
    sectionStyle: style.section__MGI,
    logoImgSrc: 'https://alliancegenome.files.wordpress.com/2016/11/logo_mgd.png',
    resources:
      '<br /><p>Some of the resources that can found at MGI\'s website</p>' +
      '<p><a href="http://www.informatics.jax.org/genes.shtml">Genes</a></p>' +
      '<p><a href="http://www.informatics.jax.org/phenotypes.shtml"> Phenotypes & Mutant Alleles</a></p>' +
      '<p><a href="http://www.informatics.jax.org/humanDisease.shtml">Mouse-Human: Disease Connection</a></p>' +
      '<p><a href="http://www.informatics.jax.org/expression.shtml">Gene Expression Database (GXD)</a></p>' +
      '<p><a href="http://www.informatics.jax.org/home/recombinase">Recombinase (cre)</a></p>' +
      '<p><a href="http://www.informatics.jax.org/function.shtml">Function</a></p>' +
      '<p><a href="http://www.informatics.jax.org/home/strain.shtml">Strains & SNPs</a></p>' +
      '<p><a href="http://tumor.informatics.jax.org/mtbwi/index.do">Mouse Models of Human Cancer</a></p>' +
      '<p><a href="https://www.jax.org/mgi-coronavirus-info">Mouse Models for Coronavirus Research</a></p>' +
      '<p><a href="http://www.mousemine.org/mousemine/begin.do">MouseMine</a></p>' +
      '<p><a href="http://www.informatics.jax.org/mgihome/support/mgi_inbox.shtml">User Support</a></p>'
  },
  'goc': {
    about: '<p>The mission of the GO Consortium is to develop a comprehensive, computational model of biological systems, ' +
        'ranging from the molecular to the organism level, across the multiplicity of species in the tree of life.</p>' +
        '<p>The Gene Ontology (GO) knowledgebase is the world\’s largest source of information on the functions of genes. ' +
        'This knowledge is both human-readable and machine-readable, and is a foundation for computational analysis of ' +
        'large-scale molecular biology and genetics experiments in biomedical research.</p>' +
        '<p>GOC is a founding member of the Alliance of Genome Resources Project.</p>',
    link: 'http://geneontology.org/',
    modShortName: 'GOC',
    modFullName: 'Gene Ontology Consortium',
    bannerStyle: style.banner__GO,
    titleBarStyle: style.titleBar__GO,
    sectionStyle: style.section__GO,
    logoImgSrc: 'https://alliancegenome.files.wordpress.com/2016/11/logo_goc.png',
    resources:
      '<br /><p>Some of the resources that can found at GO\'s website</p>' +
      '<p><a href="http://amigo.geneontology.org/amigo">AmiGO</a></p>' +
      '<p><a href="http://geneontology.org/docs/ontology-documentation/"> Ontology overview</a></p>' +
      '<p><a href="http://geneontology.org/docs/go-annotations/"> Annotation overview</a></p>' +
      '<p><a href="http://geneontology.org/docs/gocam-overview/">GO-CAM overview</a></p>' +
      '<p><a href="https://geneontology.cloud/home">User interface to browse GO-CAMs</a></p>' +
      '<p><a href="http://geneontology.org/docs/tools-overview/">Tools & Guides</p>' +
      '<p><a href="http://release.geneontology.org/">Releases including archive</a></p>' +
      '<p><a href="http://current.geneontology.org/">Current release (for permalinks)</a></p>' +
      '<p><a href="http://geneontology.org/docs/download-mappings/">Cross-references to external classification systems</a></p>' +
      '<p><a href="http://geneontology.org/docs/faq/">FAQ</a></p>' +
      '<p><a href="http://geneontology.org/docs/go-citation-policy/">Citing GO</a></p>' +
      '<p><a href="https://help.geneontology.org/">User Support</a></p>' +
      '<p><a href="http://geneontology.org/docs/contributing-to-go-terms/">Contributing to the ontology</a></p>'
  }
}







