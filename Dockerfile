FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -production
RUN npm install -g typescript ts-node
RUN npm install node-pre-gyp -g
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .
RUN npm install bcrypt

EXPOSE 3000
CMD [ "npm", "run", "start" ]

FROM