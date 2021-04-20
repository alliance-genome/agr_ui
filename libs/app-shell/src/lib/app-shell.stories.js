import React from 'react';
import { AppShell } from './app-shell';
import { SharedAssets } from '@wormbase/agr-shared-assets';
import { GlobalStyles } from 'twin.macro';

export default {
  component: AppShell,
  title: 'AppShell',
};

export const primary = () => {
  return (
    <>
      <GlobalStyles />
      <AppShell mod="wormbase">
        <SharedAssets />
      </AppShell>
    </>
  );
};
