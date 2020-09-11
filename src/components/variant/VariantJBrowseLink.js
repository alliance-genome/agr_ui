import React from 'react';
import PropTypes from 'prop-types';
import {stringify as stringifyQuery} from 'qs';
import ExternalLink from '../ExternalLink';

const calculateHighlight = (location, type) => {
  switch(type){
  case 'insertion':
    return `${location.chromosome}:${typeof location.start === 'number' ? location.start : location.start}..${location.start}`;
  case 'deletion':
  case 'delins':
    return `${location.chromosome}:${typeof location.start === 'number' ? location.start-1 : location.end}..${location.end}`;
  default:
  case 'point_mutation':
    return `${location.chromosome}:${typeof location.start === 'number' ? location.start : location.end}..${location.end}`;
  }
};

const VariantJBrowseLink = ({children, location, type, geneSymbol, geneLocation, species}) => {
  return (
    location ?
      <ExternalLink
        href={'/jbrowse/?' + stringifyQuery({
          data: `data/${species}`,
          loc: (geneLocation && geneLocation.start && geneLocation.end) ?
            `${geneLocation.chromosome || location.chromosome}:${geneLocation.start || 0}..${geneLocation.end || 0}` :
            geneSymbol,
          tracks: ['Variants', 'All Genes', 'DNA'].join(','),
          highlight: calculateHighlight(location, type.name)
        })}
      >
        {children}
      </ExternalLink> : children
  );
};

VariantJBrowseLink.propTypes = {
  children: PropTypes.node,
  geneLocation: PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
    chromosome: PropTypes.string,
  }),
  geneSymbol: PropTypes.string,
  location: PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
    chromosome: PropTypes.string,
  }),
  species: PropTypes.string.isRequired,
  type: PropTypes.string
};

export default VariantJBrowseLink;
