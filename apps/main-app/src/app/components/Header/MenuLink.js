import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import MenuContext from './MenuContext';

const MenuLink = ({ to, children }) => {
  const { resetItemOpen } = useContext(MenuContext);
  const handleOnClick = useCallback(() => {
    resetItemOpen();
  }, [resetItemOpen]);
  return (
    <Link to={to} onClick={handleOnClick}>
      {children}
    </Link>
  );
};

export default MenuLink;
