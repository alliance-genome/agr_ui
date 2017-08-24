FROM agrdocker/agr_ui_env:develop

WORKDIR /workdir/agr_ui

ADD . .
RUN make 

CMD make run
