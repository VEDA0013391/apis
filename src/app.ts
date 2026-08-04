import Fastify from "fastify";
import routes from "./routes";

export async function buildApp() {
    const app = Fastify({
        logger: true
    });

    await app.register(routes);

    return app;
}