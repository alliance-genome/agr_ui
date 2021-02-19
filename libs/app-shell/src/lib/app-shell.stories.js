import React from 'react';
import { AppShell } from './app-shell';
import { GlobalStyles } from 'twin.macro';

export default {
  component: AppShell,
  title: 'AppShell',
};

export const primary = () => {
  return (
    <>
      <GlobalStyles />
      <AppShell />
    </>
  );
};
