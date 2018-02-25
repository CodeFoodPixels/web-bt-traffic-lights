FROM node:9

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update
RUN apt-get install -y bluetooth bluez libbluetooth-dev libudev-dev

RUN npm install

COPY . .

CMD [ "npm", "start" ]
