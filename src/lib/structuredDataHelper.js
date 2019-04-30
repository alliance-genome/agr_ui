// import React from 'react';

export function getHelpSchema() {
  return {
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'http://schema.org',
      '@type': 'Organization',
      'url': 'https://www.alliancegenome.org',
      'logo': 'https://i1.wp.com/alliancegenome.files.wordpress.com/2016/11/banner_1_flyin_logo.png',
      'email': 'alliance-helpdesk@lists.stanford.edu'
    })
  };
}

export function getSearchSchema() {
  return {
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      'url': 'https://www.alliancegenome.org/',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://www.alliancegenome.org/search?q={term}',
        'query-input': 'required name=term'
      }
    }),
  };
}


export function getSchemasForData(schemas, data) {
  let dataType = getDataType(data);
  if (dataType === 'gene') {
    return produceSchemaForGene(schemas, data);
  } else if (dataType === 'disease') {
    return produceSchemaForDisease(schemas, data);
  } else {
    return [];
  }
}

function getDataType(data) {
  if (data.id.indexOf('DOID') === 0) return 'disease';
  if (data['automatedGeneSynopsis']) return 'gene';
  return 'unknown type';
}

function produceSchemaForGene(schemas, data) {
  let keywords = ['gene', data.dataProvider.replace('\n', ' '), data.symbol, ...data.synonyms, data.species.name, data.id];

  schemas.push({
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'http://schema.org',
      '@type': 'Dataset',
      '@id': data.id,
      name: data.symbol,
      dateCreated: new Date(data.dateProduced),
      datePublished: new Date(data.dateProduced),
      dateModified: new Date(data.dateProduced),
      description: [
        data.automatedGeneSynopsis,
        data.geneSynopsis,
        data.geneSynopsisUrl
      ].filter(a => !!a).join(' '),
      url: 'https://www.alliancegenome.org/gene/' + data.id,
      keywords: keywords.join(' '),
      includedInDataCatalog: 'https://www.alliancegenome.org',
      creator: {
        '@type': 'Organization',
        'name': 'Alliance of Genome Resources'
      },
      version: '2.0',
      license: 'CC BY 4.0',
    }),
  });

  // based on this: https://github.com/BioSchemas/specifications/tree/master/Gene/examples
  // bioschemas section
  schemas.push({
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': [
        {
          'bs': 'http://bioschemas.org/'
        },
        'http://schema.org',
        {
          '@base': 'http://schema.org'
        }
      ],
      '@type': [
        'bs:Gene'
      ],
      identifier: data.id,
      name: data.symbol,
      url: `https://www.alliancegenome.org/gene/${data.id}`,
      dateCreated: new Date(data.dateProduced),
      datePublished: new Date(data.dateProduced),
      dateModified: new Date(data.dateProduced),
      description: data.automatedGeneSynopsis + ' ' + (data.geneSynopsis || data.geneSynopsisUrl || ''),
      // 'sameAs': `https://zfin.org/ZDB-GENE-001103-2`, // TODO: add resolver here
    }),
  });
  return schemas;
}

function produceSchemaForDisease(schemas, data) {
  let keywords = ['disease', data.id, data.name, ...data.synonyms, data.definition];

  let definitions = [data.definition];
  if (data.definitionLinks && data.definitionLinks.length > 0) {
    definitions.push(data.definitionLinks[0]);
  }
  schemas.push({
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'http://schema.org',
      '@type': 'Dataset',
      '@id': data.id,
      name: data.name,
      description: [definitions].filter(a => !!a).join(' '),
      url: 'https://www.alliancegenome.org/disease/' + data.id,
      keywords: keywords.join(' '),
      includedInDataCatalog: 'https://www.alliancegenome.org',
      creator: {
        '@type': 'Organization',
        'name': 'Alliance of Genome Resources'
      },
      version: '2.0',
      license: 'CC BY 4.0',
    }),
  });

  // based on this: https://github.com/BioSchemas/specifications/tree/master/Gene/examples
  // bioschemas section
  schemas.push({
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'http://schema.org',
      '@type': 'MedicalCondition',
      '@id': data.id,
      identifier: data.id,
      name: data.name,
      url: `https://www.alliancegenome.org/disease/${data.id}`,
      description: data.description,
      'sameAs': data.url, // TODO: add resolver here
    }),
  });
  return schemas;
}
