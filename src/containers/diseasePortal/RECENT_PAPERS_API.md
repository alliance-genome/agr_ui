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

  | Corpus | Species (drives `<SpeciesIcon>`)                             |
  | ------ | ------------------------------------------------------------ |
  | MGI    | `Mus musculus`                                               |
  | RGD    | `Homo sapiens` _(rat corpus is shown as Human, per curator)_ |
  | XB     | `Xenopus tropicalis`                                         |
  | ZFIN   | `Danio rerio`                                                |
  | FB     | `Drosophila melanogaster`                                    |
  | WB     | `Caenorhabditis elegans`                                     |
  | SGD    | `Saccharomyces cerevisiae`                                   |

  `AGR` (Alliance central corpus) has no species of its own and is ignored; if a
  paper maps to no MOD species, the icon falls back to `Homo sapiens`.

The disease name is sourced from the page's existing `/api/disease/{doid}` query
(`doTerm.name`), so no new lookup table is needed. The root portal (DOID:4) never
renders this section (it only appears on detail routes).

### Query normalization: strip a trailing "disease" token

Because the endpoint requires **all** tokens of the query to match, a trailing
`disease` word both **excludes** on-topic papers that don't repeat the word and
lets the common word `disease` pull in **tangential** papers. So `PapersSection`
strips a trailing `disease` token before querying (`/\s+disease$/i`):

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
