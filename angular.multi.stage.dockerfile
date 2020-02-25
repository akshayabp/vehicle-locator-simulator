##### Stage 1
FROM node:latest as node
LABEL author="Akshay Pawaskar"
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build-docker

##### Stage 2
FROM nginx
COPY --from=node /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf