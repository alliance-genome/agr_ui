import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { HELP_EMAIL } from '../constants';

class HeadMetaTags extends Component {
  render() {
    const title = `${this.props.title} | Alliance of Genome Resources`;
    let jsonLd = this.props.jsonLd || [];
    if (!Array.isArray(jsonLd)) {
      jsonLd = [jsonLd];
    }
    const schemas = [
      // general view
      {
        '@context': 'http://schema.org',
        '@type': 'Organization',
        url: 'https://www.alliancegenome.org',
        logo: 'https://i1.wp.com/alliancegenome.files.wordpress.com/2016/11/banner_1_flyin_logo.png',
        email: HELP_EMAIL,
      },

      // specify actions
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url: 'https://www.alliancegenome.org/',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://www.alliancegenome.org/search?q={term}',
          'query-input': 'required name=term',
        },
      },

      // passed from props
      ...jsonLd,
    ];

    const scripts = schemas.map((schema) => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schema),
    }));

    return <Helmet meta={[{ property: 'og:title', content: { title } }]} script={scripts} title={title} />;
  }
}

HeadMetaTags.propTypes = {
  jsonLd: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
};

export default HeadMetaTags;
