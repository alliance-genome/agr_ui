import React from 'react';
import tw, { css } from 'twin.macro';

const MenuItem = ({ children }) => (
  <li
    css={[
      tw`inline-block box-border bg-primary mx-1`,
      tw`divide-y-2 divide-transparent`,
      {
        '& a,button': tw`inline-block p-3 text-white hover:underline font-medium`,
      },
    ]}
  >
    {children}
  </li>
);

export default MenuItem;
