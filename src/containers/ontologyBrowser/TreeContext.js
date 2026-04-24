import { createContext, useContext } from 'react';

const TreeContext = createContext({ expandedCuries: new Set(), toggleExpanded: () => {} });

export const useTreeContext = () => useContext(TreeContext);
export default TreeContext;
