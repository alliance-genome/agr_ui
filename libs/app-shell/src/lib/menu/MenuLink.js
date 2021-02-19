import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useRenderLink } from '../link-render-provider/LinkRenderProvider';
import MenuContext from './MenuContext';

const MenuLink = ({ to, children }) => {
  const { resetItemOpen } = useContext(MenuContext);
  const renderLink = useRenderLink();
  const closeMenu = useCallback(() => {
    resetItemOpen();
  }, [resetItemOpen]);
  return renderLink({
    to,
    children,
    closeMenu,
  });
};

export default MenuLink;
