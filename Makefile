REG := 100225593120.dkr.ecr.us-east-1.amazonaws.com
DOCKER_PULL_TAG := stage
DOCKER_BUILD_TAG := stage

registry-docker-login:
ifneq ($(shell echo ${REG} | egrep "ecr\..+\.amazonaws\.com"),)
	@$(eval DOCKER_LOGIN_CMD=docker run --rm -it -v ~/.aws:/root/.aws amazon/aws-cli)
ifneq (${AWS_PROFILE},)
	@$(eval DOCKER_LOGIN_CMD=${DOCKER_LOGIN_CMD} --profile ${AWS_PROFILE})
endif
	@$(eval DOCKER_LOGIN_CMD=${DOCKER_LOGIN_CMD} ecr get-login-password | docker login -u AWS --password-stdin https://${REG})
	${DOCKER_LOGIN_CMD}
endif

all: install build test

install:
	npm install
update:
	npm update
update-deps-lock:
	npm update --package-lock-only
build:
	npm run build
test:
	npm test -- --watchAll=false
run:
	npm start

stage-alb-deploy:
	npx aws-cdk deploy stage-alb-stack

test-alb-deploy:
	npx aws-cdk deploy test-alb-stack

prod-alb-deploy:
	npx aws-cdk deploy prod-alb-stack

stage-ui-deploy:
	npx aws-cdk deploy agr-ui-stage

test-ui-deploy:
	npx aws-cdk deploy agr-ui-test

prod-ui-deploy:
	npx aws-cdk deploy agr-ui-production

uirun:
	REACT_APP_JBROWSE_AGR_RELEASE=${REACT_APP_JBROWSE_AGR_RELEASE} API_URL=${API_URL} npm start

uirunstage: API_URL=https://stage.alliancegenome.org
uirunstage:
	@$(MAKE) --no-print-directory uirun API_URL=${API_URL}

uiruntest: API_URL=https://test.alliancegenome.org
uiruntest:
	@$(MAKE) --no-print-directory uirun API_URL=${API_URL}

docker-build-nginx:
	docker build -t ${REG}/agr_ui_server:${DOCKER_BUILD_TAG} --build-arg REG=${REG} --build-arg DOCKER_PULL_TAG=${DOCKER_PULL_TAG} .

push: registry-docker-login
	docker push ${REG}/agr_ui_server:${DOCKER_BUILD_TAG}

pull: registry-docker-login
	docker pull ${REG}/agr_ui_server:${DOCKER_BUILD_TAG}

bash:
	docker run -t -i ${REG}/agr_ui_server:${DOCKER_BUILD_TAG} bash

docker-run:
	docker run -p 2992:2992 -t -i ${REG}/agr_ui_server:${DOCKER_BUILD_TAG}

docker-run-command:
	npm run start

go-ribbons-build-fix:
	cp -r ./node_modules/@geneontology/wc-ribbon-strips/dist/wc-ribbon-strips/ ./build/assets/wc-ribbon-strips/
	cp -r ./node_modules/@geneontology/wc-ribbon-table/dist/wc-ribbon-table/   ./build/assets/wc-ribbon-table/
	cp -r ./node_modules/@geneontology/wc-gocam-viz/dist/wc-gocam-viz/         ./build/assets/wc-gocam-viz/
