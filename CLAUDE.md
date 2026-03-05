# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Alliance of Genome Resources (AGR) UI - A React-based web application for genome research data.

**Tech Stack**: React 19, Redux, TanStack Query, React Router v7, Vite, TypeScript, SCSS Modules, Bootstrap 4

## Common Development Commands

### Initial Setup
```bash
npm run local-init          # First-time setup: installs nvm, dependencies, runs generators
```

### Development
```bash
npm start                   # Start dev server (requires local API at localhost:8080)
npm run start:test          # Connect to test API (https://test.alliancegenome.org)
npm run start:stage         # Connect to stage API (https://stage.alliancegenome.org)
API_URL=[CUSTOM_URL] npm start  # Connect to custom API URL
```

### Testing & Quality
```bash
make test                   # Run all tests (Jest)
npm test                    # Run tests (with watch mode options)
npm test -- --watchAll=false  # Run tests once without watch
make pretty                 # Format code with Prettier
npm run format              # Lint + format code
npm run lint                # Run ESLint
```

### Build
```bash
npm run build               # TypeScript check + Vite production build
npm run generators          # Generate robots.txt, sitemap, resource descriptors
```

### Deployment
```bash
make stage-ui-deploy        # Deploy to stage environment (AWS CDK)
make test-ui-deploy         # Deploy to test environment (AWS CDK)
make prod-ui-deploy         # Deploy to production environment (AWS CDK)
```

## Architecture Overview

### State Management Architecture

The application uses a **hybrid state management approach** - transitioning from Redux to TanStack Query:

**Redux (Legacy)**:
- Global UI state: page loading flags, search filters
- Uses Immutable.js for state updates
- Memoized selectors via `reselect`
- State shape: `{ search: {...}, loading: {...} }`

**TanStack Query (Modern)**:
- All data fetching (genes, diseases, alleles, tables)
- Configured with: no refetch on focus, no retries, infinite staleTime
- Custom hooks: `usePageLoadingQuery()`, `useDataTableQuery()`, `usePostDataTableQuery()`

**React Context**:
- `ReleaseContextProvider` - Release version info available via `useRelease()`

**Decision Pattern**:
- Use TanStack Query for new data fetching
- Use Redux only for global UI state that crosses multiple pages
- Use local component state (useState) for form inputs and UI toggles

### Directory Structure

```
src/
├── containers/        # Page-level components (owns routing and data fetching)
├── components/        # Reusable presentational components
├── hooks/            # Custom React hooks (data fetching, state logic)
├── lib/              # Utilities, helpers, store config
├── reducers/         # Redux reducers (uses Immutable.js)
├── actions/          # Redux action creators
├── selectors/        # Redux selectors (memoized)
├── routes.jsx        # Route definitions
├── constants.js      # Global constants (species, categories, URLs)
└── environments/     # Environment configs
```

**Key Pattern**: Containers fetch data and handle logic, Components present UI and receive props.

### API Integration

**Base URL**: Set via `API_URL` environment variable
- Development: `http://localhost:8080` (proxied via Vite)
- Test: `https://test.alliancegenome.org`
- Stage: `https://stage.alliancegenome.org`

**Fetch Wrapper**: `src/lib/fetchData.js`
- 30-second default timeout
- Returns custom `ApiError` on failures
- Supports AbortController for cancellation

**Vite Proxy**: Auto-proxies `/api`, `/jbrowse`, `/bluegenes`, `/swagger-ui`, `/openapi` to API_URL

**Endpoint Pattern**:
```
/api/disease/{id}      # Entity details
/api/gene/{id}
/api/allele/{id}
/api/search            # Search with query params
/api/releaseInfo       # Version info
```

### Routing

Defined in `src/routes.jsx` using React Router v7:
- All routes wrapped in `<Layout>` for consistent header/footer
- URL params extracted with `useParams()` hook
- Pattern: `/gene/:id`, `/disease/:id`, `/allele/:id`, `/variant/:id`
- Catch-all route `/:slug` for WordPress pages

### Data Page Architecture

