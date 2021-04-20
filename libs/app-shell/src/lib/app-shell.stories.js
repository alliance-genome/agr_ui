import React from 'react';
import { AppShell } from './app-shell';

export default {
  component: AppShell,
  title: 'AppShell',
};

export const Default = () => {
  return (
    <>
      <AppShell></AppShell>
    </>
  );
};

export const WormBase = () => {
  return (
    <>
      <AppShell mod="wormbase"></AppShell>
    </>
  );
};
