FROM nginx

WORKDIR /workdir/agr_ui/dist

COPY dist .

WORKDIR /etc/nginx/conf.d

ADD nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 2992
