FROM keymetrics/pm2:latest

ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /tmp
COPY . /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

ENV API_VER=production
ENV NODE_ENV=production
ENV PORT=8080

RUN npm run build

WORKDIR /usr/src/app
RUN cp -a /tmp/node_modules /usr/src/app/
RUN cp -av /tmp/build/* /usr/src/app/
RUN cp -a /tmp/config/pm2.json /usr/src/app/

EXPOSE 8080

CMD [ "pm2-docker", "start", "pm2.json" ]
