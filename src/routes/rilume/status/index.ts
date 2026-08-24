import { FastifyInstance } from "fastify";

import { getRilumeDatabase } from "../../../db/rilume";
import updateRoute from "./update"

export default async function (app: FastifyInstance) {
    app.get("/", async () => {
        const db = getRilumeDatabase();

        const status = await db
            .collection("status")
            .findOne(
                {},
                {
                    sort: {
                        recordedAt: -1
                    }
                }
            );

        return {
            success: true,
            data: status
        };
    });

    app.register(updateRoute, {
        prefix: "/update"
    });
}