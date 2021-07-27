import React from 'react';
import tw from 'twin.macro';

import { useRenderLink } from '../link-render-provider/LinkRenderProvider';

export default function PageFooterLink({ children, to }) {
  const Link = useRenderLink();
  return (
    <Link to={to} tw="block text-sm">
      {children}
    </Link>
  );
}
