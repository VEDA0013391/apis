import { FastifyInstance } from "fastify";

import { getRilumeDatabase } from "../../../../db/rilume";
import addRoute from "./add";
import deleteRoute from "./delete";
import updateRoute from "./update";

export default async function (app: FastifyInstance) {
    app.get("/", async () => {
        const db = getRilumeDatabase();

        const expands = await db
            .collection("expands")
            .find({})
            .sort({
                addedAt: -1
            })
            .toArray();

        return {
            success: true,
            data: expands
        };
    });

    app.register(addRoute, {
        prefix: "/add"
    });

    app.register(deleteRoute, {
        prefix: "/delete"
    });

    app.register(updateRoute, {
        prefix: "/update"
    });
}