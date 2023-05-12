FROM golang:1.18.3
ENV TZ=Asiz/Tokyo

ENV CGO_ENABLED=0
ENV COARCH=amd64
ENV ROOTPATH=/go/app

WORKDIR ${ROOTPATH}

RUN go install github.com/cosmtrek/air@latest
COPY go.mod go.sum .air.toml ./
RUN go mod download

EXPOSE 80

CMD ["air", "-c", ".air.toml"]