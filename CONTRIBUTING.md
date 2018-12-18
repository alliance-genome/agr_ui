## Prerequisites

[Node.js](http://nodejs.org/) >= v4 must be installed.

## Installation

Running `npm install` in the components's root directory will install everything you need for development.

## Demo Development Server

`npm start` will run a development server with the component's demo app at [http://localhost:3000](http://localhost:3000) with hot module reloading.

## Demo Build Server

`npm run buildandserve` will build the package and then serve the demo. This is useful for verifying that the production build is legitimate.

## Preparing for `npm publish`

Use `npm run pack` to clean, build and `npm pack` the package, mostly to verify that the contents are what is desired. This generates a `genomefeatureviewer-<version>.tgz` file suitable for local `npm install genomefeatureviewer-<version>.tgz` in a different project. This is useful to ensure that you don't *waste* an `npm publish` on a broken package.

## Running Tests

- `npm test` will run the tests once.

- `npm run test:coverage` will run the tests and produce a coverage report in `coverage/`.

- `npm run test:watch` will run the tests on every change.

## Building

- `npm run build` will build the component for publishing to npm and also bundle the demo app.

- `npm run clean` will delete built resources.
