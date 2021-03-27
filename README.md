![project logo](https://raw.githubusercontent.com/alliance-genome/agr_ui/master/src/containers/layout/agrLogo.png)

# Alliance of Genome Resources UI

Front-end code for the Alliance of Genome Resources website.

This repository uses [Nx](https://nx.dev/react) to facilitate development of multiple apps and libraries in a single [monorepo](https://nx.dev/latest/react/core-concepts/why-monorepos).

The [Nx CLI](https://nx.dev/latest/react/getting-started/cli-overview) or the interactive [Nx Console]() is used to build, run, test apps and libs, as well as generating library or application code with modern tooling enabled (such as ESLint/TSlint, Prettier, Jest, Cypress, Storybook).

## Folder structure

**If you developed in this repo before it was reorganizated, you will find that code moved to [apps/main-app/](apps/main-app/).**

`apps/` contains frontend sites that can be developed and deployed independently

`libs/` contains shared libraries across apps. These libaraies can be published for use outside of this repo. But publishing a library is not necessary for using it within the repo.

`package.json`, `package-lock.json` and `node_modules/` track the dependencies for by all apps and libs. This means that dependencies installation for any app or library should happend at the **root** of the project.

`workspace.json` is where configuration for apps and libs are defined.

## Prerequisites

nvm is used to manage Node.js versions. [Follow these instructions](https://github.com/nvm-sh/nvm#installing-and-updating) to install nvm.

It is not strictly required, but highly recommended that you have configured your development environment to use [EditorConfig](https://editorconfig.org/) and [ESLint](https://eslint.org/docs/user-guide/integrations).

## Installation

Ensure the correct version of Node.js is **installed**, if using the particular version of Node.js for the same time:

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

## Development

### Development of the [Main App](apps/main-app/)

[apps/main-app/](apps/main-app/) holds most of the AGR UI code written before the re-organization of this repo.

Development is done using a webpack development server, which is configured using [these configurations](apps/main-app/webpack.js).

To start the development server:

```
npm start
```

Once the development server is running, visit `http://localhost:2992` to see your development site. When you edit source files, the changes will automatically be compiled and updated in your browser.

This development server proxies API requests to the server specified in `API_URL`. By default, that is `https://build.alliancegenome.org`.

For example, running the following command **before** starting the development server sends proxied requests to the stage server.

```bash
export API_URL=https://stage.alliancegenome.org
```

### Development of Additional Apps

To start the development environment for other apps found in [apps](apps/), the command can be run with the respective app name.

Take the [example-app](apps/example-app/) for example, to start the development server, run:

```bash
npm start example-app
```

## Tests

To run linter on source files:

```bash
npm run lint  # for the main-app
```

OR

```bash
npm run lint [app-name]  # for other apps or libs
```

Execute tests:

```bash
npm run test  # for the main-app
```

OR

```bash
npm run test [app-name]  # for other apps or libs
```

## Build

To build an app or lib for production

```bash
npm run build --prod # for the main-app
```

OR

```bash
npm run build [app-name] --prod # for other apps or libs
```

## Create a Shared Library

To create a library interactively via CLI:

```bash

npm run nx generate @nrwl/react:library [lib-name]
```

Or using a graphical interface via the [Nx Console VSCode plugin](https://nx.dev/latest/react/getting-started/console).

## Frameworks & Tools

- [React](https://reactjs.org/) for routing and building user interface components
- [Nx](https://nx.dev/) for consistent code generation and execution, and managing multiple node modules in one repo
- [Redux](https://redux.js.org/) and [Immutable](https://immutable-js.github.io/immutable-js/) for state management
- [Bootstrap](https://getbootstrap.com/), [reactstrap](https://reactstrap.github.io), [Sass](https://sass-lang.com/), [CSS Modules](https://github.com/css-modules/css-modules) for styling
- [Mocha](https://mochajs.org/) for testing
- [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/) for compiling and bundling
