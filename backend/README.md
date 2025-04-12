## Stack
- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [Mysql](https://www.mysql.com/)
- [Docker](https://docs.docker.com/)

## Setup

Para configurar o banco de dados pode ser utilizado o `docker` com o comando `docker-compose up -d`,
ou caso tenha o `mysql` instalado criando o banco com `create database agendamento`.

```bash
npm install

# caso esteja utilizando docker
docker-compose up -d

# watch mode
npm run start:dev
```

## Testes

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
