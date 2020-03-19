import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { HELP_EMAIL } from '../constants';

class HeadMetaTags extends Component {
  render() {
    const title = `${this.props.title} | Alliance of Genome Resources`;
    const logo = 'https://i1.wp.com/alliancegenome.files.wordpress.com/2016/11/banner_1_flyin_logo.png';
    const description = 'The primary mission of the Alliance of Genome Resources (the Alliance) is to develop and maintain sustainable genome information resources that facilitate the use of diverse model organisms in understanding the genetic and genomic basis of human biology, health and disease. This understanding is fundamental for advancing genome biology research and for translating human genome data into clinical utility.';
    const url = 'https://alliancegenome.org';
    let jsonLd = this.props.jsonLd || [];
    if (!Array.isArray(jsonLd)) {
      jsonLd = [jsonLd];
    }
    const schemas = [
      // general view
      {
        '@context': 'http://schema.org',
        '@type': 'Organization',
        'url': 'https://www.alliancegenome.org',
        'logo': 'https://i1.wp.com/alliancegenome.files.wordpress.com/2016/11/banner_1_flyin_logo.png',
        'email': HELP_EMAIL
      },

      // specify actions
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        'url': 'https://www.alliancegenome.org/',
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://www.alliancegenome.org/search?q={term}',
          'query-input': 'required name=term'
        }
      },

      // passed from props
      ...jsonLd
    ];

    const scripts = schemas.map(schema => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schema)
    }));

    return (
      <Helmet
        meta={[
          {property: 'og:title', content: {title}},
          {property: 'og:image', content: {logo}},
          {property: 'og:description', content: {description}},
          {property: 'og:url', content: {url}}
        ]}
        script={scripts}
        title={title}
        logo={logo}
        description={description}
        url={url}
      />
    );
  }
}

HeadMetaTags.propTypes = {
  jsonLd: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string
};

export default HeadMetaTags;
