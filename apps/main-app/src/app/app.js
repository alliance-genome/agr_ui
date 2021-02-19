import React, { useMemo } from 'react';
import tw from 'twin.macro';
import { Route, Link } from 'react-router-dom';
import { AppShell } from '@wormbase/agr-app-shell';
import Menu from './components/Header/Menu';
import LinkContext from './components/Link/LinkContext';
import star from './star.svg';

export function App() {
  const linkContextValue = useMemo(
    () => ({
      renderLink: ({ to, handleClick, children }) => (
        <Link to={to} onClick={handleClick}>
          {children}
        </Link>
      ),
    }),
    []
  );
  return (
    <LinkContext.Provider value={linkContextValue}>
      <div>
        <header tw="flex bg-blue-500">
          <Menu></Menu>
        </header>
        <AppShell></AppShell>
        {/* START: routes */}
        {/* These routes and navigation have been generated for you */}
        {/* Feel free to move and update them to fit your needs */}
        <hr />
        <br />
        <div role="navigation">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/page-2">Page 2</Link>
            </li>
          </ul>
        </div>
        <Route
          path="/"
          exact
          render={() => (
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          )}
        />
        <Route
          path="/page-2"
          exact
          render={() => (
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          )}
        />
        <Route
          path="/:other"
          exact
          render={({ ...params }) => (
            <div>
              <pre>{JSON.stringify(params, null, 2)}</pre>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          )}
        />
        {/* END: routes */}
      </div>
    </LinkContext.Provider>
  );
}
export default App;
