import React from 'react';

const MenuContext = React.createContext({
  itemOpen: null,
  setItemOpen: () => {},
  resetItemOpen: () => {},
  renderLink: () => {},
});

export default MenuContext;
