import React from 'react';
import { AppShell } from './app-shell';

export default {
  component: AppShell,
  title: 'AppShell',
};

export const Default = () => {
  return (
    <>
      <AppShell>Here is some great content.</AppShell>
    </>
  );
};

export const WormBase = () => {
  return (
    <>
      <AppShell mod="wormbase">
        Here is some great MOD specific content.
      </AppShell>
    </>
  );
};
