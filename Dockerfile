FROM node:14.18.1-slim

WORKDIR /app
COPY . .
ENV NODE_ENV production

RUN npm set progress=false && npm config set depth 0 && \
    npm install --production

EXPOSE 3000

ENTRYPOINT ["npm", "start"]