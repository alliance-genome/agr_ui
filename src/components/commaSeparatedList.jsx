import React, { useId } from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';

const CommaSeparatedList = ({ children, listItemClassName }) => {
  const id = useId();
  return (
    <ul className={style.commaSeparatedList}>
      {React.Children.map(children, (child, index) => (
        <li key={`${id}-${index}`} className={listItemClassName}>
          {child}
        </li>
      ))}
    </ul>
  );
};

CommaSeparatedList.propTypes = {
  children: PropTypes.node,
  listItemClassName: PropTypes.string,
};

export default CommaSeparatedList;
