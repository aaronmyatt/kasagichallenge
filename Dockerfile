FROM node:latest
WORKDIR /usr/src/app
COPY . .
EXPOSE 3000
ENV RANDOM_PATH=/usr/src/app/random.txt
CMD ["node", "index.js"]
