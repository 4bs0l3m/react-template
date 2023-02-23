FROM node
WORKDIR /app
ENV VITE_BASE_URL=http://api.com
COPY package.json .
RUN npm i
COPY . .
RUN npm run build
## EXPOSE [Port you mentioned in the vite.config file]
EXPOSE 8081
CMD ["npm", "run", "preview"]