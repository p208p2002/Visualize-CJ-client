FROM node:13.10.1-alpine3.11
COPY react-deploy-server /react-deploy-server
WORKDIR /react-deploy-server
CMD npm install
EXPOSE 3000
ENTRYPOINT node server.js