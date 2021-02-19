import React from 'react';
import tw, { css } from 'twin.macro';

const MenuItem = ({ children }) => (
  <li
    css={[
      tw`inline-block`,
      tw`bg-blue-500 hover:bg-blue-600 active:bg-blue-700 box-border`,
      { '& > a,button': tw`inline-block p-3 text-white font-medium` },
    ]}
  >
    {children}
  </li>
);

export default MenuItem;
