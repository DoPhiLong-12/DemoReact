FROM node:12-alpine

# ARG NODE_ENV
# ENV NODE_ENV ${NODE_ENV:-production}
ARG REACT_APP_HOST_IP_ADDRESS
ENV REACT_APP_HOST_IP_ADDRESS $REACT_APP_HOST_IP_ADDRESS

WORKDIR /app
# copy app files
COPY . .
# install node packages
RUN npm install

EXPOSE 3000
CMD npm start