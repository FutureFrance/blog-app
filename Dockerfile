FROM node:v16.15.1

WORKDIR /app

COPY . .

RUN npm install 

EXPOSE 9001

CMD npm start