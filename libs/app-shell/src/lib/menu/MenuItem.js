import React from 'react';
import tw, { css } from 'twin.macro';

const MenuItem = ({ children }) => (
  <li
    css={[
      tw`inline-block box-border bg-primary`,
      {
        '& > a,button': tw`inline-block p-3 text-white hover:underline font-medium`,
      },
    ]}
  >
    {children}
  </li>
);

export default MenuItem;
