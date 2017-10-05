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
	docker build --build-arg NODE_ENV=production -t agr_ui_build_img -f Dockerfile.build .
	docker create --name agr.ui.server.temp agr_ui_build_img
	docker cp agr.ui.server.temp:/workdir/agr_ui/dist dist
	docker rm agr.ui.server.temp
	docker rmi agr_ui_build_img
	docker build -t agrdocker/agr_ui_server .

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
