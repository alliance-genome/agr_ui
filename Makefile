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
	docker build -t agrdocker/agr_ui_server:develop .
push:
	docker push agrdocker/agr_ui_server:develop
pull:
	docker pull agrdocker/agr_ui_server:develop
bash:
	docker run -t -i agrdocker/agr_api_server:develop bash
docker-run:
	docker run -p 2992:2992 -t -i agrdocker/agr_ui_server:develop
docker-run-command:
	npm start:docker
