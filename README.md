# DemoReact

This repo contains code for a Node.js multi-tier application.

The application overview is as follows

```
web <=> api <=> db
```

The folders `web` and `api` respectively describe how to install and run each app.

## Describe Project

1. Project displays CV on website
2. Use reactjs to create web
3. Use express to create api
4. Use docker to deploy

# Run Project

## 1.Clone code

git clone https://github.com/DoPhiLong-12/DemoReact.git

## 2.Build project with docker

docker compose -f docker-compose.yml up -d --build

## 3.Run project

docker compose -f docker-compose.yml up -d

### 4.Show site

1.Web http://localhost:3000/
2.Api http://localhost:3001/test
