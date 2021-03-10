![project logo](https://raw.githubusercontent.com/alliance-genome/agr_ui/master/src/containers/layout/agrLogo.png)

# Alliance of Genome Resources UI

Front-end code for the Alliance of Genome Resources website.

## Prerequisites

nvm is used to manage Node.js versions. [Follow these instructions](https://github.com/nvm-sh/nvm#installing-and-updating) to install nvm.

It is not strictly required, but highly recommended that you have configured your development environment to use [EditorConfig](https://editorconfig.org/) and [ESLint](https://eslint.org/docs/user-guide/integrations).

## Installation

Ensure the correct version of Node.js is **installed**, if using the particular version of Node.js for the same time:

```bash
nvm install
```

\_Note: the command uses **nvm**, not npm. Nvm deals with the version of Node.js itself.

Ensure the correct version of Node.js is **activated**:
(Applicable every time when changing into the directory for this project)

```bash
nvm use
```

Install dependencies after first cloning the repository or after pulling in new changes to `package.json`:

```bash
npm install
```

\_Note: the command uses **npm**, not nvm. NPM deals with package dependencies.

## Development

This repository uses [Nx](https://nx.dev/react) to facilitate development of multiple apps and modules in a single [monorepo](https://nx.dev/latest/react/core-concepts/why-monorepos).

At the moment, we are primarily concerned with the [main-app](apps/main-app/) that is derived from the previous content of this repository.

Most frontend development will be done using a development server. This development server is configured to proxy API requests will be proxied to separate server based on [a configuration file like this one](apps/main-app/proxy.conf.json).

To start the development server:

```bash
npm start main-app
```

\_Please note while the `main-app` argument is optional in the command above, because `main-app` is the default app. If developing another app, it would need to be specified.

Once the development server is running, visit `http://localhost:2992` to see your development site. When you edit source files, the changes will automatically be compiled and updated in your browser.

## Tests

To run linter on source files:

```bash
npm run lint main-app
```

Execute tests:

```bash
npm run test main-app
```

## Frameworks & Tools

- [React](https://reactjs.org/) for routing and building user interface components
- [Nx](https://nx.dev/) for consistent code generation and execution, and managing multiple node modules in one repo
- [Redux](https://redux.js.org/) and [Immutable](https://immutable-js.github.io/immutable-js/) for state management
- [Bootstrap](https://getbootstrap.com/), [reactstrap](https://reactstrap.github.io), [Sass](https://sass-lang.com/), [CSS Modules](https://github.com/css-modules/css-modules) for styling
- [Mocha](https://mochajs.org/) for testing
- [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/) for compiling and bundling
