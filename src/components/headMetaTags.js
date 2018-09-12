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
          identifier: {
            '@type': 'Text',
            value:  data.primaryId
          },
        }),
      };
    }

    return (
      <div>
        <Helmet
          meta={[
            {property: 'og:title', content: {title}}
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
