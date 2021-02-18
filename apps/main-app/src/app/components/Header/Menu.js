import React, { useMemo, useState } from 'react';
// import { Link } from 'react-router-dom';
import tw, { css } from 'twin.macro';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import MenuContext from './MenuContext';
import Link from './MenuLink';

const Menu = () => {
  const [itemOpen, setItemOpen] = useState(null);
  const menuContextValue = useMemo(() => {
    return {
      itemOpen,
      setItemOpen,
      resetItemOpen: () => setItemOpen(null),
    };
  }, [itemOpen, setItemOpen]);
  return (
    <MenuContext.Provider value={menuContextValue}>
      <ul tw="flex justify-start">
        <MenuItem>
          <Link to="/">Home</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/page-2">Aoout</Link>
        </MenuItem>
        <SubMenu title="Help">
          <MenuItem>
            <Link to="/contact-us">Contact us</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/faq">FAQ</Link>
          </MenuItem>
        </SubMenu>
        <SubMenu title="Data & Tools">
          <MenuItem>
            <Link to="/download">Download</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/api">API Documentation</Link>
          </MenuItem>
        </SubMenu>
      </ul>
    </MenuContext.Provider>
  );
};

export default Menu;
