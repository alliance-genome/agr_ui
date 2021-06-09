import React, { useCallback, useMemo } from 'react';
import { Global } from '@emotion/react';
import tw from 'twin.macro';
import { Logo, getOrganizationById } from '@wormbase/agr-shared-assets';
import Menu from './menu/Menu';
import LinkRenderProvider from './link-render-provider/LinkRenderProvider';
import LinkRenderDefault from './link-render-provider/LinkRenderDefault';
import MODThemeProvider from './modtheme-provider/MODThemeProvider';
import PageFooter from './page-footer/PageFooter';

export function AppShell({ children, renderLink = LinkRenderDefault, mod }) {
  const organization = getOrganizationById(mod);
  return (
    <LinkRenderProvider renderLink={renderLink}>
      <MODThemeProvider mod={mod}>
        <div tw="flex flex-col min-h-screen">
          <header>
            <div tw="flex items-center h-10 my-2 divide-x ">
              <Logo tw="object-contain h-full px-4" />
              {organization ? (
                <div tw="flex items-center h-full px-4">
                  <Logo id={mod} tw="object-contain h-full" />
                  <span tw="p-2 text-2xl font-medium hidden md:inline-block">
                    {organization.name}
                  </span>
                  <span tw="p-2 text-2xl font-medium md:hidden">
                    {organization.abbreviation}
                  </span>
                </div>
              ) : null}
            </div>
            <nav tw="flex bg-primary">
              <Menu />
            </nav>
          </header>
          <main tw="flex-grow">{children}</main>
          <PageFooter />
        </div>
      </MODThemeProvider>
    </LinkRenderProvider>
  );
}
export default AppShell;
