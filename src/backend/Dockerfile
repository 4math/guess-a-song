FROM node:16-alpine
WORKDIR /usr/local/apps/backend/ 

COPY . ./
RUN npm install

EXPOSE ${PORT}

CMD npm run start:prod