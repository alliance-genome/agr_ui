import React from 'react';
import PropTypes from 'prop-types';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import { htmlToPlainText, getNoteText, extractGeneFields, getSynonymStrings } from '../../lib/utils';

const GeneMetaTags = ({ gene }) => {
  if (!gene) {
    return null;
  }

  const { speciesName, taxonId, geneSymbolText, dataProviderAbbr, geneId } = extractGeneFields(gene);
  const symbol = geneSymbolText || '';
  const dataProvider = dataProviderAbbr || '';
  const synonyms = getSynonymStrings(gene);
  const geneName = gene.geneFullName?.displayText;
  const automatedGeneSynopsis = getNoteText(gene.relatedNotes, 'automated_gene_description');
  const geneSynopsis = getNoteText(gene.relatedNotes, 'MOD_provided_gene_description');

  const title = `${htmlToPlainText(symbol)} | ${speciesName} gene`;
  const keywords = [
    'gene',
    dataProvider,
    symbol,
    ...synonyms,
    speciesName,
    geneId,
  ];
  const description = [geneName, automatedGeneSynopsis, geneSynopsis]
    .filter((a) => !!a)
    .join(' ');
  const jsonLd = [
    {
      '@context': 'http://schema.org',
      '@type': 'Dataset',
      '@id': geneId,
      name: symbol,
      description: description,
      url: 'https://www.alliancegenome.org/gene/' + geneId,
      keywords: keywords.join(' '),
      includedInDataCatalog: 'https://www.alliancegenome.org',
      creator: {
        '@type': 'Organization',
        name: 'Alliance of Genome Resources',
      },
      version: '2.0',
      license: 'https://creativecommons.org/licenses/by/4.0',
    },
    // based on this: https://github.com/BioSchemas/specifications/tree/master/Gene/examples
    // bioschemas section
    {
      '@context': [
        {
          bs: 'http://bioschemas.org/',
        },
        'http://schema.org',
        {
          '@base': 'http://schema.org',
        },
      ],
      '@type': ['bs:Gene'],
      identifier: geneId,
      name: symbol,
      url: `https://www.alliancegenome.org/gene/${geneId}`,
      description: (automatedGeneSynopsis || '') + ' ' + (geneSynopsis || ''),
      // 'sameAs': `https://zfin.org/ZDB-GENE-001103-2`, // TODO: add resolver here
    },
  ];

  return <HeadMetaTags jsonLd={jsonLd} title={title} />;
};

GeneMetaTags.propTypes = {
  gene: PropTypes.object,
};

export default GeneMetaTags;
