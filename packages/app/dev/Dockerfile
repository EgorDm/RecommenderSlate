FROM node:alpine

RUN npm install -g serve

COPY . /app/public
WORKDIR /app
EXPOSE 80

CMD ["serve", "--single", "-l", "tcp://0.0.0.0:80", "public"]