Most entity pages (genes, diseases, alleles) follow this pattern:

1. **Container** (`containers/{entity}Page/index.jsx`)
   - Uses `usePageLoadingQuery()` to fetch entity data
   - Dispatches Redux loading actions for global loading bar
   - Passes data to child components

2. **Page Layout** (via `components/dataPage/`)
   - `<PageNav>` - Left sidebar with jump links to sections
   - `<PageHeader>` - Title and basic info
   - `<PageData>` - Main content with sections

3. **Data Tables** (via `components/dataTable/`)
   - Uses `useDataTableQuery()` for server-side pagination/filtering
   - Built on `react-bootstrap-table-next`
   - Supports sorting, filtering, pagination

### Custom Hooks Pattern

The codebase heavily uses custom hooks to encapsulate data fetching:

**Common Hooks**:
- `usePageLoadingQuery(url)` - Fetch single entity + Redux loading integration
- `useDataTableQuery(url, config, initialState)` - Paginated/filtered tables
- `usePostDataTableQuery()` - POST-based table queries
- `useAlleleSelection()` - Complex multi-step form state

When adding data fetching, follow this pattern: create a custom hook that wraps TanStack Query's `useQuery()`.

### Search Architecture

Search uses **Redux** for state management (cross-component):
1. User submits query to `/api/search`
2. Action dispatches `SEARCH_RESPONSE` with results
3. `searchReducer` parses and indexes results by category
4. Components subscribe via selectors: `selectResults()`, `selectActiveCategory()`
5. Results enhanced with search highlights via `searchParsers.js`

Search state persists across navigation to allow "back button" functionality.

### Styling Conventions

- **Global styles**: `src/style.scss`, `src/_theme.module.scss`, `src/_mixins.module.scss`
- **Component styles**: Co-located `style.module.scss` files (CSS Modules)
- **Bootstrap 4**: Via `reactstrap` and `react-bootstrap` components
- **Emotion**: Used sparingly for dynamic styles

Import module styles: `import styles from './style.module.scss'` then use `className={styles.myClass}`.

### Important Constants

`src/constants.js` contains centralized configuration:
- `SPECIES` - Species metadata indexed by taxon ID
- `DATA_CATEGORIES` - Search categories and labels
- `STRINGENCY_HIGH/MED/LOW` - Orthology confidence levels
- URL building utilities: `makeId()`, `makeDiseaseDoId()`

### Resource Identification

Resources use **CURIE format**: `PREFIX:ID` (e.g., `MGI:95570`, `DOID:14330`)
- Parsed and validated throughout the application
- Cross-references link to external databases

### Generator Scripts

The `npm run generators` command builds static files:
- `bin/build_robots.js` - Generates robots.txt
- `bin/build_sitemap.js` - Generates sitemap.xml from routes
- `bin/build_resource_descriptors.js` - Generates resource metadata

These run automatically before builds via `prebuild` script.

### Testing Conventions

- **Framework**: Jest + React Testing Library
- **Location**: Co-located with source files (`.test.jsx`, `.spec.jsx`)
- **Run single test**: `npm test -- path/to/test.test.js`
- **Coverage**: Not currently configured

Tests mock Redux store using `redux-mock-store`.

### TypeScript Migration

The codebase is partially TypeScript:
- Config files: `.ts`
- Most components: `.jsx` (JavaScript with JSX)
- Strict mode enabled for new TypeScript files
- Add type annotations when creating new `.tsx` files

### Git Workflow

- **Main branch**: `stage` (use this for PRs)
- **Current branch**: Check `git status` to see active branch
- **Feature branches**: Named `KANBAN-###` (Jira ticket numbers)
- **Branch previews**: AWS Amplify provides preview URLs for feature branches

When making PRs, target the `stage` branch, not `main`.

### Branch Preview Testing

