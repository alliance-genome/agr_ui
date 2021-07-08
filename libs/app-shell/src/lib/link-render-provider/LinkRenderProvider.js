import React, { useContext, useMemo } from 'react';

const LinkContext = React.createContext({
  renderLink: () => {},
});

export function useRenderLink() {
  const context = useContext(LinkContext);
  if (context === undefined) {
    throw new Error('useRenderLink must be used within a LinkContext');
  }
  return context.renderLink;
}

export function LinkRenderProvider({ renderLink, children }) {
  const linkContextValue = useMemo(
    () => ({
      renderLink,
    }),
    [renderLink]
  );
  return (
    <LinkContext.Provider value={linkContextValue}>
      {children}
    </LinkContext.Provider>
  );
}
export default LinkRenderProvider;
