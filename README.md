# Description

A TODO api boilerplate

# Features

- TODOS: Creating, editing and listing TODO's
- ORM: TypeORM on PostgreSQL
- Graphql: apollo + Typegraphql
- Logging: nestjs default logger
- Compodoc: Codebase documentation

# Code style

The current codebase is following clean code, SOLID and some of design patterns

# Installation

## Prerequisites

- Linux or macOS
- Node v12 LTS
- Globally `yarn` & `nest` commands
- Docker

## Setting up PostgreSQL database

This is will make a new PostgreSQL running in the standard port 5432 Please
shutdown any previous conflicting PostgreSQL instances before starting this

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

# Development

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Running tests

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Lint

Linting codebase

```bash
$ yarn lint
```

## Migrations

Run `typeorm` CLI

### Automatically generating migrations

You can generate migration files

1. Update entity source code
2. You have an up-to-date local development database

```bash
# Creates a file under src/migrations/
yarn typeorm migration:generate -n MigrationName
```

### Apply migrations against the local database

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

## Health check

After the application starts, go to `http://localhost:$PORT/health` to check
database status

Observartion: You must change \$PORT for the port to be used in your environment

## Documentation

Generating codebase documentation

```bash
$ yarn doc
```

## TODO

[ ] Add build section  
[ ] Add cache strategy on getTodoById/getAllTodos  
[ ] Check if env variables are loading correctly using
[schema-validation](https://docs.nestjs.com/techniques/configuration#schema-validation)  
[ ] Escape strings with HTML entities  
[ ] Fix unit tests typings(use correct interfaces when mocking, etc). Probably,
use System under test [ ] Sanitize task input on creation/updating  
[ ] Track errors in production. Use [sentry.io](https://sentry.io) or similar

Observation: Some TODO's are spread across the code and need to be fixed ASAP

# Build with

- [compodoc](https://compodoc.app) - The missing documentation tool for your
  Angular application
- [nestjs](https://nestjs.com) - A progressive Node.js framework for building
  efficient, reliable and scalable server-side applications
- [typegraphql](https://typegraphql.com) - Modern framework for GraphQL API in
  Node.js
- [typeorm](https://typeorm.io) - Amazing ORM for TypeScript and JavaScript
  (ES7, ES6, ES5)

# Authors

- [Lucas Silva](https://github.com/luqezman) - Developer
