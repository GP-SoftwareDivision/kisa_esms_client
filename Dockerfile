FROM node:14-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

# --frozen-lockfile : yarn.lock 파일의 내용과 정확히 일치하는 의존성 설치 옵션
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]