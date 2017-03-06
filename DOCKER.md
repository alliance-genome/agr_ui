
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


