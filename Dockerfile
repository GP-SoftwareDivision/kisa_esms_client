FROM node:18-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

# --frozen-lockfile : yarn.lock 파일의 내용과 정확히 일치하는 의존성 설치 옵션
RUN yarn install --frozen-lockfile

COPY . .

RUN NODE_OPTIONS="--max-old-space-size=2048" yarn build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/nginx.template.conf /etc/nginx/conf.d/default.conf.template

EXPOSE 10601

CMD ["/bin/sh", "-c", "envsubst '$BACKEND_URL' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
