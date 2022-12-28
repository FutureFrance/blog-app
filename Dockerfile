FROM node:16.15

WORKDIR /app

COPY . .

RUN npm install 

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait ./wait
RUN chmod +x ./wait

EXPOSE 9001

CMD ./wait && npm run start