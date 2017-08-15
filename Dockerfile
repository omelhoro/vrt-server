FROM node

RUN mkdir /app
ENV NODE_ENV production
WORKDIR /app
RUN npm install -g casperjs es6-promise
COPY ./package.json /app
RUN npm install --loglevel silent

COPY ./ /app

RUN cp ./node_modules/phantomjs-prebuilt/bin/phantomjs /usr/local/bin/
RUN cp -r ./node_modules/phantomjs-prebuilt /usr/local/lib/phantomjs

CMD ["npm start"]

EXPOSE 3000
