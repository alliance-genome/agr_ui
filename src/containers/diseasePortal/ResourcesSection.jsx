import React from 'react';
import ExternalLink from '../../components/ExternalLink.jsx';

const ResourcesSection = ({ disease }) => {
  return (
    <div>
      {disease.resources.map((resourceLink, index) => {
        return (
          <div key={'resources-' + index}>
            <ExternalLink href={resourceLink.url}>{resourceLink.title}</ExternalLink>
          </div>
        );
      })}
    </div>
  );
};

export default ResourcesSection;
