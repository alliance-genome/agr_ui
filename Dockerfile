FROM agrdocker/agr_javascript_env:latest

WORKDIR /workdir/agr_ui

EXPOSE 2992

ADD . .
RUN npm install
RUN npm run build
RUN npm test

VOLUME /workdir/agr_ui/dist

CMD npm run start-docker
