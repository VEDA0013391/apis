import { FastifyInstance } from "fastify";

import converter from "./converter";
import rilume from "./rilume";

export default async function (app: FastifyInstance) {
    app.get("/", async () => {
        return {
            success: true
        };
    });

    app.register(converter, {
        prefix: "/converter"
    });

    app.register(rilume, {
        prefix: "/rilume"
    });
}