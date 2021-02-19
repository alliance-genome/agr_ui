import React, { useCallback, useMemo } from 'react';
import tw from 'twin.macro';
import { css } from '@emotion/react';
import { Route, Link } from 'react-router-dom';
import Menu from './menu/Menu';
import LinkRenderProvider from './link-render-provider/LinkRenderProvider';
import LinkRenderDefault from './link-render-provider/LinkRenderDefault';

export function AppShell({ children, renderLink = LinkRenderDefault }) {
  return (
    <LinkRenderProvider renderLink={renderLink}>
      <header tw="flex bg-blue-500">
        <Menu />
      </header>
      <h1 tw="text-blue-400">Welcome to app-shell!</h1>
      {children}
    </LinkRenderProvider>
  );
}
export default AppShell;
