FROM node:8.16-jessie

COPY package.json /opt/

WORKDIR /opt

RUN npm install --only=prod

COPY app.js /opt/app.js
COPY ecosystem.config.js /opt/ecosystem.config.js
COPY apis /opt/apis

EXPOSE 3000
EXPOSE 4000
EXPOSE 5000

CMD [ "npm", "start"]
