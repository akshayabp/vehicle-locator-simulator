FROM nginx
MAINTAINER Akshay P
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist/ /usr/share/nginx/html/
EXPOSE 80