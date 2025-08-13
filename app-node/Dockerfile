FROM node:18

WORKDIR /app

COPY hoverfly.crt /hoverfly.crt
ENV NODE_EXTRA_CA_CERTS /hoverfly.crt

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
