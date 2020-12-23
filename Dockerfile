# Start first build stage

FROM mhart/alpine-node:14 AS build
WORKDIR /usr/src/app

# Add backend dependencies

COPY package*.json ./
RUN npm ci

COPY ./client/package*.json ./client
RUN cd client && npm ci

# Copy and compile the source

COPY . .
RUN npm run build

# Start second build stage

FROM mhart/alpine-node:14
EXPOSE 3000
WORKDIR /usr/src/app

# Copy the source from the build stage to the second stage

COPY --from=build /usr/src/app .

# Start app

CMD npm start