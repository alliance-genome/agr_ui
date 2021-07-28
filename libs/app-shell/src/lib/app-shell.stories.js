import React from 'react';
import tw from 'twin.macro';
import { AppShell } from './app-shell';

export default {
  component: AppShell,
  title: 'AppShell',
};

const PlaceHolder = () => (
  <p tw="p-36 text-gray-500">Placeholder // Some great content will be here!</p>
);

export const Default = () => {
  return (
    <>
      <AppShell>
        <PlaceHolder />
      </AppShell>
    </>
  );
};

export const WormBase = () => {
  return (
    <>
      <AppShell mod="wormbase">
        <PlaceHolder />
      </AppShell>
    </>
  );
};
