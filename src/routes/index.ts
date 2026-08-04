import { FastifyInstance } from "fastify";

import converter from "./converter";

export default async function (app: FastifyInstance) {

    app.get("/", async () => {
        return {
            success: true
        };
    });

    app.register(converter, {
        prefix: "/converter"
    });
}