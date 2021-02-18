import React, { useState, useContext, useCallback } from 'react';
import tw from 'twin.macro';
import MenuItem from './MenuItem';
import MenuContext from './MenuContext';

const SubMenu = ({ title, children }) => {
  const { itemOpen, setItemOpen } = useContext(MenuContext);
  const handleClick = useCallback(() => {
    setItemOpen(title);
  }, [setItemOpen, title]);

  return (
    <MenuItem>
      <button onClick={handleClick} tw="focus:outline-none">
        {title}
      </button>
      {itemOpen === title ? (
        <ul tw="absolute flex flex-col">{children}</ul>
      ) : null}
    </MenuItem>
  );
};

export default SubMenu;
