# base image
# FROM node:10.15.0
FROM node:latest as build-stage

# select working folder
WORKDIR /app

# copy json files in working folder
COPY package*.json /app/

# install and cache app dependencies
RUN npm install

# copy apllication in working folder
COPY ./ /app/

# build application
RUN npm run build