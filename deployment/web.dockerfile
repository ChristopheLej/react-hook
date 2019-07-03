# base image
# FROM node:10.15.0
FROM node:latest

ARG KEY_FOLDER

# select working folder
WORKDIR /app

# copy json files in working folder
COPY package*.json /app/

# install and cache app dependencies
RUN npm install

# copy apllication in working folder
COPY ./ /app/

RUN mkdir -p /tmp


COPY ${KEY_FOLDER}/* /tmp


# build application
RUN npm run build