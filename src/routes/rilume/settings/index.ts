import type { FastifyInstance } from "fastify";

import impersonate from "./impersonate";
import expands from "./expands";

export default async function settingsRoutes(
    app: FastifyInstance
): Promise<void> {
    app.register(impersonate, {
        prefix: "/impersonate",
    });

    app.register(expands, {
        prefix: "/expands",
    });
}