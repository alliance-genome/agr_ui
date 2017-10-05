all: install build test

install:
	npm install
build:
	npm run build
test:
	npm test
run:
	npm start

docker-build-nginx:
	docker build --build-arg NODE_ENV=production -t agrdocker/agr_ui_server -f Dockerfile_nginx .

push:
	docker push agrdocker/agr_ui_server

pull:
	docker pull agrdocker/agr_ui_server

bash:
	docker run -t -i agrdocker/agr_ui_server bash

docker-run:
	docker run -p 2992:2992 -t -i agrdocker/agr_ui_server

docker-run-command:
	npm run start-docker
