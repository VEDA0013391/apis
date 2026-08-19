import { FastifyInstance } from "fastify";

import { getRilumeDatabase } from "../../../db/rilume";
import deleteRoute from "./delete";

export default async function (app: FastifyInstance) {
    app.get("/", async () => {
        const db = getRilumeDatabase();

        const giveway = await db
            .collection("giveaways")
            .find({})
            .sort({
                addedAt: -1
            })
            .toArray();

        return {
            success: true,
            data: giveway
        };
    });

    app.register(deleteRoute, {
        prefix: "/delete"
    });
}