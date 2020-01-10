import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const AlleleCell = ({allele}) => {
  return (
    <Link to={`/allele/${allele.id}`}>
      <span dangerouslySetInnerHTML={{__html: allele.symbol}} />
    </Link>
  );
};

AlleleCell.propTypes = {
  allele: PropTypes.object,
};

export default AlleleCell;
