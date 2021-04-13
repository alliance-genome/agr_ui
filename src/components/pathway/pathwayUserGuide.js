import React from 'react';
import ExternalLink from '../ExternalLink';

const PathwayUserGuide = () => (
  // TODO
  <div>
    <p>The Alliance of Genome Resources provides three ways to visualize and interact with Pathways and Reactions.</p>
    <p>The <ExternalLink href='https://reactome.org/PathwayBrowser/'>Reactome Pathway</ExternalLink>.</p>
    <p>The <ExternalLink href='https://reactome.org/PathwayBrowser/'>Reactome Reaction</ExternalLink>.</p>
    <p>The <ExternalLink href='https://geneontology.cloud/browse/'>Gene Ontology Causal Activity Models (GO-CAMs)</ExternalLink>.</p>
    <p>More information about the <ExternalLink href='https://reactome.org/documentation/data-model'>Reactome Data Model</ExternalLink> and the <ExternalLink href='http://geneontology.org/docs/gocam-overview/'>GO-CAM Data Model</ExternalLink>.</p>
  </div>
);

export default PathwayUserGuide;
