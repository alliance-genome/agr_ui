ARG DOCKER_PULL_TAG=latest
ARG REG=100225593120.dkr.ecr.us-east-1.amazonaws.com
FROM ${REG}/agr_base_linux_env:${DOCKER_PULL_TAG} as build-stage

WORKDIR /workdir/agr_ui

ADD package.json package.json
ADD .nvmrc .nvmrc

RUN /bin/bash -c '. $HOME/.nvm/nvm.sh --no-use && \
  nvm install && \
  nvm use && \
  npm install'

ADD . .

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

RUN mkdir /workdir/agr_ui/dist

RUN /bin/bash -c '. $HOME/.nvm/nvm.sh && npm run build'
RUN /bin/bash -c '. $HOME/.nvm/nvm.sh && npx nx run-many --target=test --all'

FROM nginx

WORKDIR /workdir/agr_ui/dist

COPY --from=build-stage /workdir/agr_ui/dist /workdir/agr_ui/dist
COPY --from=build-stage /workdir/agr_ui/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 2992
