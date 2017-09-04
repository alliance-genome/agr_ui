FROM agrdocker/agr_javascript_env:latest

WORKDIR /workdir/agr_ui

ADD . .
RUN make 

CMD make docker-run-command
