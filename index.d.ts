import { IncomingMessage, ServerResponse  } from 'http';

type Request = typeof IncomingMessage;

type Response = typeof ServerResponse;

interface HttpContext {
    request: Request;
    response: Response;
}

interface ClassMiddleware {
    handle(ctx: HttpContext, next: CallableFunction): any;
}

type Middleware = (ctx: HttpContext, next: CallableFunction) => any | ClassMiddleware;

interface MiddlewareStore {
    register (middleware: Middleware): void;
    run (param: any): void;
}

interface Application {
    callback(): (req: IncomingMessage, res: ServerResponse) => Promise<void>;
    listen(port: number, callback?: CallableFunction):
}

type createApplicationFactory = (middlewareStore: MiddlewareStore) => Application;

export default createApplicationFactory;
