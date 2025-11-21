FROM node:20

ARG VERSION
ENV oauth2_version=${VERSION}

WORKDIR /app

COPY oauth2-client.tar /app
RUN tar xf oauth2-client.tar

RUN npm version ${oauth2_version} --no-git-tag-version
RUN npm install
RUN npm run prepublishOnly
RUN npm pack
