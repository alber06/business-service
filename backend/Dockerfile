#
# node-microservice Dockerfile
#

# Pull base image
FROM node:4.3

MAINTAINER Alberto Fernández <afernandezgom@gmail.com>

# Install dependencies:
# Create working dir
RUN \
  mkdir -p /usr/src/app/back

# Set working dir
WORKDIR /usr/src/app/back

# Copy and install node app
COPY package.json /usr/src/app/back
RUN  npm install --no-color --quiet
COPY . /usr/src/app/back

# Preload database
# RUN mongo business-service scripts/database-preload.js

# Default command
CMD [ "node", "server.js" ]
