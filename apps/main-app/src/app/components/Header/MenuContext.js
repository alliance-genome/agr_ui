import React from 'react';

const MenuContext = React.createContext({
  itemOpen: null,
  setItemOpen: () => {},
  resetItemOpen: () => {},
});

export default MenuContext;
