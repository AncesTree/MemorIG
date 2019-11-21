FROM node:12.2.0-alpine as build
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json ./package.json
RUN npm install --silent
RUN npm install -g serve --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . .
RUN npm run build

# production environment
EXPOSE 80
CMD ["serve", "-s", "build", "-l", "80"]
