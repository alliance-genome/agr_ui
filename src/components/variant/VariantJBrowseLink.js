import React from 'react';
import PropTypes from 'prop-types';
import {stringify as stringifyQuery} from 'qs';
import ExternalLink from '../ExternalLink';
import {
  getSpecies
} from '../../lib/utils';

// this will return when the get parameter 'highlight' is added to JB2
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



const buildTrackList = (taxonid) => {
  const tracks = [];
  const trackList = getSpecies(taxonid).jBrowsetracks.split(',');
  const assembly = buildAssembly(taxonid);
  for (const track of trackList) {
    tracks.push( assembly + track );
  }
  return tracks.join(',');
};

const buildAssembly = (taxonid) => {
    return getSpecies(taxonid).jBrowseName.replace(' ', '_');
}


const VariantJBrowseLink = ({children, location, type, geneSymbol, geneLocation, species, taxonid}) => {
  return (
    location ?
      <ExternalLink
        href={'/jbrowse2/?' + stringifyQuery({
/*          data: `data/${species}`, */
	  tracklist: 'true',
          loc: (geneLocation && geneLocation.start && geneLocation.end) ?
            `${geneLocation.chromosome || location.chromosome}:${geneLocation.start || 0}..${geneLocation.end || 0}` :
            geneSymbol,
/*          tracks: ['Variants', 'Multiple-Variant Alleles', 'High Throughput Variants', 'All Genes', 'DNA'].join(','),  */
          assembly: buildAssembly(taxonid),
/*          loc: `${geneLocation.chromosome || location.chromosome}:${geneLocation.start || 0}..${geneLocation.end || 0}`, */
          tracks: buildTrackList(taxonid), 
          highlight: calculateHighlight(location, type)
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
  type: PropTypes.string,
  taxonid: PropTypes.string
};

export default VariantJBrowseLink;
