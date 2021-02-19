import React, { useCallback } from 'react';

export function LinkRenderDefault({ to, handleClick: closeMenu, children }) {
  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      closeMenu();
      window.location.href = to;
    },
    [closeMenu, window]
  );
  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default LinkRenderDefault;
