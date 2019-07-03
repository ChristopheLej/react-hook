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

RUN echo "Oh dang look at that $KEY_FOLDER"
RUN echo "Oh dang look at that ${KEY_FOLDER}"

COPY ${KEY_FOLDER}/* /tmp

RUN ls /tmp


# build application
RUN npm run build