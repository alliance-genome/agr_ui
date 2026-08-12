# Disease Portal — Recent Papers API

Status: **implemented** (endpoint live on stage; UI wired in `PapersSection.jsx`)
Branch: `feature/DPrecentpapersAPI`
Consumer: `src/containers/diseasePortal/PapersSection.jsx`

## Background

Each Disease Portal's "Recent Papers" list used to be **hand-curated** in
`src/containers/diseasePortal/portalData.js` as a `publications: [{ curie }]`
array, with `PapersSection.jsx` fetching each reference individually via
`/api/reference/{curie}`. That is now replaced by a single call to a shipped
AGR-API endpoint that returns the newest literature per MOD corpus for a
disease.

> **History:** earlier planning assumed a new endpoint keyed by **DOID**
> (topic-entity-tag match) returning results **grouped by species**, backed by a
> server-side proxy to the Alliance Bibliography Corpus (ABC). The endpoint that
> actually shipped is different and simpler — a **free-text** search returning a
> **flat** list — so the contract below documents reality. The companion
> `RECENT_PAPERS_BACKEND_SCOPE.md` (the ABC-proxy build plan) is obsolete and has
> been removed.

> **Why free-text matching, not DOID (intentional — do not "fix" back to DOID):**
> The whole purpose of this section is to surface the _most recent_ literature.
> DOID-to-paper association is **curated**, which takes time — and the lag
> differs per MOD corpus. Matching on DOID would therefore systematically miss
> brand-new papers that haven't been annotated yet, and would be skewed by each
> MOD's curation backlog. Free-text matching of the disease name against title +
> abstract surfaces papers _ahead_ of curation. The trade-off is accepted:
> looser precision (an occasional paper that only mentions the disease in
> passing) in exchange for freshness. This is why the list barely overlaps the
> old hand-curated `publications` arrays — those are the older, already-annotated
> papers this feature is meant to get ahead of.

## Endpoint

```
GET /api/reference/latest-literature-by-disease-per-mod?disease={text}&latest={n}
```

| Param     | In    | Required | Default | Notes                                                                                                                                                                             |
| --------- | ----- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disease` | query | yes      | —       | **Free text**, matched against publication **title and abstract**. The UI passes the disease's display name (`doTerm.name` from `/api/disease/{doid}`), e.g. `diabetes mellitus`. |
| `latest`  | query | no       | —       | Max papers **per MOD corpus** (NOT a global total). UI uses `1`.                                                                                                                  |

### Selection / ordering

The backend runs the search per MOD corpus and returns the newest `latest`
publication(s) for each, as a **flat** list (newest-first within each corpus).
With `latest=1` this yields roughly one paper per corpus (~7–8 entries,
including the Alliance central `AGR` corpus).

**UI note:** the `AGR` central-corpus entry has no species of its own but is
itself a member of one or more MOD corpora, so it renders the same icon(s) as
those MODs' dedicated papers — looking like a duplicate (e.g. two "mouse"
papers). `PapersSection` drops the AGR entry, but only when it is **redundant**:
an AGR paper is frequently the _sole_ carrier of a species for a disease (e.g.
the only RGD/SGD/WB paper), so a blanket drop of every `AGR`-tagged row silently
removes that species (measured ~15% of diseases). The UI therefore drops an AGR
row only when every MOD species it carries is already covered by a non-AGR row,
and additionally dedupes repeated curies (the backend can return one paper in
two corpus slots). The clean long-term fix is backend-side (exclude `AGR` from
the per-corpus grouping, or expose which slot each paper filled).

### Backend follow-ups (needs discussion — do NOT implement UI-side)

Two known problems with per-corpus selection. Both belong in the API, because
selection is where the ranking already happens; the UI can only compensate for
it. Recorded Aug 11 2026, pending discussion.

**1. Exclude the `AGR` corpus from per-corpus grouping** (or expose which slot
each paper filled). This is the duplicate-row problem above; it would retire the
~18-line redundancy filter in `PapersSection.jsx`.

**2. Filter out reviews — ideally a param** (`excludeTypes=Review` /
`includeReviews=false`) rather than hardcoded, so the behavior stays visible to
callers. Curator request, Aug 11 2026: papers with a PubMed publication type of
`Review` are frequently the newest hit for a corpus while being only marginally
on-topic, since a review can name-drop a disease once in a list of conditions.

Measured on the autism portal (`disease=autism&latest=1`): 2 of 8 rows are
reviews — MGI (`P-Rex Rac-GEFs`, autism appears once, in "linked to fibrotic
diseases, asthma, and autism spectrum disorders") and SGD (`A comprehensive
review on DDX3X liquid phase condensation…`). The next non-review MGI paper is
`AGRKB:101000001305569`, "Cortical development dynamics across autism spectrum
disorder mouse models" (_Nature_, 2026-08-01) — squarely on topic, and only one
month older, so almost no freshness is lost.

`pubmed_types` is already in the response (e.g.
`['Journal Article', 'Review']`), so this is _technically_ doable in the UI —
but it shouldn't be, for three reasons:

- With `latest=1` the backend sends only the newest paper per corpus, so
  filtering **removes** the row rather than replacing it: the mouse and yeast
  rows would simply disappear. A UI fix therefore has to over-fetch
  (`latest=5`+) and re-run the per-corpus pick, duplicating backend logic and
  inflating the payload ~5×.
- Even then it silently drops a species whenever every fetched paper for a
  corpus happens to be a review.
- Match on the exact string `Review`. `pubmed_types` also carries values like
  `Research Support, Non-U.S. Gov't` alongside `Journal Article`; a substring
  match would additionally catch things like `Scientific Integrity Review`.

