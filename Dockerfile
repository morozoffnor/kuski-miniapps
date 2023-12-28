FROM node:18.17-alpine3.17
LABEL authors="https://github.com/morozoffnor"
WORKDIR /usr/src/app
COPY . ./
RUN npm install
RUN npm run build

ENTRYPOINT ["node", "server.js"]