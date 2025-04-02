FROM node:19-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --force
# Set the API URL for the React app build
ENV REACT_APP_PRIMARY_API_URL=http://192.168.30.247
COPY . .
RUN npm run build



FROM nginx:stable-alpine AS prod

COPY --from=build /app/build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
