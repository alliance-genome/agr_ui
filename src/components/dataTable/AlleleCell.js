import React from 'react';
import PropTypes from 'prop-types';
import ExternalLink from '../externalLink';

const AlleleCell = ({allele}) => {
  return (
    <ExternalLink href={allele.crossReferences.primary.url}>
      <span dangerouslySetInnerHTML={{__html: allele.symbol}} />
    </ExternalLink>
  );
};

AlleleCell.propTypes = {
  allele: PropTypes.object,
};

export default AlleleCell;
