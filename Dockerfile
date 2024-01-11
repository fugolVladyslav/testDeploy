FROM node:latest

ARG REACT_APP_GOOGLE_API_KEY
ARG REACT_APP_BASE_URL
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json yarn.lock /
RUN yarn

COPY . .
#RUN yarn add vite@4.4.5
#RUN yarn add @vitejs/plugin-react@4.1.0
RUN npm install -g typescript
RUN yarn global add vite

RUN yarn build

EXPOSE 80

CMD ["yarn", "dev"]