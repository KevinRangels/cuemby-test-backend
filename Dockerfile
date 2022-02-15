FROM node:14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

RUN npm run seed-roles

RUN npm run seed-user

CMD ["npm", "start"]
