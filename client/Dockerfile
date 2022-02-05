# Docker Multistage construction

### DEV Environmental Science  ###
FROM node:14.17.3 AS development

#  Navigate to the container working directory
WORKDIR /client/src/app
#  Copy package.json
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

### PROD Environmental Science  ###
FROM nginx:1.20-alpine

COPY --from=development /client/src/app/dist/ /usr/share/nginx/html

# Start
CMD ["nginx", "-g", "daemon off;"]