## Response

Standard `JsonResultResponse` envelope:

```jsonc
{
  "results": [
    {
      "category": "literature_summary",
      "searchable": false,
      "literatureSummary": {
        "curie": "AGRKB:101000001302046",
        "citation": "O'Reilly L; ... (2026) Acute and resolving ... Diabetologia 69(5):1249-1264",
        "short_citation": "O'Reilly L (2026) Diabetologia 69(5):1249-1264",
        "mods_in_corpus": ["MGI"], // authoritative corpus membership
        "cross_references": [
          { "curie": "PMID:41454012", "is_obsolete": "false" },
          { "curie": "DOI:10.1007/s00125-025-06638-6", "is_obsolete": "false" },
          { "curie": "MGI:8317137", "is_obsolete": "false" },
        ],
        "date_published": "2026-05-01",
        // ...many other fields: title, abstract, authors, mesh_terms, etc.
      },
    },
    // ... one or more per MOD corpus
  ],
  "total": 8,
  "returnedRecords": 8,
  "requestDuration": "...",
  "requestDate": "...",
}
```

`literatureSummary` is the **same shape** returned by `GET /api/reference/{curie}`,
so the citation and cross-references are already present — no per-paper follow-up
request is needed.

## UI consumption (`PapersSection.jsx`)

The component reads exactly what it renders:

- **`literatureSummary.curie`** — links to `/reference/{curie}`.
- **`literatureSummary.citation`** — rendered via `dangerouslySetInnerHTML`
  (may contain HTML).
- **`literatureSummary.mods_in_corpus`** — drives the species icon(s). This is
  the **authoritative** species source (set by the curator pipeline), replacing
  the old fragile cross-reference-prefix guessing. Fixed map:

  | Corpus | Species (drives `<SpeciesIcon>`)                                   |
  | ------ | ------------------------------------------------------------------ |
  | MGI    | `Mus musculus`                                                     |
  | RGD    | `Rattus norvegicus` _(per curator, June 2026; was `Homo sapiens`)_ |
  | XB     | `Xenopus tropicalis`                                               |
  | ZFIN   | `Danio rerio`                                                      |
  | FB     | `Drosophila melanogaster`                                          |
  | WB     | `Caenorhabditis elegans`                                           |
  | SGD    | `Saccharomyces cerevisiae`                                         |

  `AGR` (Alliance central corpus) has no species of its own and is ignored; if a
  paper maps to no MOD species, the icon falls back to `Homo sapiens`.

  The icon reflects **corpus membership, not the paper's study species** — RGD
  curates human disease literature alongside rat, so an RGD row is occasionally a
  human clinical-genetics paper wearing a rat icon (measured Aug 11 2026 across
  all portals: 2 of 8 — ciliopathy, a RAB34 compound-heterozygous variant paper,
  and long QT, a KCNH2 patient frameshift paper; the other 6 are rat studies). No
  fixed per-corpus icon avoids this, and it is the same class of problem as the
  review filter above: the honest fix is a per-paper species signal from the API
  rather than a per-corpus guess. `Rattus norvegicus` is the better default at
  6/8, which is why the curator switched to it in June 2026.

The disease name is sourced from the page's existing `/api/disease/{doid}` query
(`doTerm.name`), so no new lookup table is needed. The root portal (DOID:4) never
renders this section (it only appears on detail routes).

### Matching behavior (corrected Aug 11 2026)

An earlier version of this document stated that the endpoint requires **all**
tokens of the query to match. **That is wrong.** Measured behavior:

- Matching is **loose**, and the backend **fills every corpus slot even when
  nothing genuinely matches**. So extra tokens actively inject junk rather than
  narrowing: `autism spectrum disorder` returned a "broad-**spectrum**
  antibacterial" paper for WB and a Xenopus "pigmentary **disorders**" paper.
- **Quoting forces a phrase match**, and it works: `"long QT syndrome"` returns
  KCNH2 arrhythmia, KV7.1/KCNE1 and CALM1/2 papers, where the unquoted name
  returns kidney-aging and yeast-plasmid papers.
- But quoting only helps when the phrase is reasonably common in the MOD
  corpora. For autism it changed nothing, while cutting the query to the single
  distinctive token `autism` went from 6 mostly-noise rows to 8 on-topic ones.

Hence the two knobs: the trailing-"disease" strip below, and the per-portal
`papersQuery` override in `portalData.js` (quote the phrase, or cut to the
distinctive token — whichever the corpora reward). Note the endpoint is not
fully deterministic: two identical requests minutes apart returned different XB
rows, so expect some drift when spot-checking.

### Query normalization: strip a trailing "disease" token

Under the loose matching above, a trailing `disease` word is a common token that
pulls **tangential** papers into slots that would otherwise hold an on-topic one.
So `PapersSection` strips a trailing `disease` token before querying
(`/\s+disease$/i`):

| `doTerm.name`         | Query sent                                                 |
| --------------------- | ---------------------------------------------------------- |
| `Alzheimer's disease` | `Alzheimer's`                                              |
| `Parkinson's disease` | `Parkinson's`                                              |
| `diabetes mellitus`   | `diabetes mellitus` (unchanged — doesn't end in "disease") |

Measured impact (stage, June 2026, `latest=1`): for Parkinson's the result set
turns over almost entirely (1/8 overlap) and becomes 8/8 verifiably on-topic
(every result mentions "parkinson"), versus several visibly off-topic entries
with the full name. Alzheimer's similarly recovers on-topic papers that the full
phrase missed. Diabetes is unaffected. This normalization was chosen with the
curator over synonym-based or backend tokenization approaches.
