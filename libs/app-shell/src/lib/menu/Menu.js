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
import sitemap from '../sitemap';

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
      <ul
        ref={menuRef}
        tw="flex flex-col lg:flex-row w-full justify-start items-stretch text-sm m-0 divide-y lg:divide-none"
      >
        {sitemap.map(({ sub, label, route }) =>
          sub ? (
            <SubMenu key={label} title={label}>
              {sub.map(({ label, route }) => (
                <MenuItem key={label} to={route}>
                  <Link to={route}>{label}</Link>
                </MenuItem>
              ))}
            </SubMenu>
          ) : (
            <MenuItem key={label}>
              <Link to={route}>{label}</Link>
            </MenuItem>
          )
        )}
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
