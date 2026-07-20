import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { HELP_EMAIL } from '../constants';

const HeadMetaTags = ({ title, jsonLd }) => {
  const fullTitle = `${title} | Alliance of Genome Resources`;
  let extraSchemas = jsonLd || [];
  if (!Array.isArray(extraSchemas)) {
    extraSchemas = [extraSchemas];
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
    ...extraSchemas,
  ];

  const scripts = schemas.map((schema) => ({
    type: 'application/ld+json',
    innerHTML: JSON.stringify(schema),
  }));

  return <Helmet meta={[{ property: 'og:title', content: { title: fullTitle } }]} script={scripts} title={fullTitle} />;
};

HeadMetaTags.propTypes = {
  jsonLd: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
};

export default HeadMetaTags;
