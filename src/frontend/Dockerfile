FROM node:16-alpine as build-stage
WORKDIR /usr/local/apps/frontend/ 
COPY . ./
RUN npm install
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /usr/local/apps/frontend/dist /app
COPY nginx.conf /etc/nginx/nginx.conf