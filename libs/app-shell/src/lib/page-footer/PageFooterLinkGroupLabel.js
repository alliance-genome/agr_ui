import tw from 'twin.macro';
import { Children } from 'react';

export default function PageFooterLinkGroupLabel({ children }) {
  return <span tw="block text-sm font-bold">{children}</span>;
}
