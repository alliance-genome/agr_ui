import React, {
  useMemo,
  useRef,
  useCallback,
  useState,
  useEffect,
} from 'react';
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

  const menuRef = useRef();
  const handleClick = useCallback(
    (event) => {
      if (!menuRef.current.contains(event.target)) {
        setItemOpen(null);
      }
    },
    [setItemOpen]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);

  return (
    <MenuContext.Provider value={menuContextValue}>
      <ul ref={menuRef} tw="flex justify-start">
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
        <SubMenu title="Members">
          <MenuItem>
            <Link to="/members/sgd">SGD</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/members/wormbase">WormBase</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/members/flybase">FlyBase</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/members/zfin">ZFIN</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/members/mgd">MGD</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/members/rgd">RGD</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/members/goc">GOC</Link>
          </MenuItem>
        </SubMenu>
      </ul>
    </MenuContext.Provider>
  );
};

export default Menu;
