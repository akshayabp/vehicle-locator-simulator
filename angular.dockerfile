FROM nginx
MAINTAINER Akshay P
COPY ./vehicle-simulator-here-maps/ /usr/share/nginx/html/
EXPOSE 80