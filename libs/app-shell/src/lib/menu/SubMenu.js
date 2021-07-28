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
      <span tw="hidden lg:block">
        <button onClick={handleClick} tw="hidden focus:outline-none">
          {title}
        </button>
      </span>

      <span tw="lg:hidden inline-block p-3 text-white">{title}</span>
      {itemOpen === title ? (
        <ul tw="hidden lg:flex absolute flex-col">{children}</ul>
      ) : (
        <ul tw="lg:hidden flex flex-col items-stretch">{children}</ul>
      )}
    </MenuItem>
  );
};

export default SubMenu;
