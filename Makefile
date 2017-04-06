all: install build test

install:
	npm install
build:
	npm run build
test:
	npm test
run:
	npm start
