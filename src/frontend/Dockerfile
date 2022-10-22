FROM node:16-alpine
WORKDIR /usr/local/apps/backend/ 

COPY . ./
RUN npm install && npm cache clean --force
RUN npm install -g vite

#Expose port and start application
EXPOSE 5173
CMD npm run dev