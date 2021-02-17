import React from 'react';
import { Link } from 'react-router-dom';
import tw, { css } from 'twin.macro';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

const Menu = () => {
  return (
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
    </ul>
  );
};

export default Menu;
