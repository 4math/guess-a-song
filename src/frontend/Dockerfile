FROM node:16-alpine
WORKDIR /usr/local/apps/frontend/ 

COPY . ./
RUN npm install -g vite
RUN npm install && npm cache clean --force

#Expose port and start application
EXPOSE ${PORT}
# CMD nodemon --ext js,css,vue --watch src --exec npm run dev
CMD ./run.sh