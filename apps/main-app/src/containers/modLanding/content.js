import style from './style.scss';

export const MODContent = {
  'wb': {
    about: '<p>WormBase is an international consortium of biologists and computer scientists providing the research \'' +
      'community with accurate, current, accessible information concerning the genetics, genomics and biology of' +
      '<i>C. elegans</i> and related nematodes. Founded in 2000, the WormBase Consortium is led by Paul Sternberg' +
      '(CalTech), Matt Berriman (The Wellcome Trust Sanger Institute), Kevin Howe (EBI), and Lincoln Stein (The' +
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
    logoImgSrc: 'https://alliancegenome.files.wordpress.com/2016/11/logo_wormbase.png',
    wordpressBaseURL: 'https://public-api.wordpress.com/wp/v2/sites/blog.wormbase.org/posts',
    fetchNewsCount: 3,
    linkToNewsPage: 'https://blog.wormbase.org/'
  },
  'sgd': {
    about: '<p>The Saccharomyces Genome Database (SGD) provides comprehensive integrated biological information for the' +
      ' budding yeast <i>Saccharomyces cerevisiae</i> along with search and analysis tools to explore these data, ' +
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
    logoImgSrc: 'https://alliancegenome.files.wordpress.com/2016/11/logo_sgd.png',
    wordpressBaseURL: 'https://public-api.wordpress.com/rest/v1.1/sites/yeastgenomeblog.wordpress.com/posts/',
    fetchNewsCount: 3,
    linkToNewsPage: 'https://yeastgenomeblog.wordpress.com/'
  },
  'zfin': {
    about: '<p>The Zebrafish Information Network (ZFIN) is the database of genetic and genomic data for the zebrafish ' +
      '(<i>Danio rerio</i>) as a model organism. ZFIN provides a wide array of expertly curated, organized and ' +
      'cross-referenced Zebrafish research data' +
      '</p>' +
      '<p>ZFIN is a founding member of the Alliance of Genome Resources Project.</p>',
    link: 'https://www.zfin.org',
    modShortName: 'ZFIN',
    modFullName: 'Zebrafish Information Network',
    bannerStyle: style.banner__ZFIN,
    titleBarStyle: style.titleBar__ZFIN,
    logoImgSrc: 'https://alliancegenome.files.wordpress.com/2016/11/logo_zfin.png'
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
    logoImgSrc: 'https://alliancegenome.files.wordpress.com/2016/11/logo_flybase.png',
    wordpressBaseURL: '',
    fetchNewsCount: 0
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
    logoImgSrc: 'https://alliancegenome.files.wordpress.com/2016/11/logo_rgd.png'
  },
  'mgi': {
    about: '<p>MGI is the international database resource for the laboratory mouse, providing integrated genetic, ' +
      'genomic, and biological data to facilitate the study of human health and disease. ' +
      '<a href="http://www.informatics.jax.org/mgihome/projects/aboutmgi.shtml">Learn more</a></p>' +
      '<p>MGI is a founding member of the Alliance of Genome Resources Project.</p>',
    link: 'http://www.informatics.jax.org/',
    modShortName: 'MGI',
    modFullName: 'Mouse Genome Informatics',
    bannerStyle: style.banner__MGI,
    titleBarStyle: style.titleBar__MGI,
    logoImgSrc: 'https://alliancegenome.files.wordpress.com/2016/11/logo_mgd.png'
  },
  'goc': {
    about: '<p>The mission of the GO Consortium is to develop an up-to-date, comprehensive, computational model of ' +
      'biological systems, from the molecular level to larger pathways, cellular and organism-level systems.</p>' +
      '<p>The Gene Ontology resource provides a computational representation of our current scientific knowledge about the ' +
      'functions of genes (or, more properly, the protein and non-coding RNA molecules produced by genes) from many ' +
      'different organisms, from humans to bacteria. It is widely used to support scientific research, and has been ' +
      'cited in tens of thousands of publications. .</p>' +
      '<p>GOC is a founding member of the Alliance of Genome Resources Project.</p>',
    link: 'http://geneontology.org/',
    modShortName: 'GOC',
    modFullName: 'Gene Ontology Consortium',
    bannerStyle: style.banner__GO,
    titleBarStyle: style.titleBar__GO,
    logoImgSrc: 'https://alliancegenome.files.wordpress.com/2016/11/logo_goc.png'
  }
}







