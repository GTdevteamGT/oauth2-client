FROM node:20

ARG VERSION
ENV OAUTH2_VERSION=${VERSION}

RUN apt-get update && \
    apt-get install -y curl unzip gzip && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . /app

RUN git config --global --add safe.directory /app && \
    git config --global user.email "nobody@nowhere.com" && \
    git config --global user.name "John Doe" && \
    npm version "${OAUTH2_VERSION}" --no-git-tag-version || true

RUN npm install && npm run prepublishOnly --log-level=silly && FILE=$(npm pack) && mv "$FILE" "oauth2-client-${OAUTH2_VERSION}.tgz"

RUN ls -la "oauth2-client-${OAUTH2_VERSION}.tgz"
