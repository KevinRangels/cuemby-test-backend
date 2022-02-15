FROM node:14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

RUN npm run seed-roles

RUN npm run seed-user

CMD ["npm", "start"]
