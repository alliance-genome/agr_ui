import React from 'react';

const GoControlsHelp = () => (
  <div>
    <p>There are three precomputed stringency options, described below.</p>

    <p>
      <b>1) Stringent (default)</b><br />
      Primary criterion: An ortholog called by 3 or more methods is included if
      it is a best count OR a best reverse count.<br />
      Secondary criteria: An ortholog predicted by ZFIN or HGNC is always
      included, regardless of count. An ortholog called by 2 methods is
      included if it is both a best count AND a best reverse count.
    </p>

    <p>
      <b>2) Moderate</b><br />
      Primary criterion: An ortholog called by 3 or more methods is included
      (regardless of best or best reverse status).<br />
      Secondary criteria (no change): An ortholog predicted by ZFIN or HGNC is
      always included, regardless of count. An ortholog called by 2 methods is
      included it is both a best count AND a best reverse count.
    </p>

    <p>
      <b>3) No filter</b><br />
      All orthologs are included.
    </p>

    <p>
      One of the 3 precomputed options must be selected. For maximum flexibility,
      select the "No filter" option.
    </p>

  </div>
);

export default GoControlsHelp;
