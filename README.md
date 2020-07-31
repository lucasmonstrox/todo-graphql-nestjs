# 📝 Description

> A TODO GraphQL API boilerplate

# 🎉 Features

- TODOS: CRUD around TODOS
- ORM: TypeORM on PostgreSQL
- Graphql: TypeGraphQL
- Cache System: type-cacheable
- Logging: NestJS default logger
- Sanitizer: class-sanitizer
- E2E tests: SuperTest
- Unit tests: Jest
- Commit semantic: commitlint + husky
- Code format and lint: eslint + prettier
- Documentation: Compodoc

# 🧰 Installation

## Prerequisites

- Linux or macOS
- Node v12 LTS
- Globally `yarn` & `nest` commands
- Docker

Install yarn packages before continue

```bash
yarn
```

## Setting up PostgreSQL database

- This is will make a new PostgreSQL running in the standard port `5432`
- Please shutdown any previous conflicting PostgreSQL instances before starting
  this

```bash
docker-compose up -d
```

Check the database is up

```bash
docker logs -f local_db
```

Check that you can log into a database with `psql`

```bash
docker exec -it local_db psql -U local_dev local_db
```

View tables

```psql
\dt
```

## Creating the initial database

Run initial migrations to set up initial database tables

```bash
yarn typeorm migration:run
```

# ⌨ Development

## ⚙ Running the app

```bash
# development
yarn start

# watch mode
yarn start:dev

# production mode
yarn start:prod
```

## 🎮 Playground & 🩺 Health check

After the application starts, go to `http://localhost:$PORT/health` to check
health indicators statuses or `http://localhost:$PORT/graphql` to access graphql
playground

Observartion: You must change `$PORT` for the port to be used in your
environment

## 🧪 Running tests

```bash
# unit tests
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```

After executing `yarn test:cov`, the `coverage` folder will be generated with
coverage details

## 📏 Lint

Linting codebase

```bash
# issues are automatically fixed
yarn lint
```

# 🧳 Migrations

Run `typeorm` CLI

## Automatically generating migrations

You can generate migration files

1. Update entity source code
2. You have an up-to-date local development database

```bash
# creates a file under src/migrations/
yarn typeorm migration:generate -n MigrationName
```

## Apply migrations against the local database

```bash
yarn typeorm migration:run
```

Check the result of migrations using `psql` command-line tool

```bash
docker exec -it local_db psql -U local_dev local_db
```

```psql
\d 'todo'
```

# 📖 Documentation

Generating codebase documentation(served at `http://127.0.0.1:8080`)

```bash
yarn doc
```

# 📦 Building

Before building application to production, make sure environment variables are
applied correctly

Building for production

```bash
yarn build
```

Running on production

```bash
yarn start:prod
```

# ✅ TODO

[ ] Add code of conduct file  
[ ] Add docker section to make project working through docker  
[ ] Add project files structure  
[ ] Add issue template file  
[ ] Check if env variables are loading correctly using
[schema-validation](https://docs.nestjs.com/techniques/configuration#schema-validation)  
[ ] Track errors in production. Use [sentry.io](https://sentry.io) or similar

Observation: Some TODOS are spread across the code and need to be fixed ASAP

# 💻 Code style

The current code style is following `clean code`, some `design patterns` and
`SOLID` principles

# 🛠 Built with

- [compodoc](https://compodoc.app) - The missing documentation tool for your
  Angular application
- [jest](https://jestjs.io) - Jest is a delightful JavaScript Testing Framework
  with a focus on simplicity
- [nestjs](https://nestjs.com) - A progressive Node.js framework for building
  efficient, reliable and scalable server-side applications
- [supertest](https://visionmedia.github.io/superagent) - Small progressive
  client-side HTTP request library, and Node.js module with the same API
- [typegraphql](https://typegraphql.com) - Modern framework for GraphQL API in
  Node.js
- [typeorm](https://typeorm.io) - Amazing ORM for TypeScript and JavaScript
  (ES7, ES6, ES5)

# 👷 Authors

- [**Lucas Silva**](https://github.com/luqezman) joao.galiano.silva@gmail.com -
  Developer
- [**Thiago Butignon**](https://github.com/thiagobutignon) thiago@betaquark.com - Reviewer

See also the list of [contributors](../../graphs/contributors) who participated in this
project.
