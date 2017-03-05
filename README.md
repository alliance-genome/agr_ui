[![Build Status](https://travis-ci.org/alliance-genome/agr.svg?branch=master)](https://travis-ci.org/alliance-genome/agr)

# Alliance of Genome Resources Prototype
An initial prototype for the web portal of the Alliance of Genome
Resources.

## Prerequisites

Ensure you've installed [pip][1] and [virtualenv][2] and [nodejs][3].
```bash
  Starting with Python 2.7.9, pip is included by default with the Python binary installers. 
  
  make sure the executables npm,node, pip, and virtualenv are accessible from /usr/local/bin  (MAC, Linux)
  if not create symbolic links as needed
  
  Make sure /usr/local/bin is in your PATH (MAC, Linux)
```
Create a virtualenv for isolating the python dependencies:

```bash

mkdir -p ~/.virtualenvs/agr
# The prototype currently requires Python2
# Assuming virtualenv and python2 are in your PATH
virtualenv -p python2 ~/.virtualenvs/agr
```
+## ENV variables

###AWS ES Service hosted
Add below to .bash_profile

```bash
export PRODUCTION=true
export ES_AWS=true
export ES_INDEX=es1
export ES_HOST="search-es1-oyqxarxm2djn35dfodzniituhe.us-west-2.es.amazonaws.com"
```

## Getting started With Virtualenv
### Install and start a local instance of [elasticsearch][8]
* Download ES package (I'm using [ES version 2.4.4][11] in my dev env)
* Install and start your local ES 
```bash
    a) cd to the directory where you downloaded ES (I downloaded elasticsearch-2.4.4.tar.gz)   
    b) tar -xvf elasticsearch-2.4.4.tar.gz   
    c) Start elasticsearch - cd elasticsearch-2.4.4/ and run bin/elasticsearch
    d) Check that ES is running - open a new terminal and run  curl http:://localhost:9200/
    e) Watch the ES console for errors 
    
```
### Fork your own copy of alliance-genome/agr to your git account
* login to your git account - or create one and login
* Go to [alliance-genome/agr][12] repository and click on "Fork" (top right)

### Clone and start your local agr instance - on your dev machine
* Clone your agr copy and checkout the development branch
```bash
   * git clone https://github.com/yourGitAccount/agr.git
   * cd agr
   * git checkout development
```
* Build, Index, and start local agr instance
```bash
    * cd agr
    * source ~/.virtualenvs/agr/bin/activate
    * make build  (to Setup dev working platform )
    # Assuming elasticsearch instance is up and running
    * make index  (to build ES indexes )   
    * make run    ( to start your local agr instance)
```
* Check that agr instance and elasticsearch are communicating
```bash
   go to http://127.0.0.1:5000 and start your search
   Watch the agr instance console, the ES console, and the web browser results
```

### To run tests
```bash
source ~/.virtualenvs/agr/bin/activate
make tests
```

## Docker

You can also use [Docker][7] to install and develop with the AGR web portal.  Advantages of
this include:

* No need to install elasticsearch
* Simplifies running multiple instances on a single host.
* No need for virtualenv environment.

### Getting started with Docker

#### Install [Docker and Docker Compose](https:///www.docker.com/products/overview)

Be sure to install both, some OS packages bundle them together and some do not.

#### Clone the git repo.

```bash
git clone https://github.com/alliance-genome/agr.git
cd agr
git checkout development
```

#### Build and start docker containers

`docker-compose up` or `docker-compose up -d` 

The `-d` option will put the containers in the background.

Once up, you should be able to access the server at http://localhost:5000/

Any changes to the React application should be rebuilt by the webpack container
and available via the above URL.

### Elasticsearch indexing

This command will call the `index` target in the Makefile and should be
used after your first start or if you want to re-index.

`docker-compose exec api make index`

### Useful commands

`docker-compose up` - Starts the 3 AGR web portal containers.  ^C shuts it down.

`docker-compose up -d` - Starts the 3 AGR web portal containers in the background.

`docker-compose ps` - Prints status of containers and their port mapping info.

`docker-compose stop [CONTAINER NAME]` - Stops the specified container or all if none given.

`docker-compose start [CONTAINER NAME]` - Starts the specified container or all if none given.

`docker-compose restart [CONTAINER NAME]` - Restarts the specified container or all if none given.

`docker-compose down` - Stops and removes all the container images.

`docker-compose down -v` - Stops and removes all the container images and their associated data volumes.

### Container Details

This Docker setup uses 3 containers to manage the AGR portal.

1. Elasticsearch - db
2. Flask server  - api
3. Webpack/node  - web

The Flask and Webpack containers expose external ports on 5000 and 2992 respectively.
The elasticsearch db container is exposed only to the Flask server container.

The webpack container uses the [hot module replacement][5].

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

[1]: https://pip.pypa.io/en/stable/installing/
[2]: https://virtualenv.pypa.io/en/stable/installation/
[3]: https://docs.npmjs.com/getting-started/installing-node
[4]: https://webpack.github.io/
[5]: https://webpack.github.io/docs/hot-module-replacement.html
[6]: http://eslint.org/
[7]: https://www.docker.com/
[8]: https://www.elastic.co/downloads/elasticsearch
[9]: https://nodejs.org
[10]: https://www.python.org/ftp/python
[11]: https://download.elastic.co/elasticsearch/release/org/elasticsearch/distribution/tar/elasticsearch/2.4.4/elasticsearch-2.4.4.tar.gz
[12]: https://github.com/alliance-genome/agr
