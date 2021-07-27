FROM node:alpine

RUN npm install -g serve

COPY . /app/public
WORKDIR /app
EXPOSE 80

ENV PORT=80
CMD ["serve", "--single", "public"]