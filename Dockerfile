FROM nginx:alpine

# Copy app source to work directory
COPY ./dist /usr/share/nginx/html
