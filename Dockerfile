FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
erro
erro2
# Bundle app source
COPY . .

CMD [ "gulp",'server-compile']

EXPOSE 8080
CMD [ "npm", "start" ]