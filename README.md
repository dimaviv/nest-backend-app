# The registrar of settlement operations 
 (укр. Реєстратор розрахункових операцій)

## Description
Future RSO using NestJS, PostgreSQL(sequelize), Jest, Swagger 

I have almost finished the project like this (using PHP), but due to awful code it was decided to rewrite on NestJS

## Implemented
 * CRUD APIs
 * JWT auth
 * some e2e and unit tests (Jest)
 * validation (class-validator)
 * roles guard system
 * bcrypt password-hashing
 * Swagger documentation

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e



