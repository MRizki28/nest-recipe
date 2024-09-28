FROM node:20-alpine

WORKDIR /app

COPY package*.json /app
RUN npm install

RUN npm install -g @nestjs/cli

COPY . .

EXPOSE 3333

CMD [ "nest", "start", "--watch" ]