APP_SERVER_LOCATION := $(or $(APP_SERVER_LOCATION),$(APP_SERVER_LOCATION),'../api/src/webpack')

all: install build test

install:
	npm install
run:
	npm start
build:
	npm run build
test:
	npm test

deploy:
	mkdir -p $(APP_SERVER_LOCATION)
	cp -a dist/* $(APP_SERVER_LOCATION)
