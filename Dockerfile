FROM agrdocker/agr_base_linux_env:latest as build-stage

WORKDIR /workdir/agr_ui

ADD . .
RUN /bin/bash -c '. $HOME/.nvm/nvm.sh --no-use && \
  nvm install && \
  nvm use && \
  npm install'

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

ARG RELEASE=0.0.0
ENV RELEASE ${RELEASE}

RUN /bin/bash -c '. $HOME/.nvm/nvm.sh && npm run build'
RUN /bin/bash -c '. $HOME/.nvm/nvm.sh && npm test'

FROM nginx

WORKDIR /workdir/agr_ui/dist

COPY --from=build-stage /workdir/agr_ui/dist /workdir/agr_ui/dist
COPY --from=build-stage /workdir/agr_ui/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 2992
