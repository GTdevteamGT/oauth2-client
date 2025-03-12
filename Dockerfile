# Dockerfile using Node 20 
# All parameters must be provided via --build-arg during the build.

FROM node:20

# Build arguments (all mandatory)
ARG TOKEN
ARG VERSION

# Set environment variables for AWS CLI configuration
# NPM_TOKEN must be seen the way it is !

ENV NPM_TOKEN=${TOKEN} 
ENV oauth2_version=${VERSION}

# Install AWS CLI using curl

RUN apt-get update 
RUN  apt-get install -y curl unzip 

# Set working directory
WORKDIR /app

# Copy project files

COPY oauth2-client.tar /app
RUN tar xf oauth2-client.tar
RUN chmod -R 777 *
RUN git config --global --add safe.directory /app
RUN git config --global user.email "nobody@nowhere.com"
RUN git config --global user.name "John Doe"

#Changing package version
RUN export oauth2_version=${OAUTH2_VERSION}
RUN npm version ${oauth2_version}
RUN npm install && npm run prepublishOnly --log-level=silly && npm publish --private || true
