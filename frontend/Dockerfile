#
# frontend service Dockerfile
#

# Pull base image
FROM node:4.3

MAINTAINER Alberto Fernández <afernandezgom@gmail.com>

# Install dependencies:
# Create working dir
RUN \
  mkdir -p /usr/src/app/front

# Set working dir
WORKDIR /usr/src/app/front

# Copy and install node app
COPY . /usr/src/app/front

# Install Ruby.
RUN \
  apt-get update && \
  apt-get install -y ruby ruby-dev && \
  rm -rf /var/lib/apt/lists/*

# Install Compass.
RUN gem install compass

# Install bower and grunt
RUN  \
  npm install --no-color --quiet \
  && npm install -g bower grunt-cli \
  && bower install --allow-root


# Default command
CMD [ "grunt", "serve:dist" ]
