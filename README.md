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
DB=Your MongoDB database name
DB_ADDRESS=MongoDB IP:Port; defaults to localhost:27017
DB_USERNAME=Your username to sign into MongoDB
DB_PASSWORD=Password to sign in
PORT=Port the server runs on; defaults to 3000
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
