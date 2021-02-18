import React from 'react';
import { Route, Link } from 'react-router-dom';
import styled from '@emotion/styled';
const StyledAppShell = styled.div`
  color: pink;
`;
export function AppShell(props) {
  return (
    <StyledAppShell>
      <h1>Welcome to app-shell!</h1>

      <ul>
        <li>
          <Link to="/">app-shell root</Link>
        </li>
      </ul>
      <Route
        path="/"
        render={() => <div>This is the app-shell root route.</div>}
      />
    </StyledAppShell>
  );
}
export default AppShell;
