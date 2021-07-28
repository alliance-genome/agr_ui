import React, { useCallback } from 'react';

export function LinkRenderDefault({ to, closeMenu, children, ...props }) {
  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      closeMenu && closeMenu();
      window.location.href = to;
    },
    [closeMenu, window]
  );
  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export default LinkRenderDefault;