AWS Amplify provides preview deployments:
1. Create PR from `KANBAN-###` branch to `test` (don't merge)
2. Visit AWS Amplify console: https://us-east-1.console.aws.amazon.com/amplify/
3. Find your branch preview URL (e.g., `https://kanban-###.d39tao9vl33upy.amplifyapp.com/`)
4. Share URL for testing before merging

### Component Organization

**Containers** (`src/containers/`):
- `genePage/` - Gene detail pages
- `diseasePage/` - Disease detail pages
- `allelePage/` - Allele/variant pages
- `search/` - Search interface
- `layout/` - Site-wide layout wrapper
- `homepage/` - Landing page
- `diseasePortal/` - Disease portal
- Many specialized pages (40+ containers)

**Components** (`src/components/`):
- `dataTable/` - Table implementations
- `dataPage/` - Page layout components
- `homology/` - Orthology displays
- `disease/` - Disease-specific widgets
- `expression/` - Expression comparison
- 50+ reusable component directories

### Analytics

Google Analytics 4 integration via `react-ga4`:
- Initialized in `src/lib/analytics.js`
- Tracks page views automatically via route changes
- Event tracking available via `logAnalyticsEvent()`

### Notable Dependencies

- `genomefeatures` - Custom genome visualization (from GitHub)
- `generic-sequence-panel` - Sequence display component
- `react-bootstrap-table-next` - Data tables
- `immutable` - Immutable data structures for Redux
- `@tanstack/react-query` - Modern data fetching

### Environment Variables

Exposed to frontend via Vite:
- `NODE_ENV` - Development/production mode
- `API_URL` - Backend API base URL
- `REACT_APP_JBROWSE_AGR_RELEASE` - JBrowse version

Set via shell or `.env` file.

### WordPress Integration

Some pages fetch from WordPress API:
- Uses `src/lib/fetchWordpress.js` wrapper
- Catch-all route (`/:slug`) loads WordPress pages
- WordPress content rendered with `html-react-parser`

### Key Files to Understand

1. `src/reactApplication.jsx` - App root with providers (Redux, TanStack Query, Router)
2. `src/routes.jsx` - All route definitions
3. `src/lib/configureStore.js` - Redux store setup
4. `src/lib/fetchData.js` - API fetch wrapper
5. `src/constants.js` - Global constants
6. `vite.config.ts` - Build config and API proxy
7. `src/hooks/useDataTableQuery.js` - Table data fetching pattern

### Common Patterns

**Fetching entity data**:
```javascript
const { data, isLoading, isError } = usePageLoadingQuery(`/api/gene/${geneId}`);
```

**Fetching table data**:
```javascript
const { data, isLoading, tableState, setTableState } = useDataTableQuery(
  '/api/gene/MGI:123/phenotypes',
  { sizePerPage: 10, ...config }
);
```

**Redux selectors**:
```javascript
const isLoading = useSelector(selectPageLoading);
```

**Accessing release info**:
```javascript
const release = useRelease();
// { releaseVersion, apiReleaseDate, ... }
```

**Building URLs**:
```javascript
import { getResourceUrl } from './constants';
const url = getResourceUrl('MGI:95570');
```

### When Adding Features

1. **New entity pages**: Follow container/component pattern, use `usePageLoadingQuery()`
2. **New tables**: Use `useDataTableQuery()` or create domain-specific hook
3. **New global state**: Add to Redux only if truly global (prefer local state)
4. **New utilities**: Add to `src/lib/utils.js` or create new file in `lib/`
5. **New routes**: Add to `src/routes.jsx`
6. **New components**: Create in `components/` if reusable, `containers/` if page-level

### Performance Considerations

- TanStack Query caches all API responses indefinitely (staleTime: Infinity)
- Use React.memo() for expensive component renders
- Tables virtualize large datasets via react-bootstrap-table
- Redux uses Immutable.js for efficient change detection
- Vite code-splits routes automatically

### Common Issues

- **"nvm: command not found"**: Manually run `nvm install` then `npm install`
- **Package conflicts when switching branches**: Run `rm -rf node_modules` before `npm install`
- **API timeout errors**: Default 30s timeout, check network/backend
- **Proxy not working**: Ensure path starts with `/api`, `/jbrowse`, etc.
