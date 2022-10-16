FROM node:16-alpine
WORKDIR /usr/local/apps/backend/ 

COPY . ./
RUN npm install --dev && npm cache clean --force
RUN npm install --global nodemon 

EXPOSE ${PORT}

RUN npm run build
CMD ./run.sh
