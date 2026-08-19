import { FastifyInstance } from "fastify";

import { getRilumeDatabase } from "../../../db/rilume";
import deleteRoute from "./delete";

export default async function (app: FastifyInstance) {
    app.get("/", async () => {
        const db = getRilumeDatabase();

        const impersonate_log = await db
            .collection("impersonatelogs")
            .find({})
            .sort({
                addedAt: -1
            })
            .toArray();

        return {
            success: true,
            data: impersonate_log
        };
    });

    app.register(deleteRoute, {
        prefix: "/delete"
    });
}