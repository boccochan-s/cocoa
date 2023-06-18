FROM alpine:3.18.2

RUN mkdir src
COPY ./src/ ./src/

WORKDIR /src

RUN apk add npm curl
RUN npm install

EXPOSE 3000