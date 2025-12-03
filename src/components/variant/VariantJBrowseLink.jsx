import React from 'react';
import PropTypes from 'prop-types';
import { stringify as stringifyQuery } from 'qs';
import ExternalLink from '../ExternalLink.jsx';
import { getSpecies } from '../../lib/utils';

// this will return when the get parameter 'highlight' is added to JB2
const calculateHighlight = (location, type) => {
  switch (type) {
    case 'insertion':
      return `${location.chromosome}:${typeof location.start === 'number' ? location.start : location.start}..${location.start}`;
    case 'deletion':
    case 'delins':
      return `${location.chromosome}:${typeof location.start === 'number' ? location.start - 1 : location.end}..${location.end}`;
    default:
    case 'point_mutation':
      return `${location.chromosome}:${typeof location.start === 'number' ? location.start : location.end}..${location.end}`;
  }
};

const LINK_BUFFER = 1.2;

const buildTrackList = (taxonid) => {
  const tracks = [];
  const species = getSpecies(taxonid);
  if (!species.jBrowsetracks) {
    return '';
  }
  const trackList = species.jBrowsetracks.split(',');
  const assembly = buildAssembly(taxonid);
  for (const track of trackList) {
    tracks.push(assembly + track);
  }
  return tracks.join(',');
};

const buildAssembly = (taxonid) => {
  const species = getSpecies(taxonid);
  return species.jBrowseName ? species.jBrowseName.replace(' ', '_') : '';
};

const buildLoc = (location) => {
  const start = location.start || 0;
  const end = location.end || 0;
  const linkLength = end - start;
  if (linkLength === 0) {
    return;
  }
  let bufferedMin = Math.round(start - (linkLength * LINK_BUFFER) / 2.5);
  bufferedMin = bufferedMin < 0 ? 0 : bufferedMin;
  const bufferedMax = Math.round(end + linkLength * LINK_BUFFER);
  return location.chromosome + ':' + bufferedMin + '..' + bufferedMax;
};

const VariantJBrowseLink = ({ children, location, type, geneSymbol, geneLocation, taxonid }) => {
  // Check if we have valid data to build a JBrowse link
  const species = getSpecies(taxonid);
  const hasValidSpecies = species && species.jBrowseName;

  return location && hasValidSpecies ? (
    <ExternalLink
      href={
        '/jbrowse2/?' +
        stringifyQuery({
          tracklist: 'true',
          loc: buildLoc(geneLocation || location),
          assembly: buildAssembly(taxonid),
          tracks: buildTrackList(taxonid),
          highlight: calculateHighlight(location, type),
        })
      }
    >
      {children}
    </ExternalLink>
  ) : (
    children
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
  type: PropTypes.string,
  taxonid: PropTypes.string.isRequired,
};

export default VariantJBrowseLink;
