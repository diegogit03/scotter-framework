# @scotterjs/server

This is a library for create a simple web server base.

## Installation

```shel
npm i @scotterjs/server
```

## Usage

This is a simple example:

```js
const scott = require('@scotterjs/server');

const server = scott();

server.use(async (ctx, next) => {
    console.log('Executing first middleware!');
    await next();
});

server.use(async ({ response }) => {
    console.log('Executing second middleware!');
    response.end('Hi!');
});

server.listen(3000);
```
