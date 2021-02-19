import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import LinkContext from '../Link/LinkContext';
import MenuContext from './MenuContext';

const MenuLink = ({ to, children }) => {
  const { resetItemOpen } = useContext(MenuContext);
  const { renderLink } = useContext(LinkContext);
  const handleClick = useCallback(() => {
    resetItemOpen();
  }, [resetItemOpen]);
  return renderLink({
    to,
    children,
    handleClick,
  });
};

export default MenuLink;
