import React, { useCallback, useMemo } from 'react';
import { Global } from '@emotion/react';
import tw from 'twin.macro';
import { Logo, getOrganizationById } from '@wormbase/agr-shared-assets';
import Menu from './menu/Menu';
import LinkRenderProvider from './link-render-provider/LinkRenderProvider';
import LinkRenderDefault from './link-render-provider/LinkRenderDefault';
import MODThemeProvider from './modtheme-provider/MODThemeProvider';

export function AppShell({ children, renderLink = LinkRenderDefault, mod }) {
  const organization = getOrganizationById(mod);
  return (
    <LinkRenderProvider renderLink={renderLink}>
      <MODThemeProvider mod={mod}>
        <header>
          <div tw="flex items-center">
            <Logo id={mod} tw="object-contain h-10" />
            <span tw="p-2 text-2xl font-semibold">{organization.name}</span>
          </div>
          <nav tw="flex bg-primary">
            <Menu />
          </nav>
        </header>
        {children}
      </MODThemeProvider>
    </LinkRenderProvider>
  );
}
export default AppShell;
