import React from 'react';
import PropTypes from 'prop-types';
import OrthologyJBrowseLink from './orthologyJBrowseLink';

const geneLocationIsInvalid = (geneLocation) => {
  if (typeof geneLocation.chromosome === 'undefined') {
	  return true;
  } else if (typeof geneLocation.start === 'undefined') {
	  return true;
  } else if (typeof geneLocation.end === 'undefined') {
	  return true;
  }
  return false;
}

const OrthologyJBrowseLinkPanel = ({geneLocation, taxonid}) => {
  return (
    geneLocationIsInvalid(geneLocation) ? null :
    <div id='orthologyJBrowseLinkPanel'>
        <span>Links to orthology data in JBrowse by filter level: </span>
	<OrthologyJBrowseLink
            geneLocation={geneLocation}
	    taxonid={taxonid}
	    filterlevel='stringent'
	/>
	  ,&nbsp;&nbsp;
        <OrthologyJBrowseLink
            geneLocation={geneLocation}
            taxonid={taxonid}
            filterlevel='moderate'
        />
	  ,&nbsp;&nbsp;
	<OrthologyJBrowseLink
            geneLocation={geneLocation}
            taxonid={taxonid}
            filterlevel='none'
        />
	  ,&nbsp;&nbsp;
	        <OrthologyJBrowseLink
            geneLocation={geneLocation}
            taxonid={taxonid}
            filterlevel='best'
        />
    </div>
  );
};

OrthologyJBrowseLinkPanel.propTypes = {
  geneLocation: PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
    chromosome: PropTypes.string,
  }),
  taxonid: PropTypes.string.isRequired
};

export default OrthologyJBrowseLinkPanel;
