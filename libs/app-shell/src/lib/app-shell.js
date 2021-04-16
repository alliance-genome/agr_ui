import React, { useCallback, useMemo } from 'react';
import { Global } from '@emotion/react';
import tw from 'twin.macro';
import Menu from './menu/Menu';
import LinkRenderProvider from './link-render-provider/LinkRenderProvider';
import LinkRenderDefault from './link-render-provider/LinkRenderDefault';
import MODThemeProvider from './modtheme-provider/MODThemeProvider';

export function AppShell({ children, renderLink = LinkRenderDefault, mod }) {
  return (
    <LinkRenderProvider renderLink={renderLink}>
      <MODThemeProvider mod={mod}>
        <header tw="flex bg-primary">
          <Menu />
        </header>
        {children}
      </MODThemeProvider>
    </LinkRenderProvider>
  );
}
export default AppShell;
