import React from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

const CommaSeparatedList = ({children}) => {
  return (
    <ul className={style.commaSeparatedList}>
      {
        React.Children.map(children, child => <li>{child}</li>)
      }
    </ul>
  );
};

CommaSeparatedList.propTypes = {
  children: PropTypes.node,
};

export default CommaSeparatedList;
