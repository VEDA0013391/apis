import { FastifyInstance } from "fastify";

import converter from "./converter";
import status from "./status";

export default async function (app: FastifyInstance) {
    app.get("/", async () => {
        return {
            success: true
        };
    });
    
    app.register(converter, {
        prefix: "/converter"
    });

    app.register(status, {
        prefix: "/status"
    });
}