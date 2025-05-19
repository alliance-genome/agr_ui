import React from 'react';
import PropTypes from 'prop-types';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import { htmlToPlainText } from '../../lib/utils';

const GeneMetaTags = ({gene}) => {
  if (!gene) {
    return null;
  }

  const title = `${htmlToPlainText(gene.symbol)} | ${gene.species.name} gene`;
  const dateProduced = new Date(gene.dateProduced);
  const keywords = [
    'gene',
    gene.dataProvider.replace('\n', ' '),
    gene.symbol,
    ...(gene.synonyms || []),
    gene.species.name,
    gene.id
  ];
  const jsonLd = [
    {
      '@context': 'http://schema.org',
      '@type': 'Dataset',
      '@id': gene.id,
      name: gene.symbol,
      dateCreated: dateProduced,
      datePublished: dateProduced,
      dateModified: dateProduced,
      description: [
        gene.name,
        gene.automatedGeneSynopsis,
        gene.geneSynopsis,
        gene.geneSynopsisUrl
      ].filter(a => !!a).join(' '),
      url: 'https://www.alliancegenome.org/gene/' + gene.id,
      keywords: keywords.join(' '),
      includedInDataCatalog: 'https://www.alliancegenome.org',
      creator: {
        '@type': 'Organization',
        'name': 'Alliance of Genome Resources'
      },
      version: '2.0',
      license: "https://creativecommons.org/licenses/by/4.0",
    },
    // based on this: https://github.com/BioSchemas/specifications/tree/master/Gene/examples
    // bioschemas section
    {
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
      identifier: gene.id,
      name: gene.symbol,
      url: `https://www.alliancegenome.org/gene/${gene.id}`,
      dateCreated: dateProduced,
      datePublished: dateProduced,
      dateModified: dateProduced,
      description: gene.automatedGeneSynopsis + ' ' + (gene.geneSynopsis || gene.geneSynopsisUrl || ''),
      // 'sameAs': `https://zfin.org/ZDB-GENE-001103-2`, // TODO: add resolver here
    }
  ];

  return <HeadMetaTags jsonLd={jsonLd} title={title} />;
};

GeneMetaTags.propTypes = {
  gene: PropTypes.object,
};

export default GeneMetaTags;
