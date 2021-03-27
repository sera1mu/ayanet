FROM node:14.16.0-buster-slim

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY dist/ .
COPY docker/config.toml .
COPY docker/start.sh .

RUN yarn install --prod
RUN chmod +x start.sh

CMD bash start.sh
