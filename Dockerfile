FROM node:20.15.1 AS build-stage

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

RUN npm run build --prod

FROM node:20.15.1 AS production-stage

WORKDIR /app

COPY --from=build-stage /app/dist /app/dist

COPY --from=build-stage /app/package.json /app/package-lock.json /app/

RUN npm install --only=production --legacy-peer-deps

EXPOSE 4000

CMD ["npm", "run", "serve:ssr:store-management"]
