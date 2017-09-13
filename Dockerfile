FROM agrdocker/agr_javascript_env:latest

WORKDIR /workdir/agr_ui

EXPOSE 2992

ADD . .
RUN make 

CMD make docker-run-command
