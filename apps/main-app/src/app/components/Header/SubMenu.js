import React, { useState } from 'react';
import MenuItem from './MenuItem';
import tw from 'twin.macro';

const SubMenu = ({ title, children }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <MenuItem>
      <button
        onClick={() => setOpen((isOpen) => !isOpen)}
        tw="focus:outline-none"
      >
        {title}
      </button>
      {isOpen ? <ul tw="absolute flex flex-col">{children}</ul> : null}
    </MenuItem>
  );
};

export default SubMenu;
