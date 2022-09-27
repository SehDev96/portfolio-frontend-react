FROM node:17.4-alpine3.14
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./ 
COPY . ./
ARG REACT_APP_API_BASE_URL 
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
RUN npm install  
CMD ["npm","run","start"]