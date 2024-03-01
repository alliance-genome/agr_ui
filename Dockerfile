ARG DOCKER_PULL_TAG=latest
ARG REG=100225593120.dkr.ecr.us-east-1.amazonaws.com
FROM ${REG}/agr_base_linux_env:${DOCKER_PULL_TAG} as build-stage

WORKDIR /workdir/agr_ui

ADD . .

RUN mkdir /workdir/agr_ui/build

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

RUN /bin/bash -c 'PS1=x && . /root/.profile && nvm install && nvm use && npm install --legacy-peer-deps && npm run build'

FROM nginx

WORKDIR /workdir/agr_ui/build

COPY --from=build-stage /workdir/agr_ui/build /workdir/agr_ui/build
COPY --from=build-stage /workdir/agr_ui/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
