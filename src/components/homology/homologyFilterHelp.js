function HomologyFilterHelp({ ortholog }) {
  let HOMOLOG = ortholog ? 'ortholog' : 'paralog';
  let DETERMINER = ortholog ? 'An' : 'A';
  return (
    <div>
      <p>
        There are three precomputed stringency options, described below. Note that not all the included methods have
        been applied to all the species within the Alliance, so the maximum counts differ for different pairs of
        species.
      </p>

      <p>
        <b>1) Stringent (default)</b>
        <br />
        Primary criterion: {DETERMINER} {HOMOLOG} called by 3 or more methods is included if it is a best count OR a
        best reverse count.
        <br />
        Secondary criteria: {DETERMINER} {HOMOLOG} predicted by ZFIN, HGNC, or Xenbase is always included, regardless of
        count. {DETERMINER} {HOMOLOG} called by 2 methods is included if it is both a best count AND a best reverse
        count.
      </p>

      <p>
        <b>2) Moderate</b>
        <br />
        Primary criterion: {DETERMINER} {HOMOLOG} called by 3 or more methods is included (regardless of best or best
        reverse status). <br />
        Secondary criteria (no change): {DETERMINER} {HOMOLOG} predicted by ZFIN or HGNC is always included, regardless
        of count. {DETERMINER} {HOMOLOG} called by 2 methods is included it is both a best count AND a best reverse
        count.
      </p>

      <p>
        <b>3) No filter</b>
        <br />
        All {HOMOLOG}s are included.
      </p>

      <p>
        One of the 3 precomputed options must be selected. The additional options are designed to further constrain the
        results of the selected precomputed option. For maximum flexibility, select the "No filter" option.
      </p>

      <p>
        In addition to stringency options, a specific species may be selected and/or a specific method may be selected.
        Note that the "Hide additional filters" button does NOT remove those filters. To remove additional filters the
        "Reset filters" button must be used.
      </p>
    </div>
  );
}

export default HomologyFilterHelp;
