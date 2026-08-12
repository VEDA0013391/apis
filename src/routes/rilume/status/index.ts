import { FastifyInstance } from "fastify";

import { getStatusDatabase } from "../../../db/status";

export default async function (app: FastifyInstance) {
    app.get("/", async () => {
        const db = getStatusDatabase();

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
}