# Alliance of Genome Resources UI

Frontend code for the Alliance of Genome Resources website.

---

## Overview

This repo utilizes these technologies:
- [vite](https://vite.dev/) - bundler/compiler
- [npm](https://www.npmjs.com/) - package manager
- [react (JS & TS)](https://reactjs.org/) - framework
- [react-router](https://reactrouter.com/home) - routing
- [scss (w/modules)](https://sass-lang.com/), [bootstrap](https://getbootstrap.com/), [reactstrap](https://reactstrap.github.io), [emotion](https://emotion.sh/docs/styled) - styling
- [react testing library](https://testing-library.com/docs/react-testing-library/intro), [jest](https://jestjs.io/) - testing
- [redux](https://redux.js.org/), [context](https://react.dev/reference/react/useContext), [immutable](https://immutable-js.github.io/immutable-js/) - state management
- [tanstack query (formerly react query)](https://tanstack.com/query/v3/docs/react/overview) - http/async request handling

## Installation

1) This repo depends on nvm to manage Node.js versions. [Follow these instructions](https://github.com/nvm-sh/nvm#installing-and-updating) to install nvm.
2) Run: `npm run local-init`
   - **Note**: If you are switching to a branch that uses vite from a branch that uses create react app or vise vesa, it is wise to run `rm -rf node_modules` (from the repo's root directory) first to avoid package version conflicts.
   - You may run into an issue with an "nvm: command not found" error, in that case, you can run these commands manually:
     - `nvm install`
     - `npm install`
     - `npm run generators`
3) You can now run the project locally in one of the following ways:
   - `npm start`: when you have the API running locally
   - `npm run start:test`: to connect to the test API
   - `npm run start:stage`: to connect to the stage API
   - `API_URL=[CUSTOM_URL_HERE] npm start`: for connecting to a custom API URL
4) Navigate to `localhost:3000` (or whichever port number is displayed in the console) to view the site

## Build

To build an app or lib for production and to also to build the resource descriptors file when running locally:

```bash
npm run build 
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

