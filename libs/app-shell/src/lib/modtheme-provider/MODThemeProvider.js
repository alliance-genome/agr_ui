import React from 'react';
import { Global } from '@emotion/react';
import { css } from 'twin.macro';

const stylesBase = css`
  .agr {
    --mod-primary: #2598c5;
  }

  .wormbase {
    --mod-primary: #1e40af;
  }

  .sgd {
    --mod-primary: #696599;
  }

  .zfin {
    --mod-primary: teal;
  }

  .flybase {
    --mod-primary: #036;
  }

  .mgd {
    --mod-primary: #0ea5e9;
  }

  .rgd {
    --mod-primary: #2865a3;
  }

  .goc {
    --mod-primary: #00174f;
  }
`;

export function MODThemeProvider({ mod = 'agr', children }) {
  return (
    <>
      <Global styles={stylesBase} />
      <div className={mod}>{children}</div>
    </>
  );
}
export default MODThemeProvider;
