import React from 'react';
import PropTypes from 'prop-types';
import ExternalLink from '../../components/ExternalLink.jsx';

const ModGeneDescription = ({description, url}) => (
  <div>
    {description && <div dangerouslySetInnerHTML={{__html: description}} />}
    {url && <ExternalLink href={url} />}
  </div>
);

ModGeneDescription.propTypes = {
  description: PropTypes.string,
  url: PropTypes.string,
};

export default ModGeneDescription;
