import React from 'react';
import PropTypes from 'prop-types';
import { stringify as stringifyQuery } from 'qs';
import ExternalLink from '../ExternalLink.jsx';
import { getSpecies } from '../../lib/utils';

const buildTrackList = (taxonid, filterlevel) => {
  const trackList = getSpecies(taxonid).jBrowseOrthologyTracks.replace(/filter/g, filterlevel);
  return trackList;
};

const buildAssembly = (taxonid) => {
  return getSpecies(taxonid).jBrowseName.replace(' ', '_');
};

const buildLocation = (geneLocation, taxonid) => {
  const chrom =
    taxonid === 'NCBITaxon:559292' 
      ? 'chr' + geneLocation.chromosome
      : geneLocation.chromosome;
  return chrom + ':' + geneLocation.start + '..' + geneLocation.end;
};

const buildAnchor = (filterlevel) => {
  return filterlevel === 'none'
    ? 'No filter'
    : filterlevel === 'best'
      ? 'Best and Best Reverse'
      : filterlevel === 'moderate'
        ? 'Moderate'
        : filterlevel === 'stringent'
          ? 'Stringent'
          : '';
};

const OrthologyJBrowseLink = ({ filterlevel, geneLocation, taxonid }) => {
  return (
    <ExternalLink
      href={
        '/jbrowse2?' +
        stringifyQuery({
          tracklist: 'true',
          loc: buildLocation(geneLocation, taxonid),
          assembly: buildAssembly(taxonid),
          tracks: buildTrackList(taxonid, filterlevel),
        })
      }
    >
      {buildAnchor(filterlevel)}
    </ExternalLink>
  );
};

OrthologyJBrowseLink.propTypes = {
  children: PropTypes.node,
  geneLocation: PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
    chromosome: PropTypes.string,
  }),
  taxonid: PropTypes.string.isRequired,
  filterlevel: PropTypes.string.isRequired,
};

export default OrthologyJBrowseLink;
