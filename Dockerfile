FROM ubuntu:16.04

RUN apt-get update && apt-get install -y openssh-server
RUN apt-get update && apt-get install -y git
RUN apt-get install -y curl
RUN curl --silent --location https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs build-essential

WORKDIR /var/www

CMD /bin/sh

MAINTAINER Daniel Silva
