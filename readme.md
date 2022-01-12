# @scott/server

This is a library for create a simple web server base.

## Installation

```shel
npm i @scott/server
```

## Usage

This is a simple example:

```js
const scott = require('@scott/server');

const server = scott();

server.use(async (ctx, next) => {
    console.log('Executing first middleware!');
    await next();
});

server.use(async ({ response }) => {
    console.log('Executing second middleware!');
    response.end('Hi!')
})
```
