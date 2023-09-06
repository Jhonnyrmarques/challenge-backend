<h1 align="center">

 Fullstack Challenge TechSocial
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/fastify-%23404d59.svg?style=for-the-badge&logo=fastify&logoColor=%black" />
  <img src="https://img.shields.io/badge/docker-%232C8EBB?style=for-the-badge&logo=docker&logoColor=white" />
</p>


<h3>
  ⓘ About:
</h3>

<p>
  REST API built for techsocial company full stack dev challenge.
</p>

<h2>:point_right: Installation</h2>
<h3>:tada: Clone the Project:</h3>

 ```bash
git clone https://github.com/Jhonnyrmarques/challenge-backend.git
```
<h3> :heavy_plus_sign: Install Dependencies: </h3>

```bash
npm i
```
<h3> :wrench: Fill in the port you will use in the .env: </h3>

```bash
# Database
DB_USERNAME=docker
DB_PASSWORD=docker
DB_DATABASE=quickorders

DATABASE_URL="postgresql://docker:docker@localhost:5432/quickorders?schema=public"

NODE_ENV=dev
PORT=

# Auth
JWT_SECRET=challengebackend
```

<h3>:game_die: Run Database:</h3>

 ```bash
docker-compose up -d
```

<h3>:rocket: Getting Start Project:</h3>

 ```bash
npm run start:dev
```

