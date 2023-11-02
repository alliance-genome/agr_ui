import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';

const CommaSeparatedList = ({children, listItemClassName}) => {
  return (
    <ul className={style.commaSeparatedList}>
      {
        React.Children.map(children, child => <li className={listItemClassName}>{child}</li>)
      }
    </ul>
  );
};

CommaSeparatedList.propTypes = {
  children: PropTypes.node,
  listItemClassName: PropTypes.string,
};

export default CommaSeparatedList;
