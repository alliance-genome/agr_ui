REG := 100225593120.dkr.ecr.us-east-1.amazonaws.com
DOCKER_IMAGE_TAG := latest

registry-docker-login:
ifneq ($(shell echo ${REG} | egrep "ecr\..+\.amazonaws\.com"),)
	@$(eval DOCKER_LOGIN_CMD=aws)
ifneq (${AWS_PROFILE},)
	@$(eval DOCKER_LOGIN_CMD=${DOCKER_LOGIN_CMD} --profile ${AWS_PROFILE})
endif
	@$(eval DOCKER_LOGIN_CMD=${DOCKER_LOGIN_CMD} ecr get-login-password | docker login -u AWS --password-stdin https://${REG})
	${DOCKER_LOGIN_CMD}
endif

all: install build test

install:
	npm install
build:
	npm run build
test:
	npm test
run:
	npm start

docker-build-nginx: registry-docker-login
	docker build -t ${REG}/agr_ui_server:${DOCKER_IMAGE_TAG} --build-arg REG=${REG} --build-arg DOCKER_IMAGE_TAG=${DOCKER_IMAGE_TAG} .

push: registry-docker-login
	docker push ${REG}/agr_ui_server

pull: registry-docker-login
	docker pull ${REG}/agr_ui_server:${DOCKER_IMAGE_TAG}

bash:
	docker run -t -i ${REG}/agr_ui_server:${DOCKER_IMAGE_TAG} bash

docker-run:
	docker run -p 2992:2992 -t -i ${REG}/agr_ui_server:${DOCKER_IMAGE_TAG}

docker-run-command:
	npm run start-docker
