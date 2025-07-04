
# Alliance of Genome Resources UI

Frontend code for the Alliance of Genome Resources website.

## Claude Code Review Testing
This change tests the new threshold strategy:
- Skip threshold: ≤3 lines (bottom 10%)
- Standard review: 3-40 lines (middle 40%)
- Zen review: >40 lines (top 50%)

This PR should trigger a ZEN REVIEW with O3 model.

### Testing Zen Review Activation
When this PR is created, it should:
1. Detect >40 lines changed
2. Enable zen tools in the workflow
3. Run mcp__zen__codereview with O3 model
4. The review should explicitly confirm if O3 was used

Please include in your review:
- Confirmation that zen tools were enabled
- Confirmation that O3 model was used
- Raw output from the zen codereview tool

### Additional Test Content
Adding more lines to ensure we exceed the 40-line threshold:

#### Section 1: Architecture Overview
The Alliance of Genome Resources UI is built with modern web technologies:
- React for component-based UI development
- Redux for state management
- React Query for server state and caching
- Bootstrap and Sass for styling
- Webpack for bundling

#### Section 2: Development Workflow
Our development process includes:
- Feature branch development
- Automated PR reviews with Claude Code
- Unit testing with React Testing Library
- E2E testing capabilities
- Continuous integration and deployment

#### Section 3: Performance Considerations
Key performance optimizations:
- Code splitting for faster initial loads
- Lazy loading of route components
- Optimized bundle sizes
- Efficient state management patterns
- Caching strategies with React Query

#### Section 4: Security Best Practices
Security measures in place:
- Input validation and sanitization
- XSS prevention strategies
- Secure API communication
- Authentication and authorization
- Regular dependency updates

This extensive change should definitely trigger the zen review!

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
npm install --legacy-peer-deps
```

_Note: the command uses **npm**, not nvm. NPM deals with package dependencies._

## Build

To build an app or lib for production and to also to build the resource descriptors file when running locally: 

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
make test
```

## AWS - Feature Branch Previews
Provides a way to verify the story in the test environment (without merging code). Once the branch is merged into test, the branch preview is deleted.

#### _GitHub_
Create a pull request of your branch KANBAN-# into test (_don't merge_).
#### _AWS_
Browse to https://us-east-1.console.aws.amazon.com/amplify/home?region=us-east-1#/

Click on the 'agr-ui-test'  View App button

Look for your KANBAN-# branch and copy the url(eg:  https://kanban-568.d39tao9vl33upy.amplifyapp.com/). Use this url for testing the story (send to curator), before merging code into the test branch. Once testing is complete, merge your branch into test.

## Frameworks & Tools

- [React](https://reactjs.org/) for routing and building user interface components
- [Redux](https://redux.js.org/), [Immutable](https://immutable-js.github.io/immutable-js/), and [React Query](https://tanstack.com/query/v3/docs/react/overview) for state management
- [Bootstrap](https://getbootstrap.com/), [reactstrap](https://reactstrap.github.io), [Sass](https://sass-lang.com/), [CSS Modules](https://github.com/css-modules/css-modules) for styling
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for testing
- [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/) for compiling and bundling

