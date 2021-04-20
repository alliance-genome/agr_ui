import React from 'react';
import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { GlobalStyles } from 'twin.macro';

addDecorator(withKnobs);

export const parameters = {
  layout: 'fullscreen',
};

export const decorators = [
  (Story) => (
    <>
      <GlobalStyles />
      <Story />
    </>
  ),
];
