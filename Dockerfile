FROM node:16

# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Install app dependencies
# Bundle app source
ADD . /usr/src/app

RUN chmod +x /usr/src/app/run.sh

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 8080
# CMD [ "node", "server.js" ]
CMD ./run.sh
