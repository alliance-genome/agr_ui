[![Build Status](https://travis-ci.org/alliance-genome/agr_ui.svg?branch=master)](https://travis-ci.org/alliance-genome/agr_ui)

# Alliance of Genome Resources UI

The web UI portal of the Alliance of Genome Resources.

## Developing with Docker

The following commands will get you inside of docker and ready to develop code

```bash
	docker pull agrdocker/agr_javascript_env
	docker run -v `pwd`:/workdir/agr_ui -p 2992:2992 -it agrdocker/agr_javascript_env:latest /bin/bash
  npm run docker-start
```

## Prerequisites

Ensure you've installed [nodejs][1].
```bash
  Install NodeJS, npm, etc.

  make sure the executables npm, and node are accessible from /usr/local/bin  (MAC, Linux)
  if not create symbolic links as needed
  
  Make sure /usr/local/bin is in your PATH (MAC, Linux)
```

## Getting started

### Setting up a local agr UI instance - or on a dev machine
* Clone your agr copy and checkout the development branch

```bash
	> git clone https://github.com/yourGitAccount/agr_ui.git
	> cd agr_ui
	> git status   #should show current branch being development if not git checkout development
	agr_ui> make      #( to Setup dev working platform )
	agr_ui> make run  #( to start your local agr UI instance default: localhost:2992 )
```

Now you are serving the webpack from your local machine. You should be able to use the UI and the URL would be: http://localhost:2992/ If you want to run this in a docker container vs running locally, see the [running docker][2] for more info. See also [starting local API][3] for more information.

### Local API instance

If you are looking to develop the API locally the following defaults will work:

```bash
	agr_ui> export API_URL=http://dev.alliancegenome.org
	agr_ui> export DEV_SERVER_UI_PORT=2992
	agr_ui> export JBROWSE_URL=http://jbrowse.alliancegenome.org
	agr_ui> export JBROWSE_PORT=80
```

### Point to remote API instance

If you don't want to run the API server locally you can point to the developement instance. Stop the running server and set these enviroment variables, first. 

```bash
	agr_ui> export API_URL=http://dev.alliancegenome.org
```

If you needed to start your local webpack dev server on a different port set the following:

```bash
	agr_ui> export DEV_SERVER_UI_PORT=2992
```

### To run tests
```bash
	make test
```

## Development Environment Pro Tips
Assets are compiled using [webpack][4]. 
To enable [hot module replacement][5] in your development environment,
run `npm start` while the dev server is running and refresh the page.
Subsequent JavaScript changes will go to your browser as a "hot
update" without refreshing.

You can run JavaScript unit tests automatically on each file change by
running `npm run test:watch`.

JavaScript coding style is enforced with [ESLint][6].
The rules are configured in the .eslintrc file.

[1]: https://docs.npmjs.com/getting-started/installing-node
[2]: ../doc/DOCKER.md
[3]: https://github.com/alliance-genome/agr_api
[4]: https://webpack.github.io/
[5]: https://webpack.github.io/docs/hot-module-replacement.html
[6]: http://eslint.org/
