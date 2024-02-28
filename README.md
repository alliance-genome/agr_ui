
# Alliance of Genome Resources UI

Frontend code for the Alliance of Genome Resources website.

## Folder structure

`package.json`, `package-lock.json` and `node_modules/` track the dependencies for by all apps and libs. This means that dependencies installation for any app or library should happend at the **root** of the project.

## Prerequisites

nvm is used to manage Node.js versions. [Follow these instructions](https://github.com/nvm-sh/nvm#installing-and-updating) to install nvm.

## Installation

Ensure the correct version of Node.js is **installed**, if using the particular version of Node.js for the first time:

```bash
nvm install
```

_Note: the command uses **nvm**, not npm. Nvm deals with the version of Node.js itself._

Ensure the correct version of Node.js is **activated**:
(Applicable every time when changing into the directory for this project)

```bash
nvm use
```

Install dependencies after first cloning the repository or after pulling in new changes to `package.json`:

```bash
npm install
```

_Note: the command uses **npm**, not nvm. NPM deals with package dependencies._

## Build

To build an app or lib for production

```bash
npm run build 
```

## Development

### Development of the [App](/src)

[/src](/src) holds most of the AGR UI code written before the re-organization of this repo.

To start the development server:

```
npm start
```

The development server will be started at [http://localhost:3000](http://localhost:3000).

When you edit source files, the changes will automatically be compiled and updated in your browser.

The development server proxies API requests to the API server. The API server can be specified using the `API_URL` environment variable.

If need be the API_URL can be changed by setting it on the command line before running the UI:

```bash
>	export API_URL=https://stage.alliancegenome.org; npm start # to send proxied requests to the stage server.
```

Additionally, there are two convenience commands that will proxy `/api` requests to either the stage or test environments

```bash
> make uirunstage
```

```bash
> make uiruntest
```

## Tests

Execute tests:

```bash
npm run test  
```
## Frameworks & Tools

- [React](https://reactjs.org/) for routing and building user interface components
- [Redux](https://redux.js.org/), [Immutable](https://immutable-js.github.io/immutable-js/), and [React Query](https://tanstack.com/query/v3/docs/react/overview) for state management
- [Bootstrap](https://getbootstrap.com/), [reactstrap](https://reactstrap.github.io), [Sass](https://sass-lang.com/), [CSS Modules](https://github.com/css-modules/css-modules) for styling
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for testing
- [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/) for compiling and bundling

