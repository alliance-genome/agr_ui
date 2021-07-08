ARG DOCKER_PULL_TAG=latest
ARG REG=agrdocker
FROM ${REG}/agr_base_linux_env:${DOCKER_PULL_TAG} as build-stage

WORKDIR /workdir/agr_ui

ADD . .

RUN /bin/bash -c '. $HOME/.nvm/nvm.sh --no-use && \
  nvm install && \
  nvm use && \
  npm install'

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

RUN /bin/bash -c '. $HOME/.nvm/nvm.sh && npx nx run-many --target=build --all --prod'
RUN /bin/bash -c '. $HOME/.nvm/nvm.sh && npx nx run-many --target=test --all'

FROM nginx

WORKDIR /workdir/agr_ui/dist

COPY --from=build-stage /workdir/agr_ui/dist /workdir/agr_ui/dist
COPY --from=build-stage /workdir/agr_ui/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 2992
