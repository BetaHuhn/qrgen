# qrgen.cc - QR-Code generator/url-shortener
QrGen.cc is a free service that lets you create QR-Codes and shortened URLs from any link quickly and easily

![gif](qrgen.gif)
## Live Website
The live version of this project can be found here: https://qrgen.cc

## Introduction
This repo contains the source code for the [qrgen.cc](https://qrgen.cc) QR-Code generator/url-shortener. Just add qrgen.cc/ infront of a url and get a QR-Code aswell as a short url. Alternatively you can visit [qrgen.cc](https://qrgen.cc) and create them manually. 
The website is build with a Node.js/Express backend and a vue.js frontend. The built vue.js files are hosted by the express server.

## Installation
Download the repo:
```
git clone https://github.com/BetaHuhn/qrgen
```

Change directory:
```
cd qrgen
```

Create .env file:
```
nano .env
```
Add:
```
DB=*YOUR MONGODB DATABASE NAME*
DB_USERNAME=*YOUR MONGODB USERNAME*
DB_PASSWORD=*YOUR MONGODB PASSWORD*
PORT=*PORT THE SERVER RUNS ON*
DOMAIN=*DOMAIN THE SERVER RUNS ON*
```

Install server dependencies:
```
npm i --save
```

Go into client directory and install vue.js frontend dependencies:
```
cd client
npm i --save
```

Build frontend:
```
npm run build
```

Go back to server directory and start app
```
cd ..
npm run start
```

## About
By [Maximilian Schiller](https://github.com/BetaHuhn)
