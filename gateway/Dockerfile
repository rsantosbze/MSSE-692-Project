# Docker Multistage construction 

### DEV Environmental Science  ###
FROM node:14.17.3 AS development

#  Navigate to the container working directory 
WORKDIR /gate/src/app
#  Copy package.json
COPY package*.json ./

RUN npm install glob rimraf
RUN npm install --only=development
COPY . .
RUN npm run build
CMD ["npm", "run", "start:dev"]

### PROD Environmental Science  ###
FROM node:14.17.3 as production

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /gate/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /gate/src/app/dist ./dist

CMD ["node", "dist/main"]