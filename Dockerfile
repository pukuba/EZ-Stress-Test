FROM node:14

RUN mkdir -p /app

WORKDIR /app

ADD ./ /app

RUN npm install 

EXPOSE 1080

CMD [ "npm", "start" ]