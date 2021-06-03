import React from 'react';
import ExternalLink from '../ExternalLink';

const PathwayUserGuide = () => (
  // TODO
  <div>
    <p>
      Functional gene products work together to carry out biological processes in chains of causal events (i.e. reactions) that we refer to as “pathways”. For example, these may be pathways of metabolite processing enzymatically enabled by one or more gene products, or they may be regulatory signaling cascades in which gene products functionally interact to propagate a signal leading to a particular biological outcome. The Alliance of Genome Resources provides three ways to visualize and interact with Pathways and Reactions: <ExternalLink href='https://reactome.org/PathwayBrowser/'>Reactome Pathway and Reactions</ExternalLink>, and <ExternalLink href='https://geneontology.cloud/browse/'>Gene Ontology Causal Activity Models (GO-CAMs)</ExternalLink>.
    </p>
    <p>Read more about the <ExternalLink href='https://reactome.org/documentation/data-model'>Reactome Data Model</ExternalLink> and the <ExternalLink href='http://geneontology.org/docs/gocam-overview/'>GO-CAM Data Model</ExternalLink>.</p>
  </div>
);

export default PathwayUserGuide;
