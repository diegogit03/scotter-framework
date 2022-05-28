const scott = require('../index');

const server = scott();

server.use(async (ctx, next) => {
    console.log('Executing first middleware!');
    await next();
});

class SecondMiddleware {

    handle ({ response }) {
        console.log('Executing second middleware!');
        response.end('Hi!');
    }

}

server.use(SecondMiddleware);

server.listen(3000);
