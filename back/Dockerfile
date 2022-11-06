FROM node:lts
WORKDIR /usr/src/app
COPY . .
EXPOSE 8000
CMD yarn install && \ 
    yarn ts-node main.ts 