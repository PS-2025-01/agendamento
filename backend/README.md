## Stack
- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [Jest](https://jestjs.io/pt-BR/docs/getting-started)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Mysql](https://www.mysql.com/)
- [Docker](https://docs.docker.com/)

## Setup

Para configurar o banco de dados pode ser utilizado o `docker` com o comando `docker compose up -d`,
ou caso tenha o `mysql` instalado criando o banco com `create database agendamento`.

```bash
npm install

# caso esteja utilizando docker
docker compose up -d

npm run migration:run

npm run start:dev
```

## Testes

```bash

# o banco deve estar online e as migrations aplicadas
npm run test:e2e

```
