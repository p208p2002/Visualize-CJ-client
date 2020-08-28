# V-CJ Client ![Build](https://github.com/p208p2002/Visualize-CJ-client/workflows/Build/badge.svg?branch=master)
### UI Design
![ui demo](https://raw.githubusercontent.com/p208p2002/Visualize-CJ-client/master/demo.png)
### Setup dot-env
`$ cp example.env .env`
```.env
REACT_APP_API_HOST=http://140.120.13.252:12501
REACT_APP_USER_AUTH_SERVER=http://140.120.13.243:6500/api
REACT_APP_USER_AUTH=TRUE # [TRUE|FALSE]
```
### Build with Docker
build in docker
`$ npm run docker-build`
`$ docker run -itd -p XXXX:3000 vcj_client`
