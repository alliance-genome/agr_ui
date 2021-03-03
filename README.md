![project logo](https://raw.githubusercontent.com/alliance-genome/agr_ui/master/src/containers/layout/agrLogo.png)

# Alliance of Genome Resources UI

Front-end code for the Alliance of Genome Resources website.

## Prerequisites

nvm is used to manage Node.js versions. [Follow these instructions](https://github.com/nvm-sh/nvm#installing-and-updating) to install nvm.

It is not strictly required, but highly recommended that you have configured your development environment to use [EditorConfig](https://editorconfig.org/) and [ESLint](https://eslint.org/docs/user-guide/integrations).

## Installation

Ensure the correct version of Node.js is installed and active:

```bash
nvm use
```

Install dependencies after first cloning the repository or after pulling in new changes to `package.json`:

```bash
npm install
```

## Development

Most development will be done using [webpack-dev-server](https://webpack.js.org/configuration/dev-server/). API requests will be proxied to separate server if a `API_URL` environment variable is set. Otherwise, it is expected that an API server is running on `localhost:8080`:

```bash
# if not running API locally
export API_URL=https://build.alliancegenome.org
```

To start webpack-dev-server:

```bash
npm start
```

Once webpack-dev-server is running visit `http://localhost:2992` to see your development site. When you edit source files, the changes will automatically be compiled and updated in your browser.

In rare cases where you need to specifically test the application as a production bundle run:

```bash
npm run serve
```

This will produce a production webpack bundle and [serve](https://github.com/tapio/live-server) it on `http://localhost:8080`.

## Tests
To run ESLint on source files and execute Mocha tests:
```bash
npm test
```

## Frameworks & Tools

* [React](https://reactjs.org/) for routing and building user interface components
* [Redux](https://redux.js.org/) and [Immutable](https://immutable-js.github.io/immutable-js/) for state management
* [Bootstrap](https://getbootstrap.com/), [reactstrap](https://reactstrap.github.io), [Sass](https://sass-lang.com/), [CSS Modules](https://github.com/css-modules/css-modules) for styling
* [Mocha](https://mochajs.org/) for testing
* [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/) for compiling and bundling
