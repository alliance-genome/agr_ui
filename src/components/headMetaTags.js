import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

class HeadMetaTags extends Component {

  render() {

    let title = `${this.props.title} | Alliance of Genome Resources`;
    let data = this.props.data;
    let schema = undefined;
    if (data) {
      let keywords = ['gene', data.dataProvider.replace('\n', ' '), data.symbol, ...data.synonyms, data.species, data.primaryId];
      schema = {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'http://schema.org',
          '@type': 'Dataset',
          '@id': data.primaryId,
          name: data.symbol,
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
      };
    }

    return (
      <div>
        <Helmet
          meta={[
            {
              property: 'og:title',
              content: {title},
            },
            {
              property: 'og:image',
              content: 'https://alliancegenome.files.wordpress.com/2016/11/banner_1_flyin_logo.png',
            },
            {
              property: 'og:url',
              content: 'https://alliancegenome.com/',
            },
            {
              property: 'og:description',
              content: 'The primary mission of the Alliance of Genome Resources (the Alliance) is to develop and maintain sustainable genome information resources that facilitate the use of diverse model organisms in understanding the genetic and genomic basis of human biology, health and disease. This understanding is fundamental for advancing genome biology research and for translating human genome data into clinical utility.',
            },
          ]}
          script={(schema ? [schema] : [])}
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
