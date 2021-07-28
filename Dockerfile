FROM node:alpine as base

FROM base as builder
RUN mkdir /app
RUN mkdir /libs
WORKDIR /app

COPY libs/reactivecore /app/libs/reactivecore
COPY packages/app/package.json /app/packages/app/package.json
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn install

ENV DISABLE_ESLINT_PLUGIN=true
ENV SKIP_PREFLIGHT_CHECK=true
COPY tsconfig.json /app/tsconfig.json
COPY packages/app /app/packages/app
RUN yarn build

FROM base as release
RUN npm install -g serve
COPY --from=builder /app/packages/app/build /app/public
WORKDIR /app
EXPOSE 80

CMD ["serve", "--single", "-l", "tcp://0.0.0.0:80", "public"]
