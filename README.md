## Description

Currency convertor service.

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
# test coverage
$ npm run test:cov
```

## Instruction
```
GET: http://localhost:3000/currency/convert
```

Send Get request to enpoint above via postman or curl with following body fields:

```
 countryCode: string - allowed length 2
 currency: string    - allowed values: USD, EUR, RUB
 price: number
```