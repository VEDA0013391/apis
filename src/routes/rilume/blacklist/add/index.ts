import { FastifyInstance } from "fastify";

import { getRilumeDatabase } from "../../../../db/rilume";
import { authenticateRequest } from "../../../../services/auth/password.service";

interface AddParams {
    userId: string;
}

export default async function (app: FastifyInstance) {
    app.post<{ Params: AddParams }>("/:userId", async (request, reply) => {
        if (!(await authenticateRequest(request, reply))) {
            return;
        }

        const db = getRilumeDatabase();

        await db.collection("blacklistusers").insertOne({
            userId: request.params.userId,
            addedAt: new Date()
        });

        return {
            success: true,
            data: {
                userId: request.params.userId
            }
        };
    });
}