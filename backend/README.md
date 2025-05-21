## Stack
- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [Jest](https://jestjs.io/pt-BR/docs/getting-started)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Mysql](https://www.mysql.com/)
- [Docker](https://docs.docker.com/)
- [Prettier](https://prettier.io/)
- [Eslint](https://eslint.org/)

## Setup

Para configurar o banco de dados pode ser utilizado o `docker` com o comando `docker compose up -d`,
ou caso tenha o `mysql` instalado criando o banco com `create database agendamento`.

> edite o arquivo `.env` com as credenciais do seu banco de dados.

```bash
npm install

# caso esteja utilizando docker
docker compose up -d

# edite apenas o arquivo .env
cp example.env .env

npm run migration:run

npm run start:dev
```

## Testes

```bash

# o banco deve estar online e as migrations aplicadas
npm run test:e2e

```
## migrations 
Estamos versionando o banco de dados atraves de `migrations` do typeORM, depois de alterar o modelo (entidades), deve rodar os seguintes comandos.

```bash
# gera uma migration na pasta migrations
npm run migration:generate

# aplica as migrations ao banco de dados
npm run migration:run
```

## Estilo de codigo

Estamos utilizando o prettier para manter o estilo de formatação.

```bash
# formata todo o projeto
npm run format
```