![project logo](https://raw.githubusercontent.com/alliance-genome/agr_ui/master/src/containers/layout/agrLogo.png)

# Alliance of Genome Resources UI

Front-end code for the Alliance of Genome Resources website.

This repository uses [Nx](https://nx.dev/react) to facilitate development of multiple apps and libraries in a single [monorepo](https://nx.dev/latest/react/core-concepts/why-monorepos).

The [Nx CLI](https://nx.dev/latest/react/getting-started/cli-overview) or the interactive [Nx Console]() is used to build, run, test apps and libs, as well as generating library or application code with modern tooling enabled (such as ESLint/TSlint, Prettier, Jest, Cypress, Storybook).

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

## Folder structure

**If you developed in this repo before it was reorganizated, you will find that code moved to [apps/main-app/](apps/main-app/).**

`apps/` contains frontend sites that cna be developed and deployed independently

`libs/` contains libraries shared across apps or publishable for used outside of this repo

`tools` contains scripts to run on the repo

`workspace.json` is where configuration for apps and libs are defined.

`package.json` all apps and libs share the same `package.json`, along with `package-lock.json` and `node_modules/` located at the root of the project. 

Dependencies installation for any app or library should happend at the **root** of the project.


## Development

Development in this repo will be done using a development server. This development server is configured to proxy API requests will be proxied to separate server based on [a configuration file like this one](apps/main-app/proxy.conf.json).

Using the development of the _default app_, also known as the [main-app](apps/main-app/).

To start the development server:

```bash
npm start main-app
```

OR

```
npm start
```

_Note while the `main-app` argument is optional in the command above, because `main-app` is the default app. If developing another app, it would need to be specified._

Once the development server is running, visit `http://localhost:2992` to see your development site. When you edit source files, the changes will automatically be compiled and updated in your browser.

## Tests

To run linter on source files:

```bash
npm run lint main-app
```

OR

```bash
npm run lint
```

Execute tests:

```bash
npm run test main-app
```

OR

```bash
npm run test
```


## Create a Library

To create a library interactively via CLI:

```bash

npm run nx generate @nrwl/react:library nameOfMylibrary
```

Or using a graphical interface via the [Nx Console VSCode plugin](https://nx.dev/latest/react/getting-started/console).

## Frameworks & Tools

- [React](https://reactjs.org/) for routing and building user interface components
- [Nx](https://nx.dev/) for consistent code generation and execution, and managing multiple node modules in one repo
- [Redux](https://redux.js.org/) and [Immutable](https://immutable-js.github.io/immutable-js/) for state management
- [Bootstrap](https://getbootstrap.com/), [reactstrap](https://reactstrap.github.io), [Sass](https://sass-lang.com/), [CSS Modules](https://github.com/css-modules/css-modules) for styling
- [Mocha](https://mochajs.org/) for testing
- [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/) for compiling and bundling
