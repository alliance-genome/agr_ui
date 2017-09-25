all: install build test

install:
	npm install
build:
	npm run build
test:
	npm test
run:
	npm start

docker-build:
	docker build -t agrdocker/agr_ui_server .

push:
	docker push agrdocker/agr_ui_server

pull:
	docker pull agrdocker/agr_ui_server

bash:
	docker run -t -i agrdocker/agr_api_server bash

docker-run:
	docker run -p 2992:2992 -t -i agrdocker/agr_ui_server

docker-run-command:
	npm run start-docker
