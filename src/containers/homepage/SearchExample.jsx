import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SearchExample = ({ term }) => {
  return <Link to={`/search?q=${term}`}>{term}</Link>;
};

SearchExample.propTypes = {
  term: PropTypes.string,
};

export default SearchExample;
