import { FastifyInstance } from "fastify";

import { getRilumeDatabase } from "../../../../db/rilume";
import { authenticateRequest } from "../../../../services/auth/password.service";

interface DeleteParams {
    messageId: string;
}

export default async function (app: FastifyInstance) {
    app.delete<{ Params: DeleteParams }>("/:messageId", async (request, reply) => {
        if (!(await authenticateRequest(request, reply))) {
            return;
        }

        const db = getRilumeDatabase();

        const result = await db
            .collection("giveaways")
            .deleteOne({
                messageId: request.params.messageId
            });

        return {
            success: true,
            data: {
                deleted: result.deletedCount > 0
            }
        };
    });
}