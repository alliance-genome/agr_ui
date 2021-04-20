import React from 'react';
import { Logo } from './Logo';

export default {
  component: Logo,
  title: 'Logo',
};

export const primary = () => {
  return <Logo id="wormbase" />;
};
