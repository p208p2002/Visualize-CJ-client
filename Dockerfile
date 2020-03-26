FROM node:13.10.1-alpine3.11
#
COPY src /source/src
COPY public /source/public
COPY package.json /source/package.json
COPY .env /source/.env
COPY react-deploy-server /source/react-deploy-server

#
WORKDIR /source
RUN npm install
RUN npm run build

#
WORKDIR /source/react-deploy-server
RUN npm install

#
EXPOSE 3000
CMD node server.js