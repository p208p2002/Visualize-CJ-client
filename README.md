# V-CJ Client ![Build](https://github.com/p208p2002/Visualize-CJ-client/workflows/Build/badge.svg?branch=master)
[project main repo](https://github.com/p208p2002/Visualize-CJ)

### .env
`$ cp example.env .env`
```.env
REACT_APP_API_HOST=http://140.120.13.252:13001
REACT_APP_USER_AUTH_SERVER=http://140.120.13.243:6500/api
REACT_APP_USER_AUTH=TRUE # [TRUE|FALSE]
```
### docker-build
build in docker

`$ npm run docker-build`
### run
`$ docker run -itd -p XXXX:3000 vcj_client`
