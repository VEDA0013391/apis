import { FastifyInstance } from "fastify";

import { getRilumeDatabase } from "../../../../db/rilume";

interface UserIdParams {
    userId: string;
}

export default async function (app: FastifyInstance) {
    app.delete<{ Params: UserIdParams }>("/:userId", async (request) => {
        const db = getRilumeDatabase();

        const result = await db
            .collection("blacklistusers")
            .deleteOne({
                userId: request.params.userId
            });

        return {
            success: true,
            data: {
                deleted: result.deletedCount > 0
            }
        };
    });
}