import React, { useCallback, useMemo } from 'react';
import tw from 'twin.macro';
import Menu from './menu/Menu';
import LinkRenderProvider from './link-render-provider/LinkRenderProvider';
import LinkRenderDefault from './link-render-provider/LinkRenderDefault';

export function AppShell({ children, renderLink = LinkRenderDefault }) {
  return (
    <LinkRenderProvider renderLink={renderLink}>
      <header tw="flex bg-primary">
        <Menu />
      </header>
      {children}
    </LinkRenderProvider>
  );
}
export default AppShell;
