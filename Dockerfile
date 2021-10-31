FROM node:16.13.0-slim

WORKDIR /app
COPY . .
ENV NODE_ENV production

RUN npm set progress=false && npm config set depth 0 && \
    npm install --production

EXPOSE 3000

USER node
COPY --chown=node:node . /usr/src/app

ENTRYPOINT ["node", "app.js"]