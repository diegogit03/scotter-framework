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

## Http context

The scotter provides a http context in middlewares with two objects:
request and response.

```js
const scott = require('@scotterjs/server');

const server = scott();

server.use(async ctx => {
    console.log('HttpContext: ', ctx)
});

server.listen(3000);
```

## Class middleware

You can make middleware with es6 classes, the scotter will call
handle method in class middlewares.

```js
const scott = require('@scotterjs/server');

const server = scott();

class IsAuthMiddleware {

    async handle ({ request, response }) {
        if (!request.headers.Authorization) {
            return response.status(401).send({message: '...'});
        }

        // ...logic
    }

}

server.use(IsAuthMiddleware);

server.listen(3000);
```
