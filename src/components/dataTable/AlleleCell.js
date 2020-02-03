import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AlleleSymbol from '../../containers/allelePage/AlleleSymbol';

const AlleleCell = ({allele}) => {
  return (
    <Link to={`/allele/${allele.id}`}>
      <AlleleSymbol allele={allele} />
    </Link>
  );
};

AlleleCell.propTypes = {
  allele: PropTypes.object,
};

export default AlleleCell;
