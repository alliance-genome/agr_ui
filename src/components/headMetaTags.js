import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

class HeadMetaTags extends Component {


  render() {

    let title = `${this.props.title} | Alliance of Genome Resources`;
    let data = this.props.data;
    let schemas = [];


    // general view
    schemas.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'http://schema.org',
        '@type': 'Organization',
        'url': 'https://www.alliancegenome.org',
        'logo': 'https://i1.wp.com/alliancegenome.files.wordpress.com/2016/11/banner_1_flyin_logo.png',
        'email': 'alliance-helpdesk@lists.stanford.edu'
      })
    });


    // specify actions
    schemas.push({
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
    });


    if (data) {
      let keywords = ['gene', data.dataProvider.replace('\n', ' '), data.symbol, ...data.synonyms, data.species, data.primaryId];

      schemas.push({
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'http://schema.org',
          '@type': 'Dataset',
          '@id': data.primaryId,
          name: data.symbol,
          dateCreated: new Date(data.dateProduced),
          datePublished: new Date(data.dateProduced),
          dateModified: new Date(data.dateProduced),
          description: data.automatedGeneSynopsis + ' ' + (data.geneSynopsis || data.geneSynopsisUrl || ''),
          url: 'http://www.alliancegenome.org/gene/' + data.primaryId,
          keywords: keywords.join(' '),
          includedInDataCatalog: 'http://www.alliancegenome.org',
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
          identifier: data.primaryId,
          name: data.symbol,
          url: `https://www.alliancegenome.org/gene/${data.primaryId}`,
          dateCreated: new Date(data.dateProduced),
          datePublished: new Date(data.dateProduced),
          dateModified: new Date(data.dateProduced),
          description: data.automatedGeneSynopsis + ' ' + (data.geneSynopsis || data.geneSynopsisUrl || ''),
          // 'sameAs': `https://zfin.org/ZDB-GENE-001103-2`, // TODO: add resolver here
        }),
      });
    }

    return (
      <div>
        <Helmet
          meta={[
            {property: 'og:title', content: {title}}
          ]}
          script={(schemas)}
          title={title}
        />
      </div>
    );
  }
}

HeadMetaTags.propTypes = {
  data: PropTypes.any,
  title: PropTypes.string
};

export default HeadMetaTags;
