FROM node:14.16.0-buster-slim

WORKDIR /app

# Copy container files
COPY docker/config.toml .
COPY docker/start.sh .
RUN chmod +x start.sh

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --production=true

# Copy build files
COPY dist/ .
CMD [ "./start.sh" ]